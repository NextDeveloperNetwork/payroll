import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  date,
  timestamp,
  boolean,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const departments = pgTable('departments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  managerName: varchar('manager_name', { length: 120 }),
  budget: numeric('budget', { precision: 12, scale: 2 }).default('0.00').notNull(),
  location: varchar('location', { length: 120 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  employeeCode: varchar('employee_code', { length: 30 }).notNull().unique(),
  firstName: varchar('first_name', { length: 80 }).notNull(),
  lastName: varchar('last_name', { length: 80 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  phone: varchar('phone', { length: 40 }),
  departmentId: integer('department_id').references(() => departments.id, {
    onDelete: 'set null',
  }),
  position: varchar('position', { length: 100 }).notNull(),
  employmentType: varchar('employment_type', { length: 40 }).default('Full-Time').notNull(), // Full-Time, Part-Time, Contract
  status: varchar('status', { length: 30 }).default('Active').notNull(), // Active, On Leave, Terminated
  hireDate: date('hire_date').notNull(),
  baseSalary: numeric('base_salary', { precision: 12, scale: 2 }).default('0.00').notNull(), // Monthly base salary
  hourlyRate: numeric('hourly_rate', { precision: 10, scale: 2 }).default('25.00').notNull(),
  overtimeRateMultiplier: numeric('overtime_rate_multiplier', { precision: 4, scale: 2 }).default('1.50').notNull(),
  weeklyTargetHours: integer('weekly_target_hours').default(40).notNull(),
  bankAccount: varchar('bank_account', { length: 80 }),
  taxRatePercent: numeric('tax_rate_percent', { precision: 5, scale: 2 }).default('15.00').notNull(),
  gender: varchar('gender', { length: 20 }), // Male, Female, Other
  dateOfBirth: date('date_of_birth'),
  idNumber: varchar('id_number', { length: 50 }),
  idPhoto: text('id_photo'),
  docMedicalReport: boolean('doc_medical_report').default(false).notNull(),
  docMedicalChart: boolean('doc_medical_chart').default(false).notNull(),
  docWorkContract: boolean('doc_work_contract').default(false).notNull(),
  docWorkBook: boolean('doc_work_book').default(false).notNull(), // Work chart (libreze pune)
  docDeclaration: boolean('doc_declaration').default(false).notNull(),
  docTraining: boolean('doc_training').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const workSchedules = pgTable('work_schedules', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  workDate: date('work_date').notNull(),
  shiftType: varchar('shift_type', { length: 40 }).default('Morning').notNull(), // Morning, Afternoon, Night, Remote, Off
  startTime: varchar('start_time', { length: 10 }).notNull(), // e.g. "09:00"
  endTime: varchar('end_time', { length: 10 }).notNull(),     // e.g. "17:00"
  breakMinutes: integer('break_minutes').default(60).notNull(),
  plannedHours: numeric('planned_hours', { precision: 5, scale: 2 }).default('8.00').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const attendanceLogs = pgTable('attendance_logs', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  workDate: date('work_date').notNull(),
  clockIn: varchar('clock_in', { length: 10 }).notNull(),   // "08:55"
  clockOut: varchar('clock_out', { length: 10 }).notNull(), // "17:30"
  breakMinutes: integer('break_minutes').default(60).notNull(),
  regularHours: numeric('regular_hours', { precision: 5, scale: 2 }).default('8.00').notNull(),
  overtimeHours: numeric('overtime_hours', { precision: 5, scale: 2 }).default('0.00').notNull(),
  totalHours: numeric('total_hours', { precision: 5, scale: 2 }).default('8.00').notNull(),
  status: varchar('status', { length: 30 }).default('Present').notNull(), // Present, Late, Overtime, Remote, Absent
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payrolls = pgTable('payrolls', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  payPeriod: varchar('pay_period', { length: 20 }).notNull(), // e.g. "2026-11"
  basePay: numeric('base_pay', { precision: 12, scale: 2 }).default('0.00').notNull(),
  regularHoursWorked: numeric('regular_hours_worked', { precision: 6, scale: 2 }).default('160.00').notNull(),
  overtimeHoursWorked: numeric('overtime_hours_worked', { precision: 6, scale: 2 }).default('0.00').notNull(),
  overtimePay: numeric('overtime_pay', { precision: 12, scale: 2 }).default('0.00').notNull(),
  bonuses: numeric('bonuses', { precision: 12, scale: 2 }).default('0.00').notNull(),
  allowances: numeric('allowances', { precision: 12, scale: 2 }).default('0.00').notNull(),
  deductions: numeric('deductions', { precision: 12, scale: 2 }).default('0.00').notNull(),
  grossPay: numeric('gross_pay', { precision: 12, scale: 2 }).default('0.00').notNull(),
  socialSecurityAmount: numeric('social_security_amount', { precision: 12, scale: 2 })
    .default('0.00')
    .notNull(),
  medicalSecurityAmount: numeric('medical_security_amount', { precision: 12, scale: 2 })
    .default('0.00')
    .notNull(),
  incomeTaxAmount: numeric('income_tax_amount', { precision: 12, scale: 2 })
    .default('0.00')
    .notNull(),
  taxAmount: numeric('tax_amount', { precision: 12, scale: 2 }).default('0.00').notNull(),
  netSalary: numeric('net_salary', { precision: 12, scale: 2 }).default('0.00').notNull(),
  paymentStatus: varchar('payment_status', { length: 30 }).default('Pending').notNull(), // Pending, Approved, Paid
  paymentDate: date('payment_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leaveRequests = pgTable('leave_requests', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  leaveType: varchar('leave_type', { length: 50 }).notNull(), // Annual, Sick, Parental, Unpaid, Personal
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  daysCount: integer('days_count').default(1).notNull(),
  reason: text('reason').notNull(),
  status: varchar('status', { length: 30 }).default('Pending').notNull(), // Pending, Approved, Rejected
  approvedBy: varchar('approved_by', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const performanceReviews = pgTable('performance_reviews', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  reviewPeriod: varchar('review_period', { length: 30 }).notNull(), // e.g. "2026-Q4"
  reviewerName: varchar('reviewer_name', { length: 120 }).notNull(),
  rating: integer('rating').default(4).notNull(), // 1 to 5
  kpiScore: numeric('kpi_score', { precision: 5, scale: 2 }).default('85.00').notNull(), // 0 to 100
  recommendedRaisePercent: numeric('recommended_raise_percent', { precision: 5, scale: 2 })
    .default('0.00')
    .notNull(),
  raiseApplied: boolean('raise_applied').default(false).notNull(),
  strengths: text('strengths'),
  improvements: text('improvements'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const expenseClaims = pgTable('expense_claims', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  expenseDate: date('expense_date').notNull(),
  category: varchar('category', { length: 60 }).notNull(), // Travel, Equipment, Software, Meals, Training
  description: text('description').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).default('0.00').notNull(),
  status: varchar('status', { length: 30 }).default('Pending').notNull(), // Pending, Approved, Reimbursed, Rejected
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const hrSettings = pgTable('hr_settings', {
  id: serial('id').primaryKey(),
  timeUnit: varchar('time_unit', { length: 20 }).default('hours').notNull(), // 'hours' | 'minutes'
  compactMode: boolean('compact_mode').default(true).notNull(),
  defaultShiftStart: varchar('default_shift_start', { length: 10 }).default('09:00').notNull(),
  defaultShiftEnd: varchar('default_shift_end', { length: 10 }).default('17:00').notNull(),
  defaultBreakMinutes: integer('default_break_minutes').default(60).notNull(),
  standardDayMinutes: integer('standard_day_minutes').default(480).notNull(),
  sickPayPercent: integer('sick_pay_percent').default(80).notNull(),
  socialSecurityPercent: numeric('social_security_percent', { precision: 5, scale: 2 })
    .default('9.50')
    .notNull(),
  medicalSecurityPercent: numeric('medical_security_percent', { precision: 5, scale: 2 })
    .default('1.70')
    .notNull(),
  incomeTaxPercent: numeric('income_tax_percent', { precision: 5, scale: 2 })
    .default('13.00')
    .notNull(),
  exportHeader: text('export_header').default('PulseHR Workforce Management').notNull(),
  exportFooter: text('export_footer').default('Confidential • Generated by PulseHR').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const salaryHistory = pgTable('salary_history', {
  id: serial('id').primaryKey(),
  employeeId: integer('employee_id')
    .references(() => employees.id, { onDelete: 'cascade' })
    .notNull(),
  previousSalary: numeric('previous_salary', { precision: 12, scale: 2 }).default('0.00').notNull(),
  newSalary: numeric('new_salary', { precision: 12, scale: 2 }).default('0.00').notNull(),
  changeAmount: numeric('change_amount', { precision: 12, scale: 2 }).default('0.00').notNull(),
  effectiveDate: date('effective_date').notNull(),
  reason: text('reason').default('Base Salary Updated').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 80 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 120 }),
  role: varchar('role', { length: 20 }).default('viewer').notNull(), // 'admin' | 'viewer'
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'approved' | 'pending' | 'rejected'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  employees: many(employees),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
  department: one(departments, {
    fields: [employees.departmentId],
    references: [departments.id],
  }),
  schedules: many(workSchedules),
  attendanceLogs: many(attendanceLogs),
  payrolls: many(payrolls),
  leaveRequests: many(leaveRequests),
  performanceReviews: many(performanceReviews),
  expenseClaims: many(expenseClaims),
  salaryHistory: many(salaryHistory),
}));

