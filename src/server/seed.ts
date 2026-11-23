import { pool, db } from '../db/index';
import {
  departments,
  employees,
  workSchedules,
  attendanceLogs,
  payrolls,
  leaveRequests,
  performanceReviews,
  expenseClaims,
  hrSettings,
  salaryHistory,
  users,
} from '../db/schema';
import crypto from 'crypto';
import { count, eq } from 'drizzle-orm';

export async function ensureSchemaAndSeed(): Promise<void> {
  // Ensure tables exist in PostgreSQL matching Drizzle schema
  await pool.query(`
    CREATE TABLE IF NOT EXISTS departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      code VARCHAR(20) NOT NULL UNIQUE,
      manager_name VARCHAR(120),
      budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      location VARCHAR(120),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      employee_code VARCHAR(30) NOT NULL UNIQUE,
      first_name VARCHAR(80) NOT NULL,
      last_name VARCHAR(80) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      phone VARCHAR(40),
      department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
      position VARCHAR(100) NOT NULL,
      employment_type VARCHAR(40) NOT NULL DEFAULT 'Full-Time',
      status VARCHAR(30) NOT NULL DEFAULT 'Active',
      hire_date DATE NOT NULL,
      base_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 25.00,
      overtime_rate_multiplier NUMERIC(4, 2) NOT NULL DEFAULT 1.50,
      weekly_target_hours INTEGER NOT NULL DEFAULT 40,
      bank_account VARCHAR(80),
      tax_rate_percent NUMERIC(5, 2) NOT NULL DEFAULT 15.00,
      gender VARCHAR(20),
      date_of_birth DATE,
      id_number VARCHAR(50),
      id_photo TEXT,
      doc_medical_report BOOLEAN NOT NULL DEFAULT FALSE,
      doc_medical_chart BOOLEAN NOT NULL DEFAULT FALSE,
      doc_work_contract BOOLEAN NOT NULL DEFAULT FALSE,
      doc_work_book BOOLEAN NOT NULL DEFAULT FALSE,
      doc_declaration BOOLEAN NOT NULL DEFAULT FALSE,
      doc_training BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS work_schedules (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      work_date DATE NOT NULL,
      shift_type VARCHAR(40) NOT NULL DEFAULT 'Morning',
      start_time VARCHAR(10) NOT NULL,
      end_time VARCHAR(10) NOT NULL,
      break_minutes INTEGER NOT NULL DEFAULT 60,
      planned_hours NUMERIC(5, 2) NOT NULL DEFAULT 8.00,
      notes TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS attendance_logs (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      work_date DATE NOT NULL,
      clock_in VARCHAR(10) NOT NULL,
      clock_out VARCHAR(10) NOT NULL,
      break_minutes INTEGER NOT NULL DEFAULT 60,
      regular_hours NUMERIC(5, 2) NOT NULL DEFAULT 8.00,
      overtime_hours NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
      total_hours NUMERIC(5, 2) NOT NULL DEFAULT 8.00,
      status VARCHAR(30) NOT NULL DEFAULT 'Present',
      notes TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS payrolls (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      pay_period VARCHAR(20) NOT NULL,
      base_pay NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      regular_hours_worked NUMERIC(6, 2) NOT NULL DEFAULT 160.00,
      overtime_hours_worked NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
      overtime_pay NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      bonuses NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      allowances NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      deductions NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      net_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      payment_status VARCHAR(30) NOT NULL DEFAULT 'Pending',
      payment_date DATE,
      notes TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS leave_requests (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      leave_type VARCHAR(50) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      days_count INTEGER NOT NULL DEFAULT 1,
      reason TEXT NOT NULL,
      status VARCHAR(30) NOT NULL DEFAULT 'Pending',
      approved_by VARCHAR(100),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS performance_reviews (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      review_period VARCHAR(30) NOT NULL,
      reviewer_name VARCHAR(120) NOT NULL,
      rating INTEGER NOT NULL DEFAULT 4,
      kpi_score NUMERIC(5, 2) NOT NULL DEFAULT 85.00,
      recommended_raise_percent NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
      raise_applied BOOLEAN NOT NULL DEFAULT FALSE,
      strengths TEXT,
      improvements TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS expense_claims (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      expense_date DATE NOT NULL,
      category VARCHAR(60) NOT NULL,
      description TEXT NOT NULL,
      amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
      status VARCHAR(30) NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS hr_settings (
      id SERIAL PRIMARY KEY,
      time_unit VARCHAR(20) NOT NULL DEFAULT 'hours',
      compact_mode BOOLEAN NOT NULL DEFAULT TRUE,
      default_shift_start VARCHAR(10) NOT NULL DEFAULT '09:00',
      default_shift_end VARCHAR(10) NOT NULL DEFAULT '17:00',
      default_break_minutes INTEGER NOT NULL DEFAULT 60,
      standard_day_minutes INTEGER NOT NULL DEFAULT 480,
      sick_pay_percent INTEGER NOT NULL DEFAULT 80,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    ALTER TABLE hr_settings ADD COLUMN IF NOT EXISTS sick_pay_percent INTEGER NOT NULL DEFAULT 80;
    ALTER TABLE hr_settings ADD COLUMN IF NOT EXISTS social_security_percent NUMERIC(5, 2) NOT NULL DEFAULT 9.50;
    ALTER TABLE hr_settings ADD COLUMN IF NOT EXISTS medical_security_percent NUMERIC(5, 2) NOT NULL DEFAULT 1.70;
    ALTER TABLE hr_settings ADD COLUMN IF NOT EXISTS income_tax_percent NUMERIC(5, 2) NOT NULL DEFAULT 13.00;

    ALTER TABLE payrolls ADD COLUMN IF NOT EXISTS gross_pay NUMERIC(12, 2) NOT NULL DEFAULT 0.00;
    ALTER TABLE payrolls ADD COLUMN IF NOT EXISTS social_security_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00;
    ALTER TABLE payrolls ADD COLUMN IF NOT EXISTS medical_security_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00;
    ALTER TABLE payrolls ADD COLUMN IF NOT EXISTS income_tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00;

    ALTER TABLE employees ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS date_of_birth DATE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS id_number VARCHAR(50);
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS id_photo TEXT;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_medical_report BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_medical_chart BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_work_contract BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_work_book BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_declaration BOOLEAN NOT NULL DEFAULT FALSE;
    ALTER TABLE employees ADD COLUMN IF NOT EXISTS doc_training BOOLEAN NOT NULL DEFAULT FALSE;

    CREATE TABLE IF NOT EXISTS salary_history (
      id SERIAL PRIMARY KEY,
      employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
      previous_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      new_salary NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      change_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
      effective_date DATE NOT NULL,
      reason TEXT NOT NULL DEFAULT 'Base Salary Updated',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(80) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(120),
      role VARCHAR(20) NOT NULL DEFAULT 'viewer',
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await ensureDefaultSettings();
  await ensureSalaryHistorySeeded();
  await ensureAdminUserSeeded();

  const [{ value: deptCount }] = await db.select({ value: count() }).from(departments);
  if (deptCount > 0) {
    await seedReviewsAndExpensesIfEmpty();
    return;
  }

  console.log('Seeding initial HR data into PostgreSQL...');

  const insertedDepts = await db
    .insert(departments)
    .values([
      {
        name: 'Engineering & Product',
        code: 'ENG',
        managerName: 'Elena Vance',
        budget: '480000.00',
        location: 'Floor 4, Building A',
      },
      {
        name: 'Human Resources & Ops',
        code: 'HR',
        managerName: 'Marcus Sterling',
        budget: '195000.00',
        location: 'Floor 2, Building A',
      },
      {
        name: 'Finance & Payroll',
        code: 'FIN',
        managerName: 'Clara Chen',
        budget: '260000.00',
        location: 'Floor 3, Building A',
      },
      {
        name: 'Customer Success & Sales',
        code: 'SALES',
        managerName: 'David Alverez',
        budget: '340000.00',
        location: 'Floor 1, Building B',
      },
    ])
    .returning();

  const [eng, hr, fin, sales] = insertedDepts;

  const insertedEmployees = await db
    .insert(employees)
    .values([
      {
        employeeCode: 'EMP-1001',
        firstName: 'Elena',
        lastName: 'Vance',
        email: 'elena.vance@company.io',
        phone: '+1 (555) 234-5678',
        departmentId: eng.id,
        position: 'Lead Systems Architect',
        employmentType: 'Full-Time',
        status: 'Active',
        hireDate: '2023-03-15',
        baseSalary: '8400.00',
        hourlyRate: '52.50',
        overtimeRateMultiplier: '1.50',
        weeklyTargetHours: 40,
        bankAccount: 'US89-CHASE-****4821',
        taxRatePercent: '22.00',
      },
      {
        employeeCode: 'EMP-1002',
        firstName: 'Liam',
        lastName: 'Kowalski',
        email: 'liam.kowalski@company.io',
        phone: '+1 (555) 392-8812',
        departmentId: eng.id,
        position: 'Senior TypeScript Engineer',
        employmentType: 'Full-Time',
        status: 'Active',
        hireDate: '2024-01-10',
        baseSalary: '6800.00',
        hourlyRate: '42.50',
        overtimeRateMultiplier: '1.50',
        weeklyTargetHours: 40,
        bankAccount: 'US42-BOFA-****9910',
        taxRatePercent: '18.00',
      },
      {
        employeeCode: 'EMP-1003',
        firstName: 'Marcus',
        lastName: 'Sterling',
        email: 'marcus.sterling@company.io',
        phone: '+1 (555) 401-2290',
        departmentId: hr.id,
        position: 'HR Director',
        employmentType: 'Full-Time',
        status: 'Active',
        hireDate: '2022-07-01',
        baseSalary: '6200.00',
        hourlyRate: '38.75',
        overtimeRateMultiplier: '1.50',
        weeklyTargetHours: 40,
        bankAccount: 'US11-CITI-****3302',
        taxRatePercent: '18.00',
      },
      {
        employeeCode: 'EMP-1004',
        firstName: 'Clara',
        lastName: 'Chen',
        email: 'clara.chen@company.io',
        phone: '+1 (555) 782-1450',
        departmentId: fin.id,
        position: 'Payroll & Compensation Specialist',
        employmentType: 'Full-Time',
        status: 'Active',
        hireDate: '2023-09-20',
        baseSalary: '5600.00',
        hourlyRate: '35.00',
        overtimeRateMultiplier: '1.50',
        weeklyTargetHours: 40,
        bankAccount: 'US77-WELLS-****6124',
        taxRatePercent: '16.50',
      },
      {
        employeeCode: 'EMP-1005',
        firstName: 'Sofia',
        lastName: 'Rossi',
        email: 'sofia.rossi@company.io',
        phone: '+1 (555) 614-9087',
        departmentId: sales.id,
        position: 'Account Executive',
        employmentType: 'Full-Time',
        status: 'Active',
        hireDate: '2024-06-01',
        baseSalary: '4800.00',
        hourlyRate: '30.00',
        overtimeRateMultiplier: '1.50',
        weeklyTargetHours: 40,
        bankAccount: 'US54-CHASE-****7741',
        taxRatePercent: '15.00',
      },
      {
        employeeCode: 'EMP-1006',
        firstName: 'Noah',
        lastName: 'Bennett',
        email: 'noah.bennett@company.io',
        phone: '+1 (555) 891-3345',
        departmentId: eng.id,
        position: 'DevOps & Cloud Engineer',
        employmentType: 'Part-Time',
        status: 'On Leave',
        hireDate: '2025-02-12',
        baseSalary: '4000.00',
        hourlyRate: '40.00',
        overtimeRateMultiplier: '1.75',
        weeklyTargetHours: 25,
        bankAccount: 'US29-CITI-****1185',
        taxRatePercent: '14.00',
      },
    ])
    .returning();

  // Compute current week's Monday .. Sunday dates
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d.toISOString().split('T')[0]);
  }

  const scheduleRows: (typeof workSchedules.$inferInsert)[] = [];
  const attendanceRows: (typeof attendanceLogs.$inferInsert)[] = [];

  for (const emp of insertedEmployees) {
    for (let i = 0; i < 5; i++) {
      const workDate = weekDates[i];
      const isRemote = (emp.id + i) % 3 === 0;
      const shiftType = emp.status === 'On Leave' ? 'Off' : isRemote ? 'Remote' : i % 2 === 0 ? 'Morning' : 'Afternoon';
      const startTime = shiftType === 'Afternoon' ? '10:00' : '09:00';
      const endTime = shiftType === 'Afternoon' ? '18:00' : '17:00';
      const plannedHours = shiftType === 'Off' ? '0.00' : '8.00';

      scheduleRows.push({
        employeeId: emp.id,
        workDate,
        shiftType,
        startTime,
        endTime,
        breakMinutes: shiftType === 'Off' ? 0 : 60,
        plannedHours,
        notes: shiftType === 'Remote' ? 'Remote work day' : 'Standard shift',
      });

      if (i <= 2 && emp.status === 'Active') {
        const hasOvertime = (emp.id + i) % 2 === 0;
        const outTime = hasOvertime ? '18:30' : '17:00';
        const regHrs = 8;
        const otHrs = hasOvertime ? 1.5 : 0;
        attendanceRows.push({
          employeeId: emp.id,
          workDate,
          clockIn: '08:55',
          clockOut: outTime,
          breakMinutes: 60,
          regularHours: regHrs.toFixed(2),
          overtimeHours: otHrs.toFixed(2),
          totalHours: (regHrs + otHrs).toFixed(2),
          status: hasOvertime ? 'Overtime' : isRemote ? 'Remote' : 'Present',
          notes: hasOvertime ? 'Release sprint support' : 'On schedule',
        });
      }
    }
  }

  await db.insert(workSchedules).values(scheduleRows);
  await db.insert(attendanceLogs).values(attendanceRows);

  const currentMonth = today.toISOString().slice(0, 7);
  const payrollRows: (typeof payrolls.$inferInsert)[] = insertedEmployees.map((emp, idx) => {
    const base = parseFloat(emp.baseSalary);
    const rate = parseFloat(emp.hourlyRate);
    const mult = parseFloat(emp.overtimeRateMultiplier);
    const otHours = idx % 2 === 0 ? 12 : 4;
    const otPay = +(otHours * rate * mult).toFixed(2);
    const bonus = idx === 0 ? 650 : idx === 4 ? 850 : 200;
    const allowance = 150;
    const deduction = 80;
    const gross = base + otPay + bonus + allowance - deduction;
    const taxRate = parseFloat(emp.taxRatePercent) / 100;
    const tax = +(gross * taxRate).toFixed(2);
    const net = +(gross - tax).toFixed(2);

    return {
      employeeId: emp.id,
      payPeriod: currentMonth,
      basePay: base.toFixed(2),
      regularHoursWorked: '160.00',
      overtimeHoursWorked: otHours.toFixed(2),
      overtimePay: otPay.toFixed(2),
      bonuses: bonus.toFixed(2),
      allowances: allowance.toFixed(2),
      deductions: deduction.toFixed(2),
      taxAmount: tax.toFixed(2),
      netSalary: net.toFixed(2),
      paymentStatus: idx < 3 ? 'Paid' : idx === 3 ? 'Approved' : 'Pending',
      paymentDate: idx < 3 ? today.toISOString().split('T')[0] : null,
      notes: 'Monthly automated salary run',
    };
  });

  await db.insert(payrolls).values(payrollRows);

  await db.insert(leaveRequests).values([
    {
      employeeId: insertedEmployees[5].id,
      leaveType: 'Annual',
      startDate: weekDates[0],
      endDate: weekDates[4],
      daysCount: 5,
      reason: 'Family vacation abroad',
      status: 'Approved',
      approvedBy: 'Marcus Sterling',
    },
    {
      employeeId: insertedEmployees[1].id,
      leaveType: 'Personal',
      startDate: weekDates[4],
      endDate: weekDates[4],
      daysCount: 1,
      reason: 'Medical appointment & personal errands',
      status: 'Pending',
      approvedBy: null,
    },
    {
      employeeId: insertedEmployees[4].id,
      leaveType: 'Sick',
      startDate: weekDates[2],
      endDate: weekDates[3],
      daysCount: 2,
      reason: 'Flu recovery',
      status: 'Approved',
      approvedBy: 'Marcus Sterling',
    },
  ]);

  await seedReviewsAndExpensesIfEmpty();

  console.log('Database seeded with initial HR records.');
}

async function ensureSalaryHistorySeeded(): Promise<void> {
  const [{ value: histCount }] = await db.select({ value: count() }).from(salaryHistory);
  if (histCount > 0) return;

  const allEmps = await db.select().from(employees);
  if (allEmps.length === 0) return;

  await db.insert(salaryHistory).values(
    allEmps.map((emp) => ({
      employeeId: emp.id,
      previousSalary: '0.00',
      newSalary: emp.hourlyRate,
      changeAmount: emp.hourlyRate,
      effectiveDate: emp.hireDate,
      reason: 'Initial Base Pay / Hr',
    }))
  );
}

async function ensureDefaultSettings(): Promise<void> {
  const [{ value: settingsCount }] = await db.select({ value: count() }).from(hrSettings);
  if (settingsCount === 0) {
    await db.insert(hrSettings).values({
      timeUnit: 'hours',
      compactMode: true,
      defaultShiftStart: '09:00',
      defaultShiftEnd: '17:00',
      defaultBreakMinutes: 60,
      standardDayMinutes: 480,
      sickPayPercent: 80,
    });
  }
}

async function seedReviewsAndExpensesIfEmpty(): Promise<void> {
  const [{ value: revCount }] = await db.select({ value: count() }).from(performanceReviews);
  const [{ value: expCount }] = await db.select({ value: count() }).from(expenseClaims);

  if (revCount > 0 && expCount > 0) return;

  const emps = await db.select().from(employees);
  if (emps.length === 0) return;

  const todayStr = new Date().toISOString().split('T')[0];

  if (revCount === 0) {
    await db.insert(performanceReviews).values([
      {
        employeeId: emps[0].id,
        reviewPeriod: '2026-Q4',
        reviewerName: 'Marcus Sterling',
        rating: 5,
        kpiScore: '96.50',
        recommendedRaisePercent: '6.00',
        raiseApplied: false,
        strengths: 'Led cloud migration ahead of schedule with zero downtime.',
        improvements: 'Delegate more architecture reviews to senior engineers.',
      },
      {
        employeeId: emps[1 % emps.length].id,
        reviewPeriod: '2026-Q4',
        reviewerName: 'Elena Vance',
        rating: 4,
        kpiScore: '89.00',
        recommendedRaisePercent: '4.00',
        raiseApplied: false,
        strengths: 'High code quality and consistent sprint velocity.',
        improvements: 'Expand cross-team documentation.',
      },
      {
        employeeId: emps[4 % emps.length].id,
        reviewPeriod: '2026-Q4',
        reviewerName: 'David Alverez',
        rating: 5,
        kpiScore: '94.00',
        recommendedRaisePercent: '5.50',
        raiseApplied: true,
        strengths: 'Exceeded quarterly enterprise sales quota by 28%.',
        improvements: 'Standardize CRM handoff notes for onboarding team.',
      },
    ]);
  }

  if (expCount === 0) {
    await db.insert(expenseClaims).values([
      {
        employeeId: emps[0].id,
        expenseDate: todayStr,
        category: 'Software',
        description: 'Annual JetBrains & DevOps CLI licenses',
        amount: '249.00',
        status: 'Approved',
      },
      {
        employeeId: emps[4 % emps.length].id,
        expenseDate: todayStr,
        category: 'Travel',
        description: 'Client onsite flight & hotel',
        amount: '640.50',
        status: 'Pending',
      },
      {
        employeeId: emps[1 % emps.length].id,
        expenseDate: todayStr,
        category: 'Equipment',
        description: 'Ergonomic mechanical keyboard & monitor arm',
        amount: '185.00',
        status: 'Reimbursed',
      },
    ]);
  }
}

function hashPassword(password: string): string {
  const salt = 'pulsehr_secure_salt';
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

export { hashPassword };

async function ensureAdminUserSeeded(): Promise<void> {
  const existingAdmin = await db.select().from(users).where(eq(users.username, 'admin'));
  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      username: 'admin',
      passwordHash: hashPassword('admin123'),
      fullName: 'System Administrator',
      role: 'admin',
      status: 'approved',
    });
    console.log('Default admin user seeded: admin / admin123');
  }
}

if (process.argv[1]?.endsWith('seed.ts')) {
  ensureSchemaAndSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

