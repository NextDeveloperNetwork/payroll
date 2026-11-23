import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { eq, desc, and, gte, lte, asc, inArray } from 'drizzle-orm';
import { db } from '../db/index';
import {
  employees,
  workSchedules,
  attendanceLogs,
  payrolls,
  hrSettings,
  salaryHistory,
  users,
} from '../db/schema';
import { ensureSchemaAndSeed, hashPassword } from './seed';
import crypto from 'crypto';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(process.cwd(), 'public')));

function calculateHours(clockIn: string, clockOut: string, breakMinutes: number) {
  const [inH, inM] = clockIn.split(':').map(Number);
  const [outH, outM] = clockOut.split(':').map(Number);
  let startMinutes = inH * 60 + inM;
  let endMinutes = outH * 60 + outM;
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // overnight shift
  }
  const netMinutes = Math.max(0, endMinutes - startMinutes - (breakMinutes || 0));
  const totalHours = +(netMinutes / 60).toFixed(2);
  const regularHours = +Math.min(8, totalHours).toFixed(2);
  const overtimeHours = +Math.max(0, totalHours - 8).toFixed(2);
  return { totalHours, regularHours, overtimeHours };
}

export function calculateGrossFromNet(
  netAmount: number,
  socialPct = 9.5,
  medicalPct = 1.7,
  incomePct = 13.0
) {
  const net = Math.max(0, netAmount);

  let grossPay: number;
  let socialSecurityAmount: number;
  let medicalSecurityAmount: number;
  let incomeTaxAmount: number;

  if (net < 44400) {
    // Formula for net < 44400:
    // social = 4750
    // medical = 850
    // income = 0
    // gross = net + medical + income + social = net + 850 + 0 + 4750 = net + 5600
    socialSecurityAmount = 4750;
    medicalSecurityAmount = 850;
    incomeTaxAmount = 0;
    grossPay = +(net + medicalSecurityAmount + incomeTaxAmount + socialSecurityAmount).toFixed(2);
  } else {
    // Formula for net >= 44400:
    // gross = (net - 3900) / 0.758
    // Note: 0.758 comes from 1 - (socialPct + medicalPct + incomePct)/100 = 1 - 0.242 = 0.758
    // and 3900 comes from 30000 * 13% = 3900
    const divisor = Math.max(0.01, +(1 - (socialPct + medicalPct + incomePct) / 100).toFixed(4));
    grossPay = +((net - 3900) / divisor).toFixed(2);
    socialSecurityAmount = +(grossPay * (socialPct / 100)).toFixed(2);
    medicalSecurityAmount = +(grossPay * (medicalPct / 100)).toFixed(2);
    incomeTaxAmount = +(Math.max(0, grossPay - 30000) * (incomePct / 100)).toFixed(2);
  }

  const taxAmount = +(socialSecurityAmount + medicalSecurityAmount + incomeTaxAmount).toFixed(2);
  return {
    netSalary: +net.toFixed(2),
    grossPay,
    socialSecurityAmount,
    medicalSecurityAmount,
    incomeTaxAmount,
    taxAmount,
  };
}

// JWT / Encrypted Signature configuration
const JWT_SECRET = process.env.JWT_SECRET || 'pulsehr_super_secure_jwt_secret_key_2026';

interface TokenPayload {
  userId: number;
  username: string;
  fullName: string | null;
  role: string;
  status: string;
  exp: number;
}

function createEncryptedToken(payload: Omit<TokenPayload, 'exp'>, expiresInHours = 24): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const fullPayload: TokenPayload = { ...payload, exp };
  const encodedData = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(encodedData)
    .digest('base64url');
  return `${encodedData}.${signature}`;
}

function verifyEncryptedToken(token: string): TokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedData, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(encodedData)
      .digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
    const payload: TokenPayload = JSON.parse(Buffer.from(encodedData, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

// In-memory token revocation set (e.g., after logout)
const revokedTokens = new Set<string>();

// Auth Helper
function getSessionFromReq(req: Request): TokenPayload | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (revokedTokens.has(token)) return null;
  return verifyEncryptedToken(token);
}

// Require authenticated user with approved status
function requireAuth(req: Request, res: Response, next: () => void) {
  const session = getSessionFromReq(req);
  if (!session) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  if (session.status !== 'approved') {
    res.status(403).json({ error: 'Your account is pending admin approval' });
    return;
  }
  next();
}

// Require admin role for write operations (add, edit, delete)
function requireAdmin(req: Request, res: Response, next: () => void) {
  const session = getSessionFromReq(req);
  if (!session) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  if (session.status !== 'approved') {
    res.status(403).json({ error: 'Your account is pending admin approval' });
    return;
  }
  if (session.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admin privilege required' });
    return;
  }
  next();
}

// --- Auth Routes ---
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { username, password, fullName } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }
    const cleanUser = String(username).trim().toLowerCase();
    if (cleanUser.length < 3) {
      res.status(400).json({ error: 'Username must be at least 3 characters' });
      return;
    }
    if (String(password).length < 4) {
      res.status(400).json({ error: 'Password must be at least 4 characters' });
      return;
    }

    const [existing] = await db.select().from(users).where(eq(users.username, cleanUser));
    if (existing) {
      res.status(400).json({ error: 'Username is already taken' });
      return;
    }

    const [created] = await db
      .insert(users)
      .values({
        username: cleanUser,
        passwordHash: hashPassword(String(password)),
        fullName: fullName ? String(fullName).trim() : null,
        role: 'viewer',
        status: 'pending', // Requires admin approval
      })
      .returning();

    res.status(201).json({
      message: 'Registration submitted successfully. Please wait for the admin to approve your account.',
      user: {
        id: created.id,
        username: created.username,
        fullName: created.fullName,
        role: created.role,
        status: created.status,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }
    const cleanUser = String(username).trim().toLowerCase();
    const [user] = await db.select().from(users).where(eq(users.username, cleanUser));

    if (!user || user.passwordHash !== hashPassword(String(password))) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    if (user.status === 'pending') {
      res.status(403).json({
        error: 'Your account is pending admin approval. Please contact the administrator.',
      });
      return;
    }

    if (user.status === 'rejected') {
      res.status(403).json({ error: 'Your account access has been declined.' });
      return;
    }

    const token = createEncryptedToken({
      userId: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const session = getSessionFromReq(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  res.json({ user: session });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    revokedTokens.add(token);
  }
  res.json({ success: true });
});

// --- User Management (Admin Only) ---
app.get('/api/users', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        id: users.id,
        username: users.username,
        fullName: users.fullName,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.patch('/api/users/:id/status', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status, role } = req.body;
    const [target] = await db.select().from(users).where(eq(users.id, id));
    if (!target) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updates: any = {};
    if (status && ['approved', 'pending', 'rejected'].includes(status)) {
      updates.status = status;
    }
    if (role && ['admin', 'viewer'].includes(role)) {
      updates.role = role;
    }

    const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

app.post('/api/users', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { username, password, fullName, role, status } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }
    const cleanUsername = String(username).trim();
    if (!cleanUsername) {
      res.status(400).json({ error: 'Username cannot be blank' });
      return;
    }
    const cleanPassword = String(password).trim();
    if (cleanPassword.length < 4) {
      res.status(400).json({ error: 'Password must be at least 4 characters long' });
      return;
    }

    const [existing] = await db.select().from(users).where(eq(users.username, cleanUsername));
    if (existing) {
      res.status(400).json({ error: 'Username is already taken' });
      return;
    }

    const [created] = await db
      .insert(users)
      .values({
        username: cleanUsername,
        passwordHash: hashPassword(cleanPassword),
        fullName: fullName ? String(fullName).trim() : null,
        role: role === 'admin' ? 'admin' : 'viewer',
        status: status && ['approved', 'pending', 'rejected'].includes(status) ? status : 'approved',
      })
      .returning({
        id: users.id,
        username: users.username,
        fullName: users.fullName,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt,
      });

    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create user' });
  }
});

app.put('/api/users/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { username, password, fullName, role, status } = req.body;

    const [target] = await db.select().from(users).where(eq(users.id, id));
    if (!target) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const updates: any = {};

    if (username !== undefined) {
      const cleanUsername = String(username).trim();
      if (!cleanUsername) {
        res.status(400).json({ error: 'Username cannot be blank' });
        return;
      }
      if (cleanUsername !== target.username) {
        const [existing] = await db.select().from(users).where(eq(users.username, cleanUsername));
        if (existing) {
          res.status(400).json({ error: 'Username is already taken by another account' });
          return;
        }
        updates.username = cleanUsername;
      }
    }

    if (password !== undefined && String(password).trim() !== '') {
      const cleanPassword = String(password).trim();
      if (cleanPassword.length < 4) {
        res.status(400).json({ error: 'Password must be at least 4 characters long' });
        return;
      }
      updates.passwordHash = hashPassword(cleanPassword);
    }

    if (fullName !== undefined) {
      updates.fullName = fullName ? String(fullName).trim() : null;
    }

    if (role && ['admin', 'viewer'].includes(role)) {
      updates.role = role;
    }

    if (status && ['approved', 'pending', 'rejected'].includes(status)) {
      updates.status = status;
    }

    if (Object.keys(updates).length > 0) {
      const [updated] = await db.update(users).set(updates).where(eq(users.id, id)).returning({
        id: users.id,
        username: users.username,
        fullName: users.fullName,
        role: users.role,
        status: users.status,
        createdAt: users.createdAt,
      });
      res.json(updated);
    } else {
      res.json(target);
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update user' });
  }
});

app.delete('/api/users/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const [target] = await db.select().from(users).where(eq(users.id, id));
    if (!target) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    if (target.username === 'admin') {
      res.status(400).json({ error: 'Cannot delete primary admin user' });
      return;
    }

    await db.delete(users).where(eq(users.id, id));
    res.json({ deleted: true });
  } catch (err: any) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

// --- Settings ---
app.get('/api/settings', requireAuth, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    if (rows.length === 0) {
      const [created] = await db.insert(hrSettings).values({}).returning();
      res.json(created);
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

app.put('/api/settings', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      timeUnit,
      compactMode,
      defaultShiftStart,
      defaultShiftEnd,
      defaultBreakMinutes,
      standardDayMinutes,
      sickPayPercent,
      socialSecurityPercent,
      medicalSecurityPercent,
      incomeTaxPercent,
      exportHeader,
      exportFooter,
    } = req.body;

    const rows = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    if (rows.length === 0) {
      const [created] = await db
        .insert(hrSettings)
        .values({
          timeUnit: timeUnit === 'minutes' ? 'minutes' : 'hours',
          compactMode: Boolean(compactMode),
          defaultShiftStart: defaultShiftStart || '09:00',
          defaultShiftEnd: defaultShiftEnd || '17:00',
          defaultBreakMinutes: Number(defaultBreakMinutes ?? 60),
          standardDayMinutes: Number(standardDayMinutes ?? 480),
          sickPayPercent: Math.min(100, Math.max(0, Number(sickPayPercent ?? 80))),
          socialSecurityPercent: Number(socialSecurityPercent ?? 9.5).toFixed(2),
          medicalSecurityPercent: Number(medicalSecurityPercent ?? 1.7).toFixed(2),
          incomeTaxPercent: Number(incomeTaxPercent ?? 13.0).toFixed(2),
          exportHeader: exportHeader ?? 'PulseHR Workforce Management',
          exportFooter: exportFooter ?? 'Confidential • Generated by PulseHR',
        })
        .returning();
      res.json(created);
      return;
    }

    const [updated] = await db
      .update(hrSettings)
      .set({
        timeUnit: timeUnit === 'minutes' ? 'minutes' : 'hours',
        compactMode: Boolean(compactMode),
        defaultShiftStart: defaultShiftStart || '09:00',
        defaultShiftEnd: defaultShiftEnd || '17:00',
        defaultBreakMinutes: Number(defaultBreakMinutes ?? 60),
        standardDayMinutes: Number(standardDayMinutes ?? 480),
        sickPayPercent: Math.min(100, Math.max(0, Number(sickPayPercent ?? 80))),
        socialSecurityPercent: Number(socialSecurityPercent ?? 9.5).toFixed(2),
        medicalSecurityPercent: Number(medicalSecurityPercent ?? 1.7).toFixed(2),
        incomeTaxPercent: Number(incomeTaxPercent ?? 13.0).toFixed(2),
        exportHeader: exportHeader ?? 'PulseHR Workforce Management',
        exportFooter: exportFooter ?? 'Confidential • Generated by PulseHR',
        updatedAt: new Date(),
      })
      .where(eq(hrSettings.id, rows[0].id))
      .returning();

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update settings' });
  }
});

// --- Overview Dashboard ---
app.get('/api/overview', requireAuth, async (req: Request, res: Response) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();
    const yearStr = String(year);

    const [allEmps, yearSchedules, allAttendance, yearPayrolls, allScheduleDates, allPayrollPeriods] =
      await Promise.all([
        db.select().from(employees).orderBy(asc(employees.firstName)),
        db
          .select()
          .from(workSchedules)
          .where(
            and(
              gte(workSchedules.workDate, `${yearStr}-01-01`),
              lte(workSchedules.workDate, `${yearStr}-12-31`)
            )
          )
          .orderBy(asc(workSchedules.workDate)),
        db.select().from(attendanceLogs).orderBy(desc(attendanceLogs.workDate)),
        db
          .select()
          .from(payrolls)
          .where(
            and(
              gte(payrolls.payPeriod, `${yearStr}-01`),
              lte(payrolls.payPeriod, `${yearStr}-12`)
            )
          )
          .orderBy(asc(payrolls.payPeriod)),
        db.select({ workDate: workSchedules.workDate }).from(workSchedules),
        db.select({ payPeriod: payrolls.payPeriod }).from(payrolls),
      ]);

    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const monthShortEn = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const monthlyStats = [];
    let annualTotalSalary = 0;
    let annualTotalHours = 0;
    let annualTotalAbsences = 0;
    let annualTotalLeaves = 0;
    let annualTotalSick = 0;

    for (let m = 1; m <= 12; m++) {
      const monthKey = `${yearStr}-${String(m).padStart(2, '0')}`;
      const schedsInMonth = yearSchedules.filter((s) => s.workDate.startsWith(monthKey));
      const payrollsInMonth = yearPayrolls.filter((p) => p.payPeriod === monthKey);

      const empIdSet = new Set<number>();
      schedsInMonth.forEach((s) => empIdSet.add(s.employeeId));
      payrollsInMonth.forEach((p) => empIdSet.add(p.employeeId));

      let totalMonthHours = 0;
      let absencesCount = 0;
      let leavesCount = 0;
      let sickCount = 0;

      schedsInMonth.forEach((s) => {
        const hrs = parseFloat(s.plannedHours || '0');
        totalMonthHours += hrs;
        if (s.shiftType === 'Absence') absencesCount++;
        else if (s.shiftType === 'Leave') leavesCount++;
        else if (s.shiftType === 'Sick') sickCount++;
      });

      let totalMonthSalary = 0;
      if (payrollsInMonth.length > 0) {
        totalMonthSalary = payrollsInMonth.reduce(
          (sum, p) => sum + parseFloat(p.netSalary || p.grossPay || p.basePay || '0'),
          0
        );
      } else if (schedsInMonth.length > 0) {
        allEmps.forEach((emp) => {
          const empScheds = schedsInMonth.filter((s) => s.employeeId === emp.id);
          if (empScheds.length === 0) return;
          const empHrs = empScheds.reduce((sum, s) => sum + parseFloat(s.plannedHours || '0'), 0);
          const hourly = parseFloat(emp.hourlyRate || '0');
          const base = parseFloat(emp.baseSalary || '0');
          if (hourly > 0) {
            totalMonthSalary += +(empHrs * hourly).toFixed(2);
          } else if (base > 0 && empHrs > 0) {
            totalMonthSalary += base;
          }
        });
      }

      totalMonthSalary = +totalMonthSalary.toFixed(2);
      totalMonthHours = +totalMonthHours.toFixed(2);

      const empCount = empIdSet.size > 0 ? empIdSet.size : 0;
      const avgSalary = empCount > 0 && totalMonthSalary > 0 ? +(totalMonthSalary / empCount).toFixed(2) : 0;

      annualTotalSalary += totalMonthSalary;
      annualTotalHours += totalMonthHours;
      annualTotalAbsences += absencesCount;
      annualTotalLeaves += leavesCount;
      annualTotalSick += sickCount;

      monthlyStats.push({
        month: monthKey,
        monthIndex: m,
        monthName: monthNamesEn[m - 1],
        monthShort: monthShortEn[m - 1],
        employeeCount: empCount,
        totalHours: totalMonthHours,
        totalSalary: totalMonthSalary,
        absencesCount,
        leavesCount,
        sickCount,
        avgSalary,
      });
    }

    const yearsSet = new Set<number>();
    yearsSet.add(year);
    yearsSet.add(year - 1);
    yearsSet.add(year + 1);
    allScheduleDates.forEach((r) => {
      const y = parseInt(r.workDate.slice(0, 4));
      if (!isNaN(y)) yearsSet.add(y);
    });
    allPayrollPeriods.forEach((r) => {
      const y = parseInt(r.payPeriod.slice(0, 4));
      if (!isNaN(y)) yearsSet.add(y);
    });
    const availableYears = Array.from(yearsSet).sort((a, b) => b - a);

    const activeEmployees = allEmps.filter((e) => e.status !== 'Terminated').length;

    res.json({
      year,
      availableYears,
      metrics: {
        totalEmployees: allEmps.length,
        activeEmployees,
        annualTotalSalary: +annualTotalSalary.toFixed(2),
        annualTotalHours: +annualTotalHours.toFixed(2),
        annualTotalAbsences,
        annualTotalLeaves,
        annualTotalSick,
        avgMonthlyPayroll: +(annualTotalSalary / 12).toFixed(2),
      },
      monthlyStats,
      employees: allEmps,
      recentAttendance: allAttendance.slice(0, 8),
      payrolls: yearPayrolls.slice(0, 12),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load overview metrics' });
  }
});

// --- Employees ---
app.get('/api/employees', requireAuth, async (_req: Request, res: Response) => {
  try {
    const rows = await db.select().from(employees).orderBy(asc(employees.id));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.post('/api/employees', requireAdmin, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const baseSal = Number(body.baseSalary || 0).toFixed(2);
    const hourlySal = Number(body.hourlyRate || 0).toFixed(2);
    const hireDt = body.hireDate || new Date().toISOString().split('T')[0];
    const fallbackEmail = `${String(body.firstName || 'emp')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')}.${String(body.lastName || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')}.${Date.now()}@company.io`;

    const [created] = await db
      .insert(employees)
      .values({
        employeeCode: body.employeeCode,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email || fallbackEmail,
        phone: body.phone || null,
        departmentId: body.departmentId ? Number(body.departmentId) : null,
        position: body.position || 'Staff',
        employmentType: body.employmentType || 'Full-Time',
        status: body.status || 'Employed',
        hireDate: hireDt,
        baseSalary: baseSal,
        hourlyRate: hourlySal,
        overtimeRateMultiplier: String(body.overtimeRateMultiplier || '1.50'),
        weeklyTargetHours: Number(body.weeklyTargetHours || 40),
        bankAccount: body.bankAccount || null,
        taxRatePercent: String(body.taxRatePercent || '15.00'),
        gender: body.gender || null,
        dateOfBirth: body.dateOfBirth || null,
        idNumber: body.idNumber || null,
        idPhoto: body.idPhoto || null,
        docMedicalReport: Boolean(body.docMedicalReport),
        docMedicalChart: Boolean(body.docMedicalChart),
        docWorkContract: Boolean(body.docWorkContract),
        docWorkBook: Boolean(body.docWorkBook),
        docDeclaration: Boolean(body.docDeclaration),
        docTraining: Boolean(body.docTraining),
      })
      .returning();

    if (Number(created.hourlyRate) > 0) {
      await db.insert(salaryHistory).values({
        employeeId: created.id,
        previousSalary: '0.00',
        newSalary: created.hourlyRate,
        changeAmount: created.hourlyRate,
        effectiveDate: hireDt,
        reason: 'Initial Base Pay / Hr',
      });
    }

    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create employee' });
  }
});

app.post('/api/employees/bulk-import', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { rows } = req.body as { rows: Record<string, any>[] };
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(400).json({ error: 'No employee rows provided' });
      return;
    }

    const existingEmps = await db.select().from(employees);
    const existingCodes = new Set(existingEmps.map((e) => e.employeeCode.toLowerCase()));
    const existingEmails = new Set(existingEmps.map((e) => e.email.toLowerCase()));

    const today = new Date().toISOString().split('T')[0];
    let imported = 0;
    let skipped = 0;
    let nextSeq = 1001 + existingEmps.length;

    for (const r of rows) {
      const firstName = String(r.firstName || '').trim();
      const lastName = String(r.lastName || '').trim();
      if (!firstName || !lastName) {
        skipped++;
        continue;
      }

      let code = String(r.employeeCode || '').trim() || `EMP-${nextSeq++}`;
      while (existingCodes.has(code.toLowerCase())) {
        code = `EMP-${nextSeq++}`;
      }

      const rawEmail = String(r.email || '').trim();
      const email =
        rawEmail ||
        `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${lastName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '')}.${nextSeq}@company.io`;

      if (existingEmails.has(email.toLowerCase())) {
        skipped++;
        continue;
      }

      const [insertedEmp] = await db
        .insert(employees)
        .values({
          employeeCode: code,
          firstName,
          lastName,
          email,
          phone: r.phone ? String(r.phone).trim() : null,
          departmentId: null,
          position: String(r.position || 'Staff').trim(),
          employmentType: String(r.employmentType || 'Full-Time').trim(),
          status: String(r.status || 'Employed').trim(),
          hireDate: String(r.hireDate || today).trim(),
          baseSalary: String(Number(r.baseSalary || 0).toFixed(2)),
          hourlyRate: String(Number(r.hourlyRate || 0).toFixed(2)),
          overtimeRateMultiplier: String(Number(r.overtimeRateMultiplier || 1.5).toFixed(2)),
          weeklyTargetHours: Number(r.weeklyTargetHours || 40),
          bankAccount: r.bankAccount ? String(r.bankAccount).trim() : null,
          taxRatePercent: String(Number(r.taxRatePercent || 15).toFixed(2)),
          gender: r.gender ? String(r.gender).trim() : null,
          dateOfBirth: r.dateOfBirth ? String(r.dateOfBirth).trim() : null,
          idNumber: r.idNumber ? String(r.idNumber).trim() : null,
        })
        .returning();

      if (Number(insertedEmp.hourlyRate) > 0) {
        await db.insert(salaryHistory).values({
          employeeId: insertedEmp.id,
          previousSalary: '0.00',
          newSalary: insertedEmp.hourlyRate,
          changeAmount: insertedEmp.hourlyRate,
          effectiveDate: insertedEmp.hireDate,
          reason: 'CSV Import — Initial Base Pay / Hr',
        });
      }

      existingCodes.add(code.toLowerCase());
      existingEmails.add(email.toLowerCase());
      imported++;
    }

    res.json({ imported, skipped });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Bulk import failed' });
  }
});

app.put('/api/employees/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const [existingEmp] = await db.select().from(employees).where(eq(employees.id, id));
    const newHourlyNum = Number(body.hourlyRate || 0);
    const oldHourlyNum = existingEmp ? Number(existingEmp.hourlyRate || 0) : newHourlyNum;

    const [updated] = await db
      .update(employees)
      .set({
        employeeCode: body.employeeCode,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email || existingEmp?.email || '',
        phone: body.phone !== undefined ? body.phone || null : existingEmp?.phone ?? null,
        departmentId: existingEmp?.departmentId ?? null,
        position: body.position || existingEmp?.position || 'Staff',
        employmentType: body.employmentType || existingEmp?.employmentType || 'Full-Time',
        status: body.status || existingEmp?.status || 'Employed',
        hireDate: body.hireDate || existingEmp?.hireDate,
        baseSalary: Number(body.baseSalary ?? existingEmp?.baseSalary ?? 0).toFixed(2),
        hourlyRate: newHourlyNum.toFixed(2),
        overtimeRateMultiplier: String(
          body.overtimeRateMultiplier || existingEmp?.overtimeRateMultiplier || '1.50'
        ),
        weeklyTargetHours: Number(
          body.weeklyTargetHours || existingEmp?.weeklyTargetHours || 40
        ),
        bankAccount:
          body.bankAccount !== undefined ? body.bankAccount || null : existingEmp?.bankAccount ?? null,
        taxRatePercent: String(body.taxRatePercent || existingEmp?.taxRatePercent || '15.00'),
        gender: body.gender !== undefined ? body.gender || null : existingEmp?.gender ?? null,
        dateOfBirth:
          body.dateOfBirth !== undefined ? body.dateOfBirth || null : existingEmp?.dateOfBirth ?? null,
        idNumber:
          body.idNumber !== undefined ? body.idNumber || null : existingEmp?.idNumber ?? null,
        idPhoto:
          body.idPhoto !== undefined ? body.idPhoto || null : existingEmp?.idPhoto ?? null,
        docMedicalReport:
          body.docMedicalReport !== undefined
            ? Boolean(body.docMedicalReport)
            : (existingEmp?.docMedicalReport ?? false),
        docMedicalChart:
          body.docMedicalChart !== undefined
            ? Boolean(body.docMedicalChart)
            : (existingEmp?.docMedicalChart ?? false),
        docWorkContract:
          body.docWorkContract !== undefined
            ? Boolean(body.docWorkContract)
            : (existingEmp?.docWorkContract ?? false),
        docWorkBook:
          body.docWorkBook !== undefined
            ? Boolean(body.docWorkBook)
            : (existingEmp?.docWorkBook ?? false),
        docDeclaration:
          body.docDeclaration !== undefined
            ? Boolean(body.docDeclaration)
            : (existingEmp?.docDeclaration ?? false),
        docTraining:
          body.docTraining !== undefined
            ? Boolean(body.docTraining)
            : (existingEmp?.docTraining ?? false),
      })
      .where(eq(employees.id, id))
      .returning();

    if (existingEmp && Math.abs(newHourlyNum - oldHourlyNum) > 0.001) {
      await db.insert(salaryHistory).values({
        employeeId: id,
        previousSalary: oldHourlyNum.toFixed(2),
        newSalary: newHourlyNum.toFixed(2),
        changeAmount: (newHourlyNum - oldHourlyNum).toFixed(2),
        effectiveDate: new Date().toISOString().split('T')[0],
        reason: body.salaryChangeReason || 'Base Pay / Hr Edited',
      });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update employee' });
  }
});

app.patch('/api/employees/:id/documents', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const [existingEmp] = await db.select().from(employees).where(eq(employees.id, id));
    if (!existingEmp) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const updates: Record<string, any> = {};
    if (body.docMedicalReport !== undefined) updates.docMedicalReport = Boolean(body.docMedicalReport);
    if (body.docMedicalChart !== undefined) updates.docMedicalChart = Boolean(body.docMedicalChart);
    if (body.docWorkContract !== undefined) updates.docWorkContract = Boolean(body.docWorkContract);
    if (body.docWorkBook !== undefined) updates.docWorkBook = Boolean(body.docWorkBook);
    if (body.docDeclaration !== undefined) updates.docDeclaration = Boolean(body.docDeclaration);
    if (body.docTraining !== undefined) updates.docTraining = Boolean(body.docTraining);

    const [updated] = await db
      .update(employees)
      .set(updates)
      .where(eq(employees.id, id))
      .returning();

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update documents' });
  }
});

app.patch('/api/employees/:id/base-salary', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const newBaseNum = Math.max(0, Number(req.body.baseSalary || 0));
    const reason = String(req.body.reason || 'Base Salary Edited').trim();
    const [existingEmp] = await db.select().from(employees).where(eq(employees.id, id));
    if (!existingEmp) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const oldBaseNum = Number(existingEmp.baseSalary || 0);
    const [updated] = await db
      .update(employees)
      .set({ baseSalary: newBaseNum.toFixed(2) })
      .where(eq(employees.id, id))
      .returning();

    if (Math.abs(newBaseNum - oldBaseNum) > 0.001) {
      await db.insert(salaryHistory).values({
        employeeId: id,
        previousSalary: oldBaseNum.toFixed(2),
        newSalary: newBaseNum.toFixed(2),
        changeAmount: (newBaseNum - oldBaseNum).toFixed(2),
        effectiveDate: new Date().toISOString().split('T')[0],
        reason,
      });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update base salary' });
  }
});

app.get('/api/salary-history', requireAuth, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(salaryHistory)
      .orderBy(desc(salaryHistory.effectiveDate), desc(salaryHistory.id));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load salary history' });
  }
});

app.delete('/api/employees/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.delete(employees).where(eq(employees.id, id));
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
});

// --- Workhours Timetable / Schedules ---
app.get('/api/schedules', requireAuth, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, month, employeeId, types } = req.query;
    const conditions = [];
    if (month && typeof month === 'string') {
      const [y, m] = month.split('-').map(Number);
      const lastDay = new Date(y, m, 0).getDate();
      const firstStr = `${month}-01`;
      const lastStr = `${month}-${String(lastDay).padStart(2, '0')}`;
      conditions.push(gte(workSchedules.workDate, firstStr));
      conditions.push(lte(workSchedules.workDate, lastStr));
    } else {
      if (startDate) conditions.push(gte(workSchedules.workDate, String(startDate)));
      if (endDate) conditions.push(lte(workSchedules.workDate, String(endDate)));
    }
    if (employeeId) conditions.push(eq(workSchedules.employeeId, Number(employeeId)));
    if (types && typeof types === 'string') {
      const list = types.split(',').map((s) => s.trim()).filter(Boolean);
      if (list.length > 0) conditions.push(inArray(workSchedules.shiftType, list));
    }

    const rows =
      conditions.length > 0
        ? await db
            .select()
            .from(workSchedules)
            .where(and(...conditions))
            .orderBy(asc(workSchedules.workDate), asc(workSchedules.startTime))
        : await db
            .select()
            .from(workSchedules)
            .orderBy(asc(workSchedules.workDate), asc(workSchedules.startTime));

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load work schedules' });
  }
});

app.post('/api/schedules', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      employeeId,
      workDate,
      shiftType,
      startTime,
      endTime,
      breakMinutes,
      plannedHours: directHours,
      notes,
    } = req.body;
    const empId = Number(employeeId);
    const brk = Number(breakMinutes ?? 60);
    const type = shiftType || 'Morning';

    const [settingsRow] = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    const stdHours = (settingsRow?.standardDayMinutes ?? 480) / 60;
    const sickPct = settingsRow?.sickPayPercent ?? 80;

    let totalHours: number;
    if (directHours !== undefined && directHours !== null && directHours !== '') {
      totalHours = Math.max(0, Number(directHours));
    } else if (type === 'Off' || type === 'Absence') {
      totalHours = 0;
    } else if (type === 'Sick') {
      totalHours = +(stdHours * (sickPct / 100)).toFixed(2);
    } else if (type === 'Leave' || type === 'Holiday') {
      totalHours = +stdHours.toFixed(2);
    } else {
      totalHours = calculateHours(startTime || '09:00', endTime || '17:00', brk).totalHours;
    }

    const isNonShift = ['Off', 'Leave', 'Absence', 'Holiday', 'Sick'].includes(type);

    // Check if an entry already exists for this employee & date so timetable cells update seamlessly
    const existing = await db
      .select()
      .from(workSchedules)
      .where(and(eq(workSchedules.employeeId, empId), eq(workSchedules.workDate, workDate)));

    if (existing.length > 0) {
      const [updated] = await db
        .update(workSchedules)
        .set({
          shiftType: type,
          startTime: startTime || '09:00',
          endTime: endTime || '17:00',
          breakMinutes: isNonShift ? 0 : brk,
          plannedHours: totalHours.toFixed(2),
          notes: notes || null,
        })
        .where(eq(workSchedules.id, existing[0].id))
        .returning();
      res.json(updated);
      return;
    }

    const [created] = await db
      .insert(workSchedules)
      .values({
        employeeId: empId,
        workDate,
        shiftType: type,
        startTime: startTime || '09:00',
        endTime: endTime || '17:00',
        breakMinutes: isNonShift ? 0 : brk,
        plannedHours: totalHours.toFixed(2),
        notes: notes || null,
      })
      .returning();
    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to save schedule' });
  }
});

app.post('/api/schedules/bulk-week', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { mondayDate, shiftType = 'Morning', startTime = '09:00', endTime = '17:00' } = req.body;
    const allEmps = await db.select().from(employees);
    const activeEmps = allEmps.filter((e) => e.status !== 'Terminated');

    const baseDate = new Date(mondayDate);
    const createdOrUpdated = [];

    for (const emp of activeEmps) {
      for (let i = 0; i < 6; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + i);
        const workDate = d.toISOString().split('T')[0];

        const existing = await db
          .select()
          .from(workSchedules)
          .where(and(eq(workSchedules.employeeId, emp.id), eq(workSchedules.workDate, workDate)));

        const { totalHours } = calculateHours(startTime, endTime, 60);

        if (existing.length === 0) {
          const [row] = await db
            .insert(workSchedules)
            .values({
              employeeId: emp.id,
              workDate,
              shiftType,
              startTime,
              endTime,
              breakMinutes: 60,
              plannedHours: totalHours.toFixed(2),
              notes: 'Auto-scheduled Mon-Sat shift',
            })
            .returning();
          createdOrUpdated.push(row);
        }
      }
    }

    res.json({ count: createdOrUpdated.length });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to bulk generate schedule' });
  }
});

app.post('/api/schedules/bulk-month', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { month, shiftType = 'Morning', startTime = '09:00', endTime = '17:00', breakMinutes = 60 } = req.body;
    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      res.status(400).json({ error: 'Valid month (YYYY-MM) is required' });
      return;
    }

    const [y, m] = month.split('-').map(Number);
    const daysInMonth = new Date(y, m, 0).getDate();
    const allEmps = await db.select().from(employees);
    const activeEmps = allEmps.filter((e) => e.status !== 'Terminated');

    const firstStr = `${month}-01`;
    const lastStr = `${month}-${String(daysInMonth).padStart(2, '0')}`;
    const existingRows = await db
      .select()
      .from(workSchedules)
      .where(and(gte(workSchedules.workDate, firstStr), lte(workSchedules.workDate, lastStr)));
    const existingKeys = new Set(existingRows.map((r) => `${r.employeeId}:${r.workDate}`));

    const { totalHours } = calculateHours(startTime, endTime, Number(breakMinutes));
    const toInsert: (typeof workSchedules.$inferInsert)[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(y, m - 1, day);
      const dow = dateObj.getDay();
      if (dow === 0) continue; // Mon-Sat (skip Sunday only)
      const workDate = `${month}-${String(day).padStart(2, '0')}`;

      for (const emp of activeEmps) {
        if (existingKeys.has(`${emp.id}:${workDate}`)) continue;
        toInsert.push({
          employeeId: emp.id,
          workDate,
          shiftType,
          startTime,
          endTime,
          breakMinutes: Number(breakMinutes),
          plannedHours: totalHours.toFixed(2),
          notes: `Monthly schedule (${month})`,
        });
      }
    }

    if (toInsert.length > 0) {
      await db.insert(workSchedules).values(toInsert);
    }

    res.json({ count: toInsert.length });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to bulk generate monthly schedule' });
  }
});

app.post('/api/schedules/batch', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { cells, action, shiftType, plannedHours } = req.body as {
      cells: { employeeId: number; workDate: string }[];
      action: 'set' | 'clear';
      shiftType?: string;
      plannedHours?: number;
    };

    if (!Array.isArray(cells) || cells.length === 0) {
      res.status(400).json({ error: 'No cells selected' });
      return;
    }

    const [settingsRow] = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    const stdHours = (settingsRow?.standardDayMinutes ?? 480) / 60;
    const sickPct = settingsRow?.sickPayPercent ?? 80;
    const defaultStart = settingsRow?.defaultShiftStart || '09:00';
    const defaultEnd = settingsRow?.defaultShiftEnd || '17:00';
    const defaultBreak = settingsRow?.defaultBreakMinutes ?? 60;

    let countChanged = 0;

    for (const c of cells) {
      const empId = Number(c.employeeId);
      const workDate = String(c.workDate);

      if (action === 'clear') {
        await db
          .delete(workSchedules)
          .where(and(eq(workSchedules.employeeId, empId), eq(workSchedules.workDate, workDate)));
        countChanged++;
        continue;
      }

      const type = shiftType || 'Morning';
      let hrs: number;
      if (plannedHours !== undefined && plannedHours !== null) {
        hrs = Math.max(0, Number(plannedHours));
      } else if (type === 'Off' || type === 'Absence') {
        hrs = 0;
      } else if (type === 'Sick') {
        hrs = +(stdHours * (sickPct / 100)).toFixed(2);
      } else if (type === 'Leave' || type === 'Holiday') {
        hrs = +stdHours.toFixed(2);
      } else {
        hrs = calculateHours(defaultStart, defaultEnd, defaultBreak).totalHours;
      }

      const isNonShift = ['Off', 'Leave', 'Absence', 'Holiday', 'Sick'].includes(type);
      const existing = await db
        .select()
        .from(workSchedules)
        .where(and(eq(workSchedules.employeeId, empId), eq(workSchedules.workDate, workDate)));

      if (existing.length > 0) {
        await db
          .update(workSchedules)
          .set({
            shiftType: type,
            breakMinutes: isNonShift ? 0 : defaultBreak,
            plannedHours: hrs.toFixed(2),
          })
          .where(eq(workSchedules.id, existing[0].id));
      } else {
        await db.insert(workSchedules).values({
          employeeId: empId,
          workDate,
          shiftType: type,
          startTime: defaultStart,
          endTime: defaultEnd,
          breakMinutes: isNonShift ? 0 : defaultBreak,
          plannedHours: hrs.toFixed(2),
        });
      }
      countChanged++;
    }

    res.json({ count: countChanged });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Batch update failed' });
  }
});

app.post('/api/schedules/clear-range', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, month, employeeIds } = req.body as {
      startDate?: string;
      endDate?: string;
      month?: string;
      employeeIds?: number[];
    };

    let firstStr = startDate;
    let lastStr = endDate;
    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const [y, m] = month.split('-').map(Number);
      const daysInMonth = new Date(y, m, 0).getDate();
      firstStr = `${month}-01`;
      lastStr = `${month}-${String(daysInMonth).padStart(2, '0')}`;
    }

    if (!firstStr || !lastStr) {
      res.status(400).json({ error: 'Date range or month is required' });
      return;
    }

    const conditions = [
      gte(workSchedules.workDate, firstStr),
      lte(workSchedules.workDate, lastStr),
    ];
    if (Array.isArray(employeeIds) && employeeIds.length > 0) {
      conditions.push(inArray(workSchedules.employeeId, employeeIds.map(Number)));
    }

    await db.delete(workSchedules).where(and(...conditions));
    res.json({ cleared: true });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to clear table' });
  }
});

app.patch('/api/employees/:id/hourly-rate', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const rate = Math.max(0, Number(req.body.hourlyRate || 0));
    const reason = String(req.body.reason || 'Hourly Rate Edited in Timetable').trim();
    const [existingEmp] = await db.select().from(employees).where(eq(employees.id, id));
    const oldRate = existingEmp ? Number(existingEmp.hourlyRate || 0) : rate;

    const [updated] = await db
      .update(employees)
      .set({ hourlyRate: rate.toFixed(2) })
      .where(eq(employees.id, id))
      .returning();

    if (existingEmp && Math.abs(rate - oldRate) > 0.001) {
      await db.insert(salaryHistory).values({
        employeeId: id,
        previousSalary: oldRate.toFixed(2),
        newSalary: rate.toFixed(2),
        changeAmount: (rate - oldRate).toFixed(2),
        effectiveDate: new Date().toISOString().split('T')[0],
        reason,
      });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update hourly rate' });
  }
});

app.delete('/api/schedules/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.delete(workSchedules).where(eq(workSchedules.id, id));
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete schedule' });
  }
});

// --- Attendance & Time Logs ---
app.get('/api/attendance', requireAuth, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(attendanceLogs)
      .orderBy(desc(attendanceLogs.workDate), desc(attendanceLogs.id));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attendance logs' });
  }
});

app.post('/api/attendance', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { employeeId, workDate, clockIn, clockOut, breakMinutes, status, notes, directMinutes } = req.body;
    const brk = Number(breakMinutes ?? 60);
    const [settingsRow] = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    const stdHours = (settingsRow?.standardDayMinutes ?? 480) / 60;

    let totalHours: number;
    let regularHours: number;
    let overtimeHours: number;

    if (directMinutes !== undefined && directMinutes !== null && directMinutes !== '') {
      totalHours = +(Math.max(0, Number(directMinutes)) / 60).toFixed(2);
      regularHours = +Math.min(stdHours, totalHours).toFixed(2);
      overtimeHours = +Math.max(0, totalHours - stdHours).toFixed(2);
    } else {
      const calc = calculateHours(clockIn || '09:00', clockOut || '17:00', brk);
      totalHours = calc.totalHours;
      regularHours = +Math.min(stdHours, totalHours).toFixed(2);
      overtimeHours = +Math.max(0, totalHours - stdHours).toFixed(2);
    }

    const computedStatus =
      status || (overtimeHours > 0 ? 'Overtime' : totalHours < 4 ? 'Partial' : 'Present');

    const [created] = await db
      .insert(attendanceLogs)
      .values({
        employeeId: Number(employeeId),
        workDate,
        clockIn: clockIn || '09:00',
        clockOut: clockOut || '17:00',
        breakMinutes: brk,
        regularHours: regularHours.toFixed(2),
        overtimeHours: overtimeHours.toFixed(2),
        totalHours: totalHours.toFixed(2),
        status: computedStatus,
        notes: notes || null,
      })
      .returning();

    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to log attendance' });
  }
});

app.delete('/api/attendance/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.delete(attendanceLogs).where(eq(attendanceLogs.id, id));
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete attendance log' });
  }
});

// --- Salary & Payroll Management ---
app.get('/api/payrolls', requireAuth, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select()
      .from(payrolls)
      .orderBy(desc(payrolls.payPeriod), asc(payrolls.employeeId));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payrolls' });
  }
});

app.post('/api/payrolls', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      employeeId,
      payPeriod,
      basePay,
      regularHoursWorked,
      overtimeHoursWorked,
      bonuses,
      allowances,
      deductions,
      paymentStatus,
      notes,
    } = req.body;

    const [emp] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, Number(employeeId)));

    if (!emp) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    const [settingsRow] = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    const socialPct = parseFloat(settingsRow?.socialSecurityPercent || '9.50');
    const medicalPct = parseFloat(settingsRow?.medicalSecurityPercent || '1.70');
    const incomePct = parseFloat(settingsRow?.incomeTaxPercent || '13.00');

    const base = parseFloat(basePay ?? emp.baseSalary);
    const rate = parseFloat(emp.hourlyRate || '0');
    const mult = parseFloat(emp.overtimeRateMultiplier || '1.5');
    const regHours = parseFloat(regularHoursWorked ?? '160');
    const otHours = parseFloat(overtimeHoursWorked ?? '0');
    const overtimePay = +(otHours * rate * mult).toFixed(2);
    const bonusAmt = parseFloat(bonuses || '0');
    const allowAmt = parseFloat(allowances || '0');
    const deductAmt = parseFloat(deductions || '0');

    // Payments are NET; calculate Gross Pay + 3 taxes from Settings
    const netTarget = Math.max(0, base + overtimePay + bonusAmt + allowAmt - deductAmt);
    const calc = calculateGrossFromNet(netTarget, socialPct, medicalPct, incomePct);

    const [created] = await db
      .insert(payrolls)
      .values({
        employeeId: emp.id,
        payPeriod,
        basePay: base.toFixed(2),
        regularHoursWorked: regHours.toFixed(2),
        overtimeHoursWorked: otHours.toFixed(2),
        overtimePay: overtimePay.toFixed(2),
        bonuses: bonusAmt.toFixed(2),
        allowances: allowAmt.toFixed(2),
        deductions: deductAmt.toFixed(2),
        grossPay: calc.grossPay.toFixed(2),
        socialSecurityAmount: calc.socialSecurityAmount.toFixed(2),
        medicalSecurityAmount: calc.medicalSecurityAmount.toFixed(2),
        incomeTaxAmount: calc.incomeTaxAmount.toFixed(2),
        taxAmount: calc.taxAmount.toFixed(2),
        netSalary: calc.netSalary.toFixed(2),
        paymentStatus: paymentStatus || 'Pending',
        paymentDate: paymentStatus === 'Paid' ? new Date().toISOString().split('T')[0] : null,
        notes: notes || null,
      })
      .returning();

    res.status(201).json(created);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create payroll record' });
  }
});

app.post('/api/payrolls/generate-period', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { payPeriod, defaultAllowance = 0, defaultBonus = 0 } = req.body;
    if (!payPeriod) {
      res.status(400).json({ error: 'payPeriod (YYYY-MM) is required' });
      return;
    }

    const [settingsRow] = await db.select().from(hrSettings).orderBy(asc(hrSettings.id));
    const socialPct = parseFloat(settingsRow?.socialSecurityPercent || '9.50');
    const medicalPct = parseFloat(settingsRow?.medicalSecurityPercent || '1.70');
    const incomePct = parseFloat(settingsRow?.incomeTaxPercent || '13.00');

    const allEmps = await db.select().from(employees);
    const existingPayrolls = await db
      .select()
      .from(payrolls)
      .where(eq(payrolls.payPeriod, payPeriod));
    const existingEmpIds = new Set(existingPayrolls.map((p) => p.employeeId));

    const allSchedules = await db.select().from(workSchedules);
    const periodSchedules = allSchedules.filter((s) => s.workDate.startsWith(payPeriod));

    const generated = [];
    for (const emp of allEmps) {
      if (existingEmpIds.has(emp.id)) continue;

      const empScheds = periodSchedules.filter((s) => s.employeeId === emp.id);
      const totalPlannedHours = empScheds.reduce(
        (s, x) => s + parseFloat(x.plannedHours || '0'),
        0
      );

      // Only generate payroll for employees who have hours/shifts logged in this specific period
      if (empScheds.length === 0 || totalPlannedHours <= 0) {
        continue;
      }

      const rate = parseFloat(emp.hourlyRate || '0');
      const base = parseFloat(emp.baseSalary || '0');
      const netBase = rate > 0 ? +(totalPlannedHours * rate).toFixed(2) : base;
      const bonus = Number(defaultBonus);
      const allowance = Number(defaultAllowance);
      const netTarget = Math.max(0, netBase + bonus + allowance);
      const calc = calculateGrossFromNet(netTarget, socialPct, medicalPct, incomePct);

      const [row] = await db
        .insert(payrolls)
        .values({
          employeeId: emp.id,
          payPeriod,
          basePay: netBase.toFixed(2),
          regularHoursWorked: totalPlannedHours.toFixed(2),
          overtimeHoursWorked: '0.00',
          overtimePay: '0.00',
          bonuses: bonus.toFixed(2),
          allowances: allowance.toFixed(2),
          deductions: '0.00',
          grossPay: calc.grossPay.toFixed(2),
          socialSecurityAmount: calc.socialSecurityAmount.toFixed(2),
          medicalSecurityAmount: calc.medicalSecurityAmount.toFixed(2),
          incomeTaxAmount: calc.incomeTaxAmount.toFixed(2),
          taxAmount: calc.taxAmount.toFixed(2),
          netSalary: calc.netSalary.toFixed(2),
          paymentStatus: 'Pending',
          paymentDate: null,
          notes: `Net-to-Gross run (${payPeriod})`,
        })
        .returning();

      generated.push(row);
    }

    res.json({ generatedCount: generated.length, records: generated });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to generate period payroll' });
  }
});

app.patch('/api/payrolls/:id/status', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { paymentStatus } = req.body;
    const paymentDate =
      paymentStatus === 'Paid' ? new Date().toISOString().split('T')[0] : null;
    const [updated] = await db
      .update(payrolls)
      .set({ paymentStatus, paymentDate })
      .where(eq(payrolls.id, id))
      .returning();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update payroll status' });
  }
});

app.delete('/api/payrolls/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.delete(payrolls).where(eq(payrolls.id, id));
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete payroll' });
  }
});

async function startServer(port = PORT) {
  try {
    await ensureSchemaAndSeed();
    const server = app.listen(port, () => {
      console.log(`HR Management Server running at http://localhost:${port}`);
    });
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} is busy, trying port ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
}

startServer();

