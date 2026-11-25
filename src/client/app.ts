interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  departmentId: number | null;
  position: string;
  employmentType: string;
  status: string;
  hireDate: string;
  baseSalary: string;
  hourlyRate: string;
  overtimeRateMultiplier: string;
  weeklyTargetHours: number;
  bankAccount: string | null;
  taxRatePercent: string;
  gender?: string | null;
  dateOfBirth?: string | null;
  idNumber?: string | null;
  idPhoto?: string | null;
  docMedicalReport?: boolean;
  docMedicalChart?: boolean;
  docWorkContract?: boolean;
  docWorkBook?: boolean;
  docDeclaration?: boolean;
  docTraining?: boolean;
}

interface WorkSchedule {
  id: number;
  employeeId: number;
  workDate: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  plannedHours: string;
  notes: string | null;
}

interface AttendanceLog {
  id: number;
  employeeId: number;
  workDate: string;
  clockIn: string;
  clockOut: string;
  breakMinutes: number;
  regularHours: string;
  overtimeHours: string;
  totalHours: string;
  status: string;
  notes: string | null;
}

interface PayrollRecord {
  id: number;
  employeeId: number;
  payPeriod: string;
  basePay: string;
  regularHoursWorked: string;
  overtimeHoursWorked: string;
  overtimePay: string;
  bonuses: string;
  allowances: string;
  deductions: string;
  grossPay: string;
  socialSecurityAmount: string;
  medicalSecurityAmount: string;
  incomeTaxAmount: string;
  taxAmount: string;
  netSalary: string;
  paymentStatus: string;
  paymentDate: string | null;
  notes: string | null;
}

interface HRSettings {
  id?: number;
  timeUnit: 'hours' | 'minutes';
  compactMode: boolean;
  defaultShiftStart: string;
  defaultShiftEnd: string;
  defaultBreakMinutes: number;
  standardDayMinutes: number;
  sickPayPercent: number;
  socialSecurityPercent: string;
  medicalSecurityPercent: string;
  incomeTaxPercent: string;
  exportHeader?: string;
  exportFooter?: string;
}

interface UserRecord {
  id: number;
  username: string;
  fullName: string | null;
  role: 'admin' | 'viewer';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface AuthUser {
  id: number;
  username: string;
  fullName: string | null;
  role: 'admin' | 'viewer';
  status: string;
}

interface SalaryHistoryRecord {
  id: number;
  employeeId: number;
  previousSalary: string;
  newSalary: string;
  changeAmount: string;
  effectiveDate: string;
  reason: string;
  createdAt: string;
}

interface MonthlyStatRecord {
  month: string;
  monthIndex: number;
  monthName: string;
  monthShort: string;
  employeeCount: number;
  totalHours: number;
  totalSalary: number;
  absencesCount: number;
  leavesCount: number;
  sickCount: number;
  avgSalary: number;
}

interface OverviewData {
  year: number;
  availableYears: number[];
  metrics: {
    totalEmployees: number;
    activeEmployees: number;
    annualTotalSalary: number;
    annualTotalHours: number;
    annualTotalAbsences: number;
    annualTotalLeaves: number;
    annualTotalSick: number;
    avgMonthlyPayroll: number;
  };
  monthlyStats: MonthlyStatRecord[];
  employees: Employee[];
  recentAttendance: AttendanceLog[];
  payrolls: PayrollRecord[];
}

type Language = 'en' | 'sq' | 'it';

const I18N: Record<Language, Record<string, string>> = {
  en: {
    nav_overview: 'Overview',
    nav_timetable: 'Workhours Table',
    nav_attendance: 'Time Logs',
    nav_payroll: 'Salary & Payroll',
    nav_employees: 'Employees',
    nav_salary_history: 'Base Salary Records',
    nav_settings: 'Settings',
    nav_users: 'User Approvals',
    title_dashboard: 'Overview Dashboard',
    sub_dashboard: 'Real-time workforce analytics, monthly hours & payroll',
    title_timetable: 'Workhours Timetable',
    sub_timetable: 'Monthly & weekly employee workhours matrix',
    title_attendance: 'Time Logs & Attendance',
    sub_attendance: 'Clock-in/out records and overtime tracking',
    title_payroll: 'Salary & Payroll',
    sub_payroll: 'Monthly payroll runs, taxes, bonuses, and payslips',
    title_employees: 'Employees Directory',
    sub_employees: 'Date, employ number, name, surname, bank number, status & base salary',
    title_salary_history: 'Base Salary Records',
    sub_salary_history: 'Complete history of all employee base pay per hour edits',
    title_settings: 'Settings',
    sub_settings: 'Choose Hours vs Minutes recording, compact density & defaults',
    title_users: 'User Approvals & Access',
    sub_users: 'Manage viewer access, approve registrations, and assign roles',
    btn_log_time: '+ Log Time',
    btn_employee: '+ Employee',
    btn_logout: 'Log Out ⏻',
    btn_recalc_payroll: '⚡ Recalculate Payroll',
    btn_export_bank: '🏦 Export for Bank',
    btn_export_excel: '📥 Export Excel',
    btn_export_pdf: '📄 Export PDF',
    btn_quick_add: '⚡ Quick Add:',
    btn_add_emp: '+ Add Employee',
    btn_save: 'Save',
    btn_cancel: 'Cancel',
    btn_save_settings: 'Save Settings',
    btn_refresh: '🔄 Refresh',
    btn_monthly: 'Monthly',
    btn_weekly: 'Weekly',
    btn_today: 'Today',
    btn_prev: 'Prev',
    btn_next: 'Next',
    btn_select_cells: 'Multi-Select Cells',
    btn_clear_sel: 'Clear Selection',
    btn_apply_sel: 'Apply to Selected',
    th_employee: 'Employee',
    th_emp_code: 'Employ #',
    th_id_photo: 'Photo',
    th_gender: 'Gender',
    th_dob: 'Date of Birth',
    th_id_number: 'ID Number',
    th_worker_chart: 'Worker Chart',
    doc_med_report: 'Medical Report',
    doc_med_chart: 'Medical Chart',
    doc_work_contract: 'Work Contract',
    doc_work_book: 'Work Chart (Librezë Pune)',
    doc_declaration: 'Declaration',
    doc_training: 'Training',
    btn_worker_chart: '📋 Worker Chart',
    th_name: 'Name',
    th_surname: 'Surname',
    th_bank_num: 'Bank Number',
    th_base_salary: 'Base Salary',
    th_base_rate: 'Base Pay / Hr',
    th_worked_time: 'Worked Time',
    th_gross_pay: 'Gross Pay',
    th_social_sec: 'Social Sec (9.5%)',
    th_med_sec: 'Medical Sec (1.7%)',
    th_income_tax: 'Income Tax',
    th_net_salary: 'Net Salary',
    th_month_total: 'Month Total',
    th_price_hr: 'Price / Hr',
    th_total: 'Total',
    th_total_hours: 'Total Hours',
    th_total_pay: 'Total Pay',
    total_grand: 'Grand Total',
    staff: 'staff',
    th_actions: 'Actions',
    th_date: 'Date',
    th_clock_in: 'Clock In',
    th_clock_out: 'Clock Out',
    th_break: 'Break',
    th_regular: 'Regular',
    th_overtime: 'Overtime',
    th_status: 'Status',
    th_reason: 'Reason for Change',
    th_changed_by: 'Changed By',
    th_username: 'Username',
    th_fullname: 'Full Name',
    th_role: 'Role',
    theme_clear: 'Clear',
    theme_dark: 'Dark',
    unit_hours: 'Hours',
    unit_minutes: 'Minutes',
    fixed: 'Fixed',
    fixed_salary: 'Fixed Salary',
    click_edit_rate: 'Click to edit hourly rate',
    click_edit_salary: 'Click to edit base salary',
    toast_lang_changed: 'Language switched to English',
    annual_filter: 'Annual Filter',
    year: 'Year',
    kpi_active_staff: 'Active Workforce',
    kpi_annual_salary: 'Annual Total Salary',
    kpi_annual_hours: 'Annual Worked Time',
    kpi_total_absences: 'Total Absences',
    kpi_leaves_sick: 'Leaves & Sick',
    kpi_avg_monthly: 'Avg Monthly Payroll',
    chart_metric_salary: '💰 Total Salary',
    chart_metric_hours: '⏱️ Worked Hours',
    chart_metric_absences: '🚫 Absences & Leaves',
    th_month: 'Month',
    th_active_employees: 'Active Employees',
    th_leaves: 'Leaves',
    th_sick: 'Sick',
    th_avg_salary: 'Avg Salary / Emp',
    btn_view_in_timetable: 'Open Timetable',
    annual_total: 'Annual Total',
    chart_title: 'Annual Trends',
    table_monthly_stats: 'Monthly Statistics Matrix',
    btn_export_annual: '📥 Export Annual Excel',
  },
  sq: {
    nav_overview: 'Përmbledhje',
    nav_timetable: 'Tabela e Orëve',
    nav_attendance: 'Regjistri i Orarit',
    nav_payroll: 'Pagat & Payroll',
    nav_employees: 'Punonjësit',
    nav_salary_history: 'Historiku i Pagave',
    nav_settings: 'Cilësimet',
    nav_users: 'Miratimi i Përdoruesve',
    title_dashboard: 'Paneli i Përmbledhjes',
    sub_dashboard: 'Analitika në kohë reale, orët mujore & lista e pagave',
    title_timetable: 'Tabela e Orëve të Punës',
    sub_timetable: 'Matrica mujore dhe javore e orëve për çdo punonjës',
    title_attendance: 'Regjistri Ditor i Prezencës',
    sub_attendance: 'Hyrjet, daljet, pushimet dhe orët shtesë',
    title_payroll: 'Llogaritja e Pagave & Payroll',
    sub_payroll: 'Paga Bruto, Sigurimet Shoqërore (9.5%), Shëndetësore (1.7%), TAP & Neto',
    title_employees: 'Drejtoria e Punonjësve',
    sub_employees: 'Data, nr. punonjësit, emri, mbiemri, nr. llogarisë, statusi & paga bazë',
    title_salary_history: 'Historiku i Pagave Bazë',
    sub_salary_history: 'Regjistrimi i plotë i të gjitha modifikimeve të tarifës së pagës për orë',
    title_settings: 'Cilësimet',
    sub_settings: 'Zgjidh regjistrimin me Orë ose Minuta, densitetin & parametrat kryesorë',
    title_users: 'Miratimi i Përdoruesve & Qasja',
    sub_users: 'Menaxho qasjen e lexuesve, mirato regjistrimet dhe cakto rolet',
    btn_log_time: '+ Regjistro Orë',
    btn_employee: '+ Punonjës',
    btn_logout: 'Dil ⏻',
    btn_recalc_payroll: '⚡ Rillogarit Pagat',
    btn_export_bank: '🏦 Eksporto për Bankë',
    btn_export_excel: '📥 Eksporto Excel',
    btn_export_pdf: '📄 Eksporto PDF',
    btn_quick_add: '⚡ Shtim i Shpejtë:',
    btn_add_emp: '+ Shto Punonjës',
    btn_save: 'Ruaj',
    btn_cancel: 'Anulo',
    btn_save_settings: 'Ruaj Cilësimet',
    btn_refresh: '🔄 Rifresko',
    btn_monthly: 'Mujore',
    btn_weekly: 'Javore',
    btn_today: 'Sot',
    btn_prev: 'Para',
    btn_next: 'Tjetra',
    btn_select_cells: 'Zgjedhje e Shumëfishtë',
    btn_clear_sel: 'Pastro Zgjedhjen',
    btn_apply_sel: 'Apliko tek të Zgjedhurat',
    th_employee: 'Punonjësi',
    th_emp_code: 'Nr. Punonjësit',
    th_id_photo: 'Foto',
    th_gender: 'Gjinia',
    th_dob: 'Datëlindja',
    th_id_number: 'Nr. Identifikimit (ID)',
    th_worker_chart: 'Kartela e Punëtorit',
    doc_med_report: 'Raport Mjekësor',
    doc_med_chart: 'Kartelë Mjekësore',
    doc_work_contract: 'Kontratë Pune',
    doc_work_book: 'Librezë Pune',
    doc_declaration: 'Deklaratë',
    doc_training: 'Trajnim',
    btn_worker_chart: '📋 Kartela e Punëtorit',
    th_name: 'Emri',
    th_surname: 'Mbiemri',
    th_bank_num: 'Nr. Llogarisë Bankare',
    th_base_salary: 'Paga Bazë',
    th_base_rate: 'Paga Bazë / Orë',
    th_worked_time: 'Koha e Punuar',
    th_gross_pay: 'Paga Bruto',
    th_social_sec: 'Sig. Shoqërore (9.5%)',
    th_med_sec: 'Sig. Shëndetësore (1.7%)',
    th_income_tax: 'Tatimi mbi të Ardhurat (TAP)',
    th_net_salary: 'Paga Neto',
    th_month_total: 'Totali Mujor',
    th_price_hr: 'Tarifa / Orë',
    th_total: 'Totali',
    th_total_hours: 'Totali i Orëve',
    th_total_pay: 'Paga Totale',
    total_grand: 'Totali i Përgjithshëm',
    staff: 'punonjës',
    th_actions: 'Veprimet',
    th_date: 'Data',
    th_clock_in: 'Hyrja',
    th_clock_out: 'Dalja',
    th_break: 'Pushimi',
    th_regular: 'Normale',
    th_overtime: 'Shtesë',
    th_status: 'Statusi',
    th_reason: 'Arsyeja e Ndryshimit',
    th_changed_by: 'Modifikuar Nga',
    th_username: 'Përdoruesi',
    th_fullname: 'Emri i Plotë',
    th_role: 'Roli',
    theme_clear: 'E Ndritur',
    theme_dark: 'E Errët',
    unit_hours: 'Orë',
    unit_minutes: 'Minuta',
    fixed: 'Fikse',
    fixed_salary: 'Paga Fikse',
    click_edit_rate: 'Kliko për të ndryshuar tarifën për orë',
    click_edit_salary: 'Kliko për të ndryshuar pagën bazë',
    toast_lang_changed: 'Gjuha u ndryshua në Shqip',
    annual_filter: 'Filtri Vjetor',
    year: 'Viti',
    kpi_active_staff: 'Stafi Aktiv',
    kpi_annual_salary: 'Paga Totale Vjetore',
    kpi_annual_hours: 'Koha Totale e Punës',
    kpi_total_absences: 'Mungesat Totale',
    kpi_leaves_sick: 'Pushime & Raporte',
    kpi_avg_monthly: 'Mesatarja Mujore e Pagave',
    chart_metric_salary: '💰 Paga Totale',
    chart_metric_hours: '⏱️ Orët e Punës',
    chart_metric_absences: '🚫 Mungesat & Pushimet',
    th_month: 'Muaji',
    th_active_employees: 'Numri i Punonjësve',
    th_leaves: 'Pushime',
    th_sick: 'Raporte Mjekësore',
    th_avg_salary: 'Paga Mesatare / Punonjës',
    btn_view_in_timetable: 'Hap Tabelën',
    annual_total: 'Totali Vjetor',
    chart_title: 'Trendet Vjetore',
    table_monthly_stats: 'Matrica e Statistikave Mujore',
    btn_export_annual: '📥 Eksporto Raport Vjetor Excel',
  },
  it: {
    nav_overview: 'Panoramica',
    nav_timetable: 'Tabella Orari',
    nav_attendance: 'Registro Presenze',
    nav_payroll: 'Stipendi & Buste Paga',
    nav_employees: 'Dipendenti',
    nav_salary_history: 'Storico Stipendi',
    nav_settings: 'Impostazioni',
    nav_users: 'Approvazione Utenti',
    title_dashboard: 'Cruscotto Panoramica',
    sub_dashboard: 'Analisi in tempo reale, ore mensili e buste paga',
    title_timetable: 'Tabella Orari di Lavoro',
    sub_timetable: 'Matrice mensile e settimanale delle ore per ciascun dipendente',
    title_attendance: 'Registro Giornaliero Presenze',
    sub_attendance: 'Dettaglio ingressi, uscite, pause e ore di straordinario',
    title_payroll: 'Elaborazione Stipendi & Buste Paga',
    sub_payroll: 'Retribuzione Lorda, Previdenza (9.5%), Sanità (1.7%), IRPEF & Netto',
    title_employees: 'Elenco Dipendenti',
    sub_employees: 'Data, n. dipendente, nome, cognome, conto bancario, stato & stipendio base',
    title_salary_history: 'Storico Retribuzione Base',
    sub_salary_history: 'Cronologia completa di tutte le modifiche alla tariffa oraria base',
    title_settings: 'Impostazioni',
    sub_settings: 'Scegli registrazione in Ore o Minuti, densità e impostazioni predefinite',
    title_users: 'Approvazione Utenti & Accesso',
    sub_users: 'Gestisci gli accessi dei visualizzatori, approva registrazioni e assegna ruoli',
    btn_log_time: '+ Registra Ore',
    btn_employee: '+ Dipendente',
    btn_logout: 'Disconnetti ⏻',
    btn_recalc_payroll: '⚡ Ricalcola Buste Paga',
    btn_export_bank: '🏦 Esporta per Banca',
    btn_export_excel: '📥 Esporta Excel',
    btn_export_pdf: '📄 Esporta PDF',
    btn_quick_add: '⚡ Aggiunta Rapida:',
    btn_add_emp: '+ Aggiungi Dipendente',
    btn_save: 'Salva',
    btn_cancel: 'Annulla',
    btn_save_settings: 'Salva Impostazioni',
    btn_refresh: '🔄 Aggiorna',
    btn_monthly: 'Mensile',
    btn_weekly: 'Settimanale',
    btn_today: 'Oggi',
    btn_prev: 'Prec',
    btn_next: 'Succ',
    btn_select_cells: 'Selezione Multipla',
    btn_clear_sel: 'Annulla Selezione',
    btn_apply_sel: 'Applica a Selezionate',
    th_employee: 'Dipendente',
    th_emp_code: 'N. Dipendente',
    th_id_photo: 'Foto',
    th_gender: 'Genere',
    th_dob: 'Data di Nascita',
    th_id_number: 'Codice Fiscale / ID',
    th_worker_chart: 'Scheda Dipendente',
    doc_med_report: 'Referto Medico',
    doc_med_chart: 'Cartella Clinica',
    doc_work_contract: 'Contratto di Lavoro',
    doc_work_book: 'Libretto di Lavoro',
    doc_declaration: 'Dichiarazione',
    doc_training: 'Formazione',
    btn_worker_chart: '📋 Scheda Dipendente',
    th_name: 'Nome',
    th_surname: 'Cognome',
    th_bank_num: 'Numero di Conto Bancario',
    th_base_salary: 'Stipendio Base',
    th_base_rate: 'Tariffa / Ora',
    th_worked_time: 'Tempo Lavorato',
    th_gross_pay: 'Stipendio Lordo',
    th_social_sec: 'Prev. Sociale (9.5%)',
    th_med_sec: 'Ass. Sanitaria (1.7%)',
    th_income_tax: 'Imposta sul Reddito',
    th_net_salary: 'Stipendio Netto',
    th_month_total: 'Totale Mensile',
    th_price_hr: 'Tariffa / Ora',
    th_total: 'Totale',
    th_total_hours: 'Totale Ore',
    th_total_pay: 'Retribuzione Totale',
    total_grand: 'Totale Generale',
    staff: 'dipendenti',
    th_actions: 'Azioni',
    th_date: 'Data',
    th_clock_in: 'Entrata',
    th_clock_out: 'Uscita',
    th_break: 'Pausa',
    th_regular: 'Ordinarie',
    th_overtime: 'Straordinario',
    th_status: 'Stato',
    th_reason: 'Motivo della Modifica',
    th_changed_by: 'Modificato Da',
    th_username: 'Nome Utente',
    th_fullname: 'Nome e Cognome',
    th_role: 'Ruolo',
    theme_clear: 'Chiaro',
    theme_dark: 'Scuro',
    unit_hours: 'Ore',
    unit_minutes: 'Minuti',
    fixed: 'Fisso',
    fixed_salary: 'Stipendio Fisso',
    click_edit_rate: 'Clicca per modificare la tariffa oraria',
    click_edit_salary: 'Clicca per modificare lo stipendio base',
    toast_lang_changed: 'Lingua cambiata in Italiano',
    annual_filter: 'Filtro Annuale',
    year: 'Anno',
    kpi_active_staff: 'Personale Attivo',
    kpi_annual_salary: 'Monte Stipendi Annuale',
    kpi_annual_hours: 'Ore Lavorate Totali',
    kpi_total_absences: 'Assenze Totali',
    kpi_leaves_sick: 'Ferie & Malattia',
    kpi_avg_monthly: 'Media Mensile Buste Paga',
    chart_metric_salary: '💰 Stipendio Totale',
    chart_metric_hours: '⏱️ Ore Lavorate',
    chart_metric_absences: '🚫 Assenze & Ferie',
    th_month: 'Mese',
    th_active_employees: 'Numero Dipendenti',
    th_leaves: 'Ferie / Permessi',
    th_sick: 'Malattia',
    th_avg_salary: 'Stipendio Medio / Dip.',
    btn_view_in_timetable: 'Apri Tabella',
    annual_total: 'Totale Annuale',
    chart_title: 'Andamento Annuale',
    table_monthly_stats: 'Matrice Statistiche Mensili',
    btn_export_annual: '📥 Esporta Report Annuale Excel',
  },
};

class PulseHRApp {
  private employees: Employee[] = [];
  private schedules: WorkSchedule[] = [];
  private timeLogRecords: WorkSchedule[] = [];
  private attendanceLogs: AttendanceLog[] = [];
  private payrolls: PayrollRecord[] = [];
  private salaryHistory: SalaryHistoryRecord[] = [];
  private users: UserRecord[] = [];
  private currentUser: AuthUser | null = null;
  private authToken: string | null = localStorage.getItem('pulsehr_token');
  private settings: HRSettings = {
    timeUnit: 'hours',
    compactMode: true,
    defaultShiftStart: '09:00',
    defaultShiftEnd: '17:00',
    defaultBreakMinutes: 60,
    standardDayMinutes: 480,
    sickPayPercent: 80,
    socialSecurityPercent: '9.50',
    medicalSecurityPercent: '1.70',
    incomeTaxPercent: '13.00',
    exportHeader: 'PulseHR Workforce Management',
    exportFooter: 'Confidential • Generated by PulseHR',
  };

  private timetableMode: 'monthly' | 'weekly' = 'monthly';
  private currentMonth: string;
  private currentWeekMonday: Date;
  private ctxTarget: { empId: number; dateStr: string } | null = null;
  private selectMode = false;
  private selectedCells: Set<string> = new Set();
  private lastSelectedCell: { empId: number; dateStr: string } | null = null;
  private focusedCell: { empId: number; dateStr: string } | null = null;
  private selectedRowEmpId: number | null = null;
  private currentTheme: 'dark' | 'light' =
    (localStorage.getItem('pulsehr_theme') as 'light') || 'dark';
  private sidebarCollapsed: boolean =
    localStorage.getItem('pulsehr_sidebar_collapsed') === 'true';
  private currentLang: Language =
    (localStorage.getItem('pulsehr_lang') as Language) || 'en';
  private overviewYear: number = new Date().getFullYear();
  private overviewMetric: 'salary' | 'hours' | 'absences' = 'salary';
  private overviewData: OverviewData | null = null;

  constructor() {
    const now = new Date();
    this.currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    this.currentWeekMonday = this.getMonday(now);

    const monthPicker = document.getElementById('timetable-month-picker') as HTMLInputElement | null;
    if (monthPicker) monthPicker.value = this.currentMonth;

    this.initLanguage();
    this.bindLanguageToggle();
    this.initTheme();
    this.bindThemeToggle();
    this.initSidebarCollapse();
    this.bindSidebarCollapse();
    this.bindNavigation();
    this.bindModals();
    this.bindForms();
    this.bindFiltersAndActions();
    this.bindCellContextMenu();
    this.bindKeyboardNavigation();
    this.bindAuthEvents();
    this.initAuthAndLoad();
  }

  public t(key: string, defaultText = ''): string {
    return I18N[this.currentLang]?.[key] ?? I18N.en?.[key] ?? defaultText ?? key;
  }

  private initLanguage(): void {
    this.applyLanguage(this.currentLang, false);
  }

  private applyLanguage(lang: Language, persist = true): void {
    this.currentLang = lang;
    if (persist) {
      localStorage.setItem('pulsehr_lang', lang);
    }
    document.documentElement.lang = lang;

    const flagEl = document.getElementById('lang-flag');
    const labelEl = document.getElementById('lang-label');
    const flags: Record<Language, string> = { en: '🇬🇧', sq: '🇦🇱', it: '🇮🇹' };
    const labels: Record<Language, string> = { en: 'EN', sq: 'SQ', it: 'IT' };
    if (flagEl) flagEl.textContent = flags[lang];
    if (labelEl) labelEl.textContent = labels[lang];

    document.querySelectorAll('.lang-opt').forEach((opt) => {
      const optLang = opt.getAttribute('data-lang');
      const check = opt.querySelector('.lang-check');
      if (check) check.textContent = optLang === lang ? '✓' : '';
    });

    const setLang = document.getElementById('set-lang-select') as HTMLSelectElement | null;
    if (setLang) setLang.value = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      if (k) {
        const tr = this.t(k);
        if (tr) el.textContent = tr;
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const k = el.getAttribute('data-i18n-title');
      if (k) {
        const tr = this.t(k);
        if (tr) el.setAttribute('title', tr);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (k) {
        const tr = this.t(k);
        if (tr) el.setAttribute('placeholder', tr);
      }
    });

    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
      const tabId = activeNav.getAttribute('data-tab');
      if (tabId) {
        const [title, sub] = this.getTabTitleAndSubtitle(tabId);
        const titleEl = document.getElementById('page-title');
        const subEl = document.getElementById('page-subtitle');
        if (titleEl) titleEl.textContent = title;
        if (subEl) subEl.textContent = sub;
      }
    }

    const themeLabel = document.getElementById('theme-toggle-label');
    if (themeLabel) {
      themeLabel.textContent =
        this.currentTheme === 'light' ? this.t('theme_dark') : this.t('theme_clear');
    }

    this.applySettingsToUI();
  }

  private bindLanguageToggle(): void {
    const btn = document.getElementById('btn-lang-toggle');
    const dropdown = document.getElementById('lang-dropdown');

    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown?.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown?.contains(e.target as Node) && e.target !== btn) {
        dropdown?.classList.add('hidden');
      }
    });

    document.querySelectorAll('.lang-opt').forEach((opt) => {
      opt.addEventListener('click', () => {
        const selected = opt.getAttribute('data-lang') as Language;
        if (selected) {
          dropdown?.classList.add('hidden');
          this.applyLanguage(selected, true);
          this.renderAll();
          this.toast(this.t('toast_lang_changed'));
        }
      });
    });

    document.getElementById('set-lang-select')?.addEventListener('change', (e) => {
      const selected = (e.target as HTMLSelectElement).value as Language;
      if (selected) {
        this.applyLanguage(selected, true);
        this.renderAll();
        this.toast(this.t('toast_lang_changed'));
      }
    });
  }

  private getTabTitleAndSubtitle(tabId: string): [string, string] {
    const clean = tabId.replace('-', '_');
    return [this.t(`title_${clean}`), this.t(`sub_${clean}`)];
  }

  private initSidebarCollapse(): void {
    this.applySidebarCollapse(this.sidebarCollapsed, false);
  }

  private applySidebarCollapse(collapsed: boolean, persist = true): void {
    this.sidebarCollapsed = collapsed;
    if (persist) {
      localStorage.setItem('pulsehr_sidebar_collapsed', String(collapsed));
    }
    document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
    document.body.classList.toggle('sidebar-collapsed', collapsed);

    const toggleBtn = document.getElementById('btn-sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'title',
        collapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'
      );
    }

    const sideInd = document.getElementById('sidebar-unit-indicator');
    if (sideInd) {
      const unitLabel = this.settings.timeUnit === 'minutes' ? 'Minutes' : 'Hours';
      sideInd.textContent = collapsed
        ? this.settings.timeUnit === 'minutes'
          ? 'Min'
          : 'Hrs'
        : `Unit: ${unitLabel}`;
    }
  }

  private toggleSidebar(): void {
    this.applySidebarCollapse(!this.sidebarCollapsed, true);
  }

  private bindSidebarCollapse(): void {
    document.getElementById('btn-sidebar-toggle')?.addEventListener('click', () => {
      this.toggleSidebar();
    });

    document.getElementById('btn-topbar-sidebar-toggle')?.addEventListener('click', () => {
      this.toggleSidebar();
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        const target = e.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT')
        ) {
          return;
        }
        e.preventDefault();
        this.toggleSidebar();
      }
    });
  }

  private initTheme(): void {
    this.applyTheme(this.currentTheme, false);
  }

  private applyTheme(theme: 'dark' | 'light', persist = true): void {
    this.currentTheme = theme;
    if (persist) {
      localStorage.setItem('pulsehr_theme', theme);
    }
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('theme-light', isLight);
    document.body.classList.toggle('theme-light', isLight);

    const iconEl = document.getElementById('theme-toggle-icon');
    const labelEl = document.getElementById('theme-toggle-label');
    const selectEl = document.getElementById('set-theme-mode') as HTMLSelectElement | null;

    if (iconEl) iconEl.textContent = isLight ? '🌙' : '☀️';
    if (labelEl) labelEl.textContent = isLight ? 'Dark' : 'Clear';
    if (selectEl) selectEl.value = theme;
  }

  private bindThemeToggle(): void {
    const toggleBtn = document.getElementById('btn-theme-toggle');
    toggleBtn?.addEventListener('click', () => {
      const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(nextTheme, true);
      this.toast(`Theme set to ${nextTheme === 'light' ? 'Clear Theme (Light)' : 'Dark Theme'}`);
    });

    const selectEl = document.getElementById('set-theme-mode') as HTMLSelectElement | null;
    selectEl?.addEventListener('change', (e) => {
      const val = (e.target as HTMLSelectElement).value as 'dark' | 'light';
      this.applyTheme(val, true);
      this.toast(`Theme set to ${val === 'light' ? 'Clear Theme (Light)' : 'Dark Theme'}`);
    });
  }

  private async initAuthAndLoad(): Promise<void> {
    if (!this.authToken) {
      this.showAuthModal(true);
      return;
    }

    try {
      const res = await this.api<{ user: AuthUser }>('/api/auth/me');
      this.currentUser = res.user;
      this.applyUserRoleToUI();
      this.showAuthModal(false);
      await this.loadAllData();
    } catch (err) {
      this.authToken = null;
      localStorage.removeItem('pulsehr_token');
      this.showAuthModal(true);
    }
  }

  private showAuthModal(show: boolean): void {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) {
      overlay.classList.toggle('hidden', !show);
    }
  }

  private applyUserRoleToUI(): void {
    if (!this.currentUser) return;
    const isViewer = this.currentUser.role === 'viewer';
    document.body.classList.toggle('role-viewer', isViewer);
    document.body.classList.toggle('role-admin', !isViewer);

    const nameEl = document.getElementById('session-user-name');
    const roleEl = document.getElementById('session-user-role');
    const initialsEl = document.getElementById('session-user-initials');
    const userCard = document.getElementById('sidebar-user-card');
    const displayName = this.currentUser.fullName || this.currentUser.username;

    if (nameEl) nameEl.textContent = displayName;
    if (roleEl) {
      roleEl.textContent = this.currentUser.role === 'admin' ? 'Admin' : 'Viewer';
      roleEl.className = `badge ${this.currentUser.role === 'admin' ? 'badge-Approved' : 'badge-Pending'}`;
    }
    if (initialsEl) {
      const parts = displayName.trim().split(/\s+/);
      const initials = parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : displayName.slice(0, 2).toUpperCase();
      initialsEl.textContent = initials;
    }
    if (userCard) {
      userCard.setAttribute(
        'title',
        `${displayName} (${this.currentUser.role === 'admin' ? 'Administrator' : 'Viewer - Read Only'})`
      );
    }

    const topPill = document.getElementById('topbar-unit-pill');
    if (topPill) {
      if (isViewer) {
        topPill.removeAttribute('data-jump');
        topPill.removeAttribute('title');
        topPill.style.cursor = 'default';
      } else {
        topPill.setAttribute('data-jump', 'settings');
        topPill.setAttribute('title', 'Click to change in Settings');
        topPill.style.cursor = 'pointer';
      }
    }

    if (isViewer) {
      const activeSettings = document.querySelector('#tab-settings.active');
      const activeUsers = document.querySelector('#tab-users.active');
      if (activeSettings || activeUsers) {
        const dashBtn = document.querySelector('[data-tab="dashboard"]') as HTMLElement | null;
        dashBtn?.click();
      }
    }
  }

  private bindAuthEvents(): void {
    const btnLoginMode = document.getElementById('btn-auth-mode-login');
    const btnRegMode = document.getElementById('btn-auth-mode-register');
    const formLogin = document.getElementById('form-login');
    const formReg = document.getElementById('form-register');
    const subtitle = document.getElementById('auth-subtitle');
    const alertEl = document.getElementById('auth-alert');

    const showAlert = (msg: string, type: 'error' | 'success') => {
      if (!alertEl) return;
      alertEl.textContent = msg;
      alertEl.className = `auth-alert alert-${type}`;
      alertEl.classList.remove('hidden');
    };
    const hideAlert = () => alertEl?.classList.add('hidden');

    btnLoginMode?.addEventListener('click', () => {
      btnLoginMode.classList.add('active');
      btnRegMode?.classList.remove('active');
      formLogin?.classList.remove('hidden');
      formReg?.classList.add('hidden');
      if (subtitle) subtitle.textContent = 'Sign in with your approved credentials';
      hideAlert();
    });

    btnRegMode?.addEventListener('click', () => {
      btnRegMode.classList.add('active');
      btnLoginMode?.classList.remove('active');
      formReg?.classList.remove('hidden');
      formLogin?.classList.add('hidden');
      if (subtitle) subtitle.textContent = 'Create an account to request view-access';
      hideAlert();
    });

    formLogin?.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert();
      const username = (document.getElementById('login-username') as HTMLInputElement).value.trim();
      const password = (document.getElementById('login-password') as HTMLInputElement).value;
      try {
        const res = await this.api<{ token: string; user: AuthUser }>('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
        });
        this.authToken = res.token;
        localStorage.setItem('pulsehr_token', res.token);
        this.currentUser = res.user;
        this.applyUserRoleToUI();
        this.showAuthModal(false);
        this.toast(`Welcome back, ${res.user.fullName || res.user.username}`);
        await this.loadAllData();
      } catch (err: any) {
        showAlert(err.message, 'error');
      }
    });

    formReg?.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert();
      const fullName = (document.getElementById('reg-fullname') as HTMLInputElement).value.trim();
      const username = (document.getElementById('reg-username') as HTMLInputElement).value.trim();
      const password = (document.getElementById('reg-password') as HTMLInputElement).value;
      try {
        const res = await this.api<{ message: string }>('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({ fullName, username, password }),
        });
        showAlert(res.message, 'success');
        (formReg as HTMLFormElement).reset();
      } catch (err: any) {
        showAlert(err.message, 'error');
      }
    });

    document.getElementById('btn-logout')?.addEventListener('click', async () => {
      try {
        await this.api('/api/auth/logout', { method: 'POST' });
      } catch {}
      this.authToken = null;
      localStorage.removeItem('pulsehr_token');
      this.currentUser = null;
      window.location.reload();
    });
  }

  private getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    date.setDate(date.getDate() + diff);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private formatDateISO(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDuration(hoursVal: string | number, compact = false): string {
    const hours = typeof hoursVal === 'string' ? parseFloat(hoursVal || '0') : hoursVal;
    if (this.settings.timeUnit === 'minutes') {
      const mins = Math.round(hours * 60);
      return `${mins}m`;
    }
    const clean = parseFloat(hours.toFixed(2));
    return `${clean}h`;
  }

  private formatMoney(val: string | number): string {
    const num = typeof val === 'string' ? parseFloat(val || '0') : val;
    return `${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)} Lek`;
  }

  private getEmployeeName(empId: number): string {
    const emp = this.employees.find((e) => e.id === empId);
    return emp ? `${emp.firstName} ${emp.lastName}` : `Emp #${empId}`;
  }

  private toast(msg: string): void {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }

  private async api<T>(url: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    const res = await fetch(url, {
      ...options,
      headers: { ...headers, ...(options?.headers || {}) },
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401 && !url.includes('/api/auth/')) {
        this.authToken = null;
        localStorage.removeItem('pulsehr_token');
        this.currentUser = null;
        this.showAuthModal(true);
      }
      throw new Error(data.error || 'API Request failed');
    }
    return data as T;
  }

  public async loadAllData(): Promise<void> {
    try {
      const weekDates = this.getWeekDateStrings();
      const scheduleUrl =
        this.timetableMode === 'monthly'
          ? `/api/schedules?month=${this.currentMonth}`
          : `/api/schedules?startDate=${weekDates[0]}&endDate=${weekDates[6]}`;

      const [settings, emps, scheds, timeLogs, att, pays, salHist, overview] = await Promise.all([
        this.api<HRSettings>('/api/settings'),
        this.api<Employee[]>('/api/employees'),
        this.api<WorkSchedule[]>(scheduleUrl),
        this.api<WorkSchedule[]>('/api/schedules?types=Leave,Absence,Sick'),
        this.api<AttendanceLog[]>('/api/attendance'),
        this.api<PayrollRecord[]>('/api/payrolls'),
        this.api<SalaryHistoryRecord[]>('/api/salary-history'),
        this.api<OverviewData>(`/api/overview?year=${this.overviewYear}`).catch(() => null),
      ]);

      this.settings = settings;
      this.employees = emps;
      this.schedules = scheds;
      this.timeLogRecords = timeLogs;
      this.attendanceLogs = att;
      this.payrolls = pays;
      this.salaryHistory = salHist;
      if (overview) this.overviewData = overview;

      this.applySettingsToUI();
      this.populateDropdowns();
      this.renderAll();

      if (this.currentUser?.role === 'admin') {
        await this.loadUsers();
      }
    } catch (err: any) {
      this.toast(`Error loading data: ${err.message}`);
    }
  }

  private renderAll(): void {
    this.renderDashboard();
    this.renderTimetable();
    this.renderAttendance();
    this.renderPayroll();
    this.renderEmployees();
    this.renderSalaryHistory();
  }

  private applySettingsToUI(): void {
    document.body.classList.toggle('compact-ui', this.settings.compactMode);

    const unitLabel =
      this.settings.timeUnit === 'minutes' ? this.t('unit_minutes') : this.t('unit_hours');
    const unitWord =
      this.currentLang === 'sq' ? 'Njësia' : this.currentLang === 'it' ? 'Unità' : 'Unit';
    const sideInd = document.getElementById('sidebar-unit-indicator');
    const topPill = document.getElementById('topbar-unit-pill');
    const legUnit = document.getElementById('legend-unit-label');
    const attDirectLabel = document.getElementById('att-direct-label');

    if (sideInd) {
      sideInd.textContent = this.sidebarCollapsed
        ? this.settings.timeUnit === 'minutes'
          ? 'Min'
          : 'Hrs'
        : `${unitWord}: ${unitLabel}`;
    }
    if (topPill) topPill.textContent = `⏱ ${unitWord}: ${unitLabel}`;
    if (legUnit) legUnit.textContent = unitLabel;
    if (attDirectLabel) {
      attDirectLabel.textContent = `Or Direct Worked (${unitLabel}, optional)`;
    }

    const radioHours = document.getElementById('set-unit-hours') as HTMLInputElement | null;
    const radioMins = document.getElementById('set-unit-minutes') as HTMLInputElement | null;
    if (radioHours) radioHours.checked = this.settings.timeUnit === 'hours';
    if (radioMins) radioMins.checked = this.settings.timeUnit === 'minutes';

    const compactSel = document.getElementById('set-compact-mode') as HTMLSelectElement | null;
    const themeSel = document.getElementById('set-theme-mode') as HTMLSelectElement | null;
    const stdInput = document.getElementById('set-std-minutes') as HTMLInputElement | null;
    const startInput = document.getElementById('set-shift-start') as HTMLInputElement | null;
    const endInput = document.getElementById('set-shift-end') as HTMLInputElement | null;
    const brkInput = document.getElementById('set-break-minutes') as HTMLInputElement | null;
    const sickInput = document.getElementById('set-sick-percent') as HTMLInputElement | null;
    const socInput = document.getElementById('set-social-sec') as HTMLInputElement | null;
    const medInput = document.getElementById('set-medical-sec') as HTMLInputElement | null;
    const incInput = document.getElementById('set-income-tax') as HTMLInputElement | null;
    const headerInput = document.getElementById('set-export-header') as HTMLInputElement | null;
    const footerInput = document.getElementById('set-export-footer') as HTMLInputElement | null;
    const ctxSickHint = document.getElementById('ctx-sick-hint');

    if (compactSel) compactSel.value = String(this.settings.compactMode);
    if (themeSel) themeSel.value = this.currentTheme;
    if (stdInput) stdInput.value = String(this.settings.standardDayMinutes);
    if (startInput) startInput.value = this.settings.defaultShiftStart;
    if (endInput) endInput.value = this.settings.defaultShiftEnd;
    if (brkInput) brkInput.value = String(this.settings.defaultBreakMinutes);
    if (sickInput) sickInput.value = String(this.settings.sickPayPercent ?? 80);
    if (socInput) socInput.value = String(parseFloat(this.settings.socialSecurityPercent || '9.5'));
    if (medInput) medInput.value = String(parseFloat(this.settings.medicalSecurityPercent || '1.7'));
    if (incInput) incInput.value = String(parseFloat(this.settings.incomeTaxPercent || '13.0'));
    if (headerInput) headerInput.value = this.settings.exportHeader || 'PulseHR Workforce Management';
    if (footerInput) footerInput.value = this.settings.exportFooter || 'Confidential • Generated by PulseHR';
    if (ctxSickHint) ctxSickHint.textContent = `${this.settings.sickPayPercent ?? 80}%`;
  }

  private getWeekDateStrings(): string[] {
    const list: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(this.currentWeekMonday);
      d.setDate(this.currentWeekMonday.getDate() + i);
      list.push(this.formatDateISO(d));
    }
    return list;
  }

  private populateDropdowns(): void {
    const empOptionsHtml = this.employees
      .map((e) => `<option value="${e.id}">${e.employeeCode} — ${e.firstName} ${e.lastName}</option>`)
      .join('');

    ['sched-employee', 'att-employee', 'pay-employee'].forEach((id) => {
      const el = document.getElementById(id) as HTMLSelectElement | null;
      if (el) el.innerHTML = empOptionsHtml;
    });

    const attFilter = document.getElementById('attendance-emp-filter') as HTMLSelectElement | null;
    if (attFilter) {
      const curr = attFilter.value;
      attFilter.innerHTML = `<option value="">All Employees</option>` + empOptionsHtml;
      attFilter.value = curr;
    }

    const salFilter = document.getElementById('salary-history-emp-filter') as HTMLSelectElement | null;
    if (salFilter) {
      const curr = salFilter.value;
      salFilter.innerHTML = `<option value="">All Employees</option>` + empOptionsHtml;
      salFilter.value = curr;
    }

    const qaDate = document.getElementById('qa-date') as HTMLInputElement | null;
    if (qaDate && !qaDate.value) {
      qaDate.value = this.formatDateISO(new Date());
    }
  }

  // --- Navigation ---
  public switchTab(tabId: string): void {
    if (this.currentUser?.role === 'viewer' && (tabId === 'settings' || tabId === 'users')) {
      tabId = 'dashboard';
    }
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });
    const [title, sub] = this.getTabTitleAndSubtitle(tabId);
    const titleEl = document.getElementById('page-title');
    const subEl = document.getElementById('page-subtitle');
    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = sub;
  }

  private bindNavigation(): void {
    document.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) this.switchTab(tab);
      });
    });

    document.querySelectorAll('[data-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-jump');
        if (target) this.switchTab(target);
      });
    });
  }

  // --- Modals ---
  private openModal(id: string): void {
    document.getElementById(id)?.classList.remove('hidden');
  }

  private closeModal(id: string): void {
    document.getElementById(id)?.classList.add('hidden');
  }

  private bindModals(): void {
    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-close');
        if (target) this.closeModal(target);
      });
    });

    const today = this.formatDateISO(new Date());
    const currentMonth = today.slice(0, 7);

    const openNewEmp = () => {
      (document.getElementById('form-employee') as HTMLFormElement).reset();
      (document.getElementById('emp-id') as HTMLInputElement).value = '';
      (document.getElementById('emp-code') as HTMLInputElement).value = `EMP-${1001 + this.employees.length}`;
      (document.getElementById('emp-hire-date') as HTMLInputElement).value = today;
      const photoVal = document.getElementById('emp-photo-val') as HTMLInputElement | null;
      if (photoVal) photoVal.value = '';
      const photoImg = document.getElementById('emp-photo-img') as HTMLImageElement | null;
      if (photoImg) {
        photoImg.src = '';
        photoImg.classList.add('hidden');
      }
      document.getElementById('emp-photo-placeholder')?.classList.remove('hidden');
      document.getElementById('btn-remove-photo')?.classList.add('hidden');
      const genderEl = document.getElementById('emp-gender') as HTMLSelectElement | null;
      if (genderEl) genderEl.value = '';
      const dobEl = document.getElementById('emp-dob') as HTMLInputElement | null;
      if (dobEl) dobEl.value = '';
      const idNumEl = document.getElementById('emp-id-number') as HTMLInputElement | null;
      if (idNumEl) idNumEl.value = '';
      const emailEl = document.getElementById('emp-email') as HTMLInputElement | null;
      if (emailEl) emailEl.value = '';
      const phoneEl = document.getElementById('emp-phone') as HTMLInputElement | null;
      if (phoneEl) phoneEl.value = '';
      const posEl = document.getElementById('emp-position') as HTMLInputElement | null;
      if (posEl) posEl.value = 'Staff';
      ['emp-doc-med-report', 'emp-doc-med-chart', 'emp-doc-contract', 'emp-doc-workbook', 'emp-doc-declaration', 'emp-doc-training'].forEach((id) => {
        const chk = document.getElementById(id) as HTMLInputElement | null;
        if (chk) chk.checked = false;
      });
      const title = document.getElementById('modal-emp-title');
      if (title) title.textContent = 'Add New Employee';
      this.openModal('modal-employee');
    };

    document.getElementById('btn-quick-employee')?.addEventListener('click', openNewEmp);
    document.getElementById('btn-open-emp-modal')?.addEventListener('click', openNewEmp);

    document.getElementById('btn-upload-photo')?.addEventListener('click', () => {
      document.getElementById('emp-photo-file')?.click();
    });

    document.getElementById('emp-photo-file')?.addEventListener('change', (e) => {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) {
          this.toast('Image size must be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (re) => {
          const dataUrl = re.target?.result as string;
          const photoVal = document.getElementById('emp-photo-val') as HTMLInputElement | null;
          if (photoVal) photoVal.value = dataUrl;
          const photoImg = document.getElementById('emp-photo-img') as HTMLImageElement | null;
          if (photoImg) {
            photoImg.src = dataUrl;
            photoImg.classList.remove('hidden');
          }
          document.getElementById('emp-photo-placeholder')?.classList.add('hidden');
          document.getElementById('btn-remove-photo')?.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('btn-remove-photo')?.addEventListener('click', () => {
      const fileInput = document.getElementById('emp-photo-file') as HTMLInputElement | null;
      if (fileInput) fileInput.value = '';
      const photoVal = document.getElementById('emp-photo-val') as HTMLInputElement | null;
      if (photoVal) photoVal.value = '';
      const photoImg = document.getElementById('emp-photo-img') as HTMLImageElement | null;
      if (photoImg) {
        photoImg.src = '';
        photoImg.classList.add('hidden');
      }
      document.getElementById('emp-photo-placeholder')?.classList.remove('hidden');
      document.getElementById('btn-remove-photo')?.classList.add('hidden');
    });

    document.getElementById('btn-print-worker-chart')?.addEventListener('click', () => {
      this.printWorkerChart(this.currentWorkerChartEmpId);
    });

    const openNewAtt = () => {
      (document.getElementById('form-attendance') as HTMLFormElement).reset();
      (document.getElementById('att-date') as HTMLInputElement).value = today;
      (document.getElementById('att-in') as HTMLInputElement).value = this.settings.defaultShiftStart;
      (document.getElementById('att-out') as HTMLInputElement).value = this.settings.defaultShiftEnd;
      (document.getElementById('att-break') as HTMLInputElement).value = String(this.settings.defaultBreakMinutes);
      this.openModal('modal-attendance');
    };

    document.getElementById('btn-quick-attendance')?.addEventListener('click', openNewAtt);
    document.getElementById('btn-open-attendance-modal')?.addEventListener('click', openNewAtt);

    document.getElementById('btn-add-shift')?.addEventListener('click', () => {
      this.openShiftModal(this.employees[0]?.id || 1, today);
    });

    document.getElementById('btn-open-payroll-modal')?.addEventListener('click', () => {
      (document.getElementById('form-payroll') as HTMLFormElement).reset();
      (document.getElementById('pay-period') as HTMLInputElement).value = currentMonth;
      const firstEmp = this.employees[0];
      if (firstEmp) {
        (document.getElementById('pay-base') as HTMLInputElement).value = firstEmp.baseSalary;
      }
      this.openModal('modal-payroll');
    });

    document.getElementById('pay-employee')?.addEventListener('change', (e) => {
      const empId = Number((e.target as HTMLSelectElement).value);
      const emp = this.employees.find((x) => x.id === empId);
      if (emp) {
        (document.getElementById('pay-base') as HTMLInputElement).value = emp.baseSalary;
      }
    });

    const periodPicker = document.getElementById('payroll-period-picker') as HTMLInputElement | null;
    if (periodPicker && !periodPicker.value) {
      periodPicker.value = currentMonth;
    }

    document.getElementById('btn-print-payslip')?.addEventListener('click', () => {
      window.print();
    });
  }

  // --- Dashboard Rendering ---
  public async loadOverview(year?: number): Promise<void> {
    if (year) this.overviewYear = year;
    try {
      this.overviewData = await this.api<OverviewData>(`/api/overview?year=${this.overviewYear}`);
      this.renderDashboard();
    } catch (err: any) {
      this.toast(`Failed to load overview: ${err.message}`);
    }
  }

  private getLocalizedMonthName(monthIndex: number): string {
    const months: Record<Language, string[]> = {
      en: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      sq: [
        'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
        'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor',
      ],
      it: [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
      ],
    };
    return (months[this.currentLang] || months.en)[monthIndex - 1] || `Month ${monthIndex}`;
  }

  private getLocalizedMonthShort(monthIndex: number): string {
    const shorts: Record<Language, string[]> = {
      en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      sq: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
      it: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
    };
    return (shorts[this.currentLang] || shorts.en)[monthIndex - 1] || `${monthIndex}`;
  }

  private renderOverviewChartSvg(
    stats: MonthlyStatRecord[],
    metric: 'salary' | 'hours' | 'absences'
  ): string {
    const values = stats.map((s) => {
      if (metric === 'salary') return s.totalSalary;
      if (metric === 'hours') return s.totalHours;
      return s.absencesCount + s.leavesCount + s.sickCount;
    });

    const maxVal = Math.max(...values, 10);
    const plotBottom = 220;
    const plotHeight = 185;

    const gridLevels = [0.25, 0.5, 0.75, 1];
    const gridLines = gridLevels
      .map((lvl) => {
        const y = Math.round(plotBottom - lvl * plotHeight);
        const valAtLvl = Math.round(lvl * maxVal);
        const label =
          metric === 'salary'
            ? this.formatMoney(valAtLvl)
            : metric === 'hours'
            ? `${valAtLvl}h`
            : `${valAtLvl}d`;
        return `
          <line x1="55" y1="${y}" x2="905" y2="${y}" stroke="currentColor" stroke-dasharray="3,4" opacity="0.15" />
          <text x="50" y="${y + 3}" font-size="9" fill="currentColor" opacity="0.5" text-anchor="end">${label}</text>
        `;
      })
      .join('');

    let gradTop = '#38bdf8';
    let gradBottom = '#6366f1';
    if (metric === 'hours') {
      gradTop = '#34d399';
      gradBottom = '#059669';
    } else if (metric === 'absences') {
      gradTop = '#f87171';
      gradBottom = '#e11d48';
    }

    const slotWidth = 840 / 12;
    const barWidth = 36;

    const bars = stats
      .map((s, idx) => {
        const val = values[idx];
        const barH = val > 0 ? Math.max(8, Math.round((val / maxVal) * plotHeight)) : 4;
        const barX = Math.round(60 + idx * slotWidth + (slotWidth - barWidth) / 2);
        const barY = plotBottom - barH;
        const centerX = barX + barWidth / 2;
        const isCurrentMonth = s.month === this.currentMonth;

        let displayVal = '';
        if (val > 0) {
          if (metric === 'salary') {
            displayVal = val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${Math.round(val)}`;
          } else if (metric === 'hours') {
            displayVal = `${Math.round(val)}h`;
          } else {
            displayVal = `${val}d`;
          }
        }

        const tooltip = `${this.getLocalizedMonthName(s.monthIndex)} ${this.overviewYear}&#10;${this.t('th_active_employees', 'Employees')}: ${s.employeeCount}&#10;${this.t('th_total_hours', 'Total Hours')}: ${this.formatDuration(s.totalHours)}&#10;${this.t('th_total_salary', 'Total Salary')}: ${this.formatMoney(s.totalSalary)}&#10;${this.t('kpi_total_absences', 'Absences')}: ${s.absencesCount}d&#10;${this.t('th_leaves', 'Leaves')}: ${s.leavesCount}d | ${this.t('th_sick', 'Sick')}: ${s.sickCount}d`;

        return `
          <g class="overview-chart-bar" tabindex="0">
            <title>${tooltip}</title>
            <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barH}" rx="5" ry="5" fill="url(#grad-overview-${metric})" opacity="${val > 0 ? '0.95' : '0.25'}" />
            ${
              isCurrentMonth
                ? `<rect x="${barX - 2}" y="${barY - 2}" width="${barWidth + 4}" height="${barH + 4}" rx="7" ry="7" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.8" />`
                : ''
            }
            ${
              val > 0
                ? `<text x="${centerX}" y="${barY - 6}" font-size="10" font-weight="700" fill="currentColor" text-anchor="middle">${displayVal}</text>`
                : ''
            }
            <text x="${centerX}" y="240" font-size="11" font-weight="${isCurrentMonth ? '800' : '600'}" fill="${isCurrentMonth ? '#38bdf8' : 'currentColor'}" opacity="${isCurrentMonth ? '1' : '0.75'}" text-anchor="middle">${this.getLocalizedMonthShort(s.monthIndex)}</text>
            <text x="${centerX}" y="255" font-size="9" fill="currentColor" opacity="0.45" text-anchor="middle">${s.employeeCount} ${this.t('staff', 'staff')}</text>
          </g>
        `;
      })
      .join('');

    return `
      <svg class="overview-chart-svg" viewBox="0 0 920 270" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-overview-${metric}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${gradTop}" />
            <stop offset="100%" stop-color="${gradBottom}" />
          </linearGradient>
        </defs>
        ${gridLines}
        <line x1="55" y1="${plotBottom}" x2="905" y2="${plotBottom}" stroke="currentColor" opacity="0.3" stroke-width="1" />
        ${bars}
      </svg>
    `;
  }

  private exportOverviewToExcel(): void {
    if (!this.overviewData) return;
    const { year, metrics, monthlyStats } = this.overviewData;
    const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
    const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';

    const rowsHtml = monthlyStats
      .map(
        (s) => `
        <tr>
          <td>${this.getLocalizedMonthName(s.monthIndex)} ${year}</td>
          <td>${s.employeeCount}</td>
          <td>${this.formatDuration(s.totalHours)}</td>
          <td>${this.formatMoney(s.totalSalary)}</td>
          <td>${s.absencesCount}</td>
          <td>${s.leavesCount}</td>
          <td>${s.sickCount}</td>
          <td>${this.formatMoney(s.avgSalary)}</td>
        </tr>
      `
      )
      .join('');

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8" /></head>
      <body>
        <h2>${customHeader} - Annual Workforce & Salary Overview (${year})</h2>
        <p>Active Staff: ${metrics.activeEmployees} | Total Salary: ${this.formatMoney(metrics.annualTotalSalary)} | Total Hours: ${this.formatDuration(metrics.annualTotalHours)} | Absences: ${metrics.annualTotalAbsences}d</p>
        <table border="1">
          <thead>
            <tr style="background:#f1f5f9;font-weight:700">
              <th>Month</th>
              <th>Active Employees</th>
              <th>Total Hours</th>
              <th>Total Salary</th>
              <th>Absences (Days)</th>
              <th>Leaves (Days)</th>
              <th>Sick (Days)</th>
              <th>Avg Salary / Employee</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
          <tfoot>
            <tr style="background:#e2e8f0;font-weight:700">
              <td>Annual Total (${year})</td>
              <td>Avg ${(metrics.annualTotalSalary > 0 ? metrics.annualTotalSalary / 12 : 0).toFixed(0)}</td>
              <td>${this.formatDuration(metrics.annualTotalHours)}</td>
              <td>${this.formatMoney(metrics.annualTotalSalary)}</td>
              <td>${metrics.annualTotalAbsences}</td>
              <td>${metrics.annualTotalLeaves}</td>
              <td>${metrics.annualTotalSick}</td>
              <td>${this.formatMoney(metrics.annualTotalSalary > 0 && metrics.activeEmployees > 0 ? metrics.annualTotalSalary / metrics.activeEmployees : 0)}</td>
            </tr>
          </tfoot>
        </table>
        <p><small>${customFooter}</small></p>
      </body>
      </html>
    `;

    this.downloadTextFile(`PulseHR_Annual_Report_${year}.xls`, excelHtml, 'application/vnd.ms-excel');
    this.toast(`Exported Annual Report for ${year}`);
  }

  private renderDashboard(): void {
    const container = document.getElementById('tab-dashboard');
    if (!container) return;

    if (!this.overviewData) {
      container.innerHTML = `
        <div class="card" style="padding:2.5rem;text-align:center;color:var(--text-muted)">
          <div class="loading-spinner" style="margin:0 auto 1rem auto"></div>
          <div>Loading Annual Overview & Analytics...</div>
        </div>
      `;
      this.loadOverview();
      return;
    }

    const data = this.overviewData;
    const availableYears =
      data.availableYears && data.availableYears.length > 0
        ? data.availableYears
        : [this.overviewYear - 1, this.overviewYear, this.overviewYear + 1];

    const yearOptions = availableYears
      .map((y) => `<option value="${y}" ${y === this.overviewYear ? 'selected' : ''}>${y}</option>`)
      .join('');

    const monthlyRowsHtml = data.monthlyStats
      .map((s) => {
        const isCurrentMonth = s.month === this.currentMonth;
        const currentBadge = isCurrentMonth
          ? `<span class="badge" style="background:rgba(56,189,248,0.2);color:#38bdf8;font-size:0.65rem;margin-left:0.4rem">Current</span>`
          : '';
        return `
          <tr>
            <td>
              <strong>${this.getLocalizedMonthName(s.monthIndex)}</strong>
              <span style="font-size:0.72rem;color:var(--text-muted);margin-left:0.3rem">${this.overviewYear}</span>
              ${currentBadge}
            </td>
            <td><span class="badge" style="background:rgba(56,189,248,0.12);color:#38bdf8">${s.employeeCount}</span></td>
            <td><strong>${this.formatDuration(s.totalHours)}</strong></td>
            <td style="color:#34d399;font-weight:700">${this.formatMoney(s.totalSalary)}</td>
            <td><span style="color:${s.absencesCount > 0 ? '#f87171' : 'var(--text-muted)'}">${s.absencesCount}d</span></td>
            <td><span style="color:${s.leavesCount > 0 ? '#22d3ee' : 'var(--text-muted)'}">${s.leavesCount}d</span></td>
            <td><span style="color:${s.sickCount > 0 ? '#fb923c' : 'var(--text-muted)'}">${s.sickCount}d</span></td>
            <td style="font-weight:600">${this.formatMoney(s.avgSalary)}</td>
            <td>
              <button class="btn btn-secondary btn-xs overview-jump-btn" data-jump-month="${s.month}" title="Open ${s.month} in Timetable">
                ${this.t('btn_view_in_timetable', 'Open Timetable')} →
              </button>
            </td>
          </tr>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="overview-wrap">
        <!-- Annual Filter Toolbar -->
        <div class="toolbar card overview-toolbar">
          <div class="toolbar-group">
            <span style="font-weight:700;font-size:0.92rem;color:var(--text-main);display:flex;align-items:center;gap:0.35rem">
              <span>📅</span>
              <span>${this.t('annual_filter', 'Annual Filter')}:</span>
            </span>
            <div class="overview-year-controls">
              <button class="btn btn-secondary btn-xs" id="btn-overview-prev-year">← ${this.overviewYear - 1}</button>
              <select id="overview-year-select" class="input-control input-sm" style="font-weight:700;min-width:90px">
                ${yearOptions}
              </select>
              <button class="btn btn-secondary btn-xs" id="btn-overview-next-year">${this.overviewYear + 1} →</button>
            </div>
          </div>
          <div class="toolbar-group">
            <button class="btn btn-secondary btn-xs" id="btn-export-overview-excel">${this.t('btn_export_annual', '📥 Export Annual Excel')}</button>
            <button class="btn btn-ghost btn-xs" id="btn-refresh-overview">🔄 ${this.t('btn_refresh', 'Refresh')}</button>
          </div>
        </div>

        <!-- Annual KPIs Grid -->
        <div class="overview-kpis">
          <div class="kpi-card">
            <span class="kpi-label">${this.t('kpi_active_staff', 'Active Workforce')}</span>
            <span class="kpi-value" style="color:#38bdf8">${data.metrics.activeEmployees}</span>
            <span class="kpi-sub">${data.metrics.totalEmployees} ${this.t('th_employee', 'Total')} (${this.overviewYear})</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${this.t('kpi_annual_salary', 'Annual Total Salary')}</span>
            <span class="kpi-value" style="color:#34d399">${this.formatMoney(data.metrics.annualTotalSalary)}</span>
            <span class="kpi-sub">${this.t('kpi_avg_monthly', 'Avg Monthly')}: ${this.formatMoney(data.metrics.avgMonthlyPayroll)}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${this.t('kpi_annual_hours', 'Annual Worked Time')}</span>
            <span class="kpi-value" style="color:#a78bfa">${this.formatDuration(data.metrics.annualTotalHours)}</span>
            <span class="kpi-sub">12 ${this.t('th_month', 'Months')} recorded</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${this.t('kpi_total_absences', 'Total Absences')}</span>
            <span class="kpi-value" style="color:#f87171">${data.metrics.annualTotalAbsences}d</span>
            <span class="kpi-sub">${this.t('sub_attendance', 'Unpaid absent days')}</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${this.t('kpi_leaves_sick', 'Leaves & Sick')}</span>
            <span class="kpi-value" style="color:#fb923c">${data.metrics.annualTotalLeaves}d / ${data.metrics.annualTotalSick}d</span>
            <span class="kpi-sub">Leaves & Medical sick days</span>
          </div>
        </div>

        <!-- Annual Visual Chart Card -->
        <div class="overview-chart-card">
          <div class="overview-chart-header">
            <h3>
              <span>📊</span>
              <span>${this.t('chart_title', 'Annual Trends')} • ${this.overviewYear}</span>
            </h3>
            <div class="segmented-control">
              <button class="seg-btn ${this.overviewMetric === 'salary' ? 'active' : ''}" data-chart-metric="salary">${this.t('chart_metric_salary', '💰 Total Salary')}</button>
              <button class="seg-btn ${this.overviewMetric === 'hours' ? 'active' : ''}" data-chart-metric="hours">${this.t('chart_metric_hours', '⏱️ Worked Hours')}</button>
              <button class="seg-btn ${this.overviewMetric === 'absences' ? 'active' : ''}" data-chart-metric="absences">${this.t('chart_metric_absences', '🚫 Absences & Leaves')}</button>
            </div>
          </div>
          <div class="overview-chart-svg-container">
            ${this.renderOverviewChartSvg(data.monthlyStats, this.overviewMetric)}
          </div>
        </div>

        <!-- Monthly Statistics Table Card -->
        <div class="overview-table-card">
          <div class="overview-table-header">
            <h3>
              <span>📋 ${this.t('table_monthly_stats', 'Monthly Statistics Matrix')} • ${this.overviewYear}</span>
            </h3>
          </div>
          <div class="overview-table-wrap">
            <table class="overview-table">
              <thead>
                <tr>
                  <th>${this.t('th_month', 'Month')}</th>
                  <th>${this.t('th_active_employees', 'Active Staff')}</th>
                  <th>${this.t('th_total_hours', 'Total Hours')}</th>
                  <th>${this.t('th_total_salary', 'Total Salary')}</th>
                  <th>${this.t('kpi_total_absences', 'Absences')}</th>
                  <th>${this.t('th_leaves', 'Leaves')}</th>
                  <th>${this.t('th_sick', 'Sick')}</th>
                  <th>${this.t('th_avg_salary', 'Avg Salary / Emp')}</th>
                  <th style="text-align:center">${this.t('th_actions', 'Actions')}</th>
                </tr>
              </thead>
              <tbody>${monthlyRowsHtml}</tbody>
              <tfoot>
                <tr>
                  <td>${this.t('annual_total', 'Annual Total')} (${this.overviewYear})</td>
                  <td>Avg ${(data.metrics.annualTotalSalary > 0 ? data.metrics.annualTotalSalary / 12 : 0).toFixed(0)}</td>
                  <td>${this.formatDuration(data.metrics.annualTotalHours)}</td>
                  <td style="color:#34d399;font-size:0.92rem">${this.formatMoney(data.metrics.annualTotalSalary)}</td>
                  <td>${data.metrics.annualTotalAbsences}d</td>
                  <td>${data.metrics.annualTotalLeaves}d</td>
                  <td>${data.metrics.annualTotalSick}d</td>
                  <td>${this.formatMoney(data.metrics.annualTotalSalary > 0 && data.metrics.activeEmployees > 0 ? data.metrics.annualTotalSalary / data.metrics.activeEmployees : 0)}</td>
                  <td>—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    `;

    document.getElementById('overview-year-select')?.addEventListener('change', (e) => {
      const yr = Number((e.target as HTMLSelectElement).value);
      this.loadOverview(yr);
    });

    document.getElementById('btn-overview-prev-year')?.addEventListener('click', () => {
      this.loadOverview(this.overviewYear - 1);
    });

    document.getElementById('btn-overview-next-year')?.addEventListener('click', () => {
      this.loadOverview(this.overviewYear + 1);
    });

    document.getElementById('btn-refresh-overview')?.addEventListener('click', () => {
      this.loadOverview();
    });

    document.getElementById('btn-export-overview-excel')?.addEventListener('click', () => {
      this.exportOverviewToExcel();
    });

    container.querySelectorAll('[data-chart-metric]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const m = btn.getAttribute('data-chart-metric') as 'salary' | 'hours' | 'absences';
        if (m) {
          this.overviewMetric = m;
          this.renderDashboard();
        }
      });
    });

    container.querySelectorAll('[data-jump-month]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const month = btn.getAttribute('data-jump-month');
        if (month) {
          this.currentMonth = month;
          const monthPicker = document.getElementById('timetable-month-picker') as HTMLInputElement | null;
          if (monthPicker) monthPicker.value = month;
          this.timetableMode = 'monthly';
          document.getElementById('btn-view-monthly')?.classList.add('active');
          document.getElementById('btn-view-weekly')?.classList.remove('active');
          document.getElementById('monthly-nav-controls')?.classList.remove('hidden');
          document.getElementById('weekly-nav-controls')?.classList.add('hidden');
          this.switchTab('timetable');
          await this.loadAllData();
        }
      });
    });
  }

  // --- Workhours Timetable (Monthly + Weekly) ---
  private renderTimetable(): void {
    if (this.timetableMode === 'monthly') {
      this.renderMonthlyTimetable();
    } else {
      this.renderWeeklyTimetable();
    }
  }

  private getFilteredTimetableEmployees(): Employee[] {
    return this.employees.filter((e) => {
      if (e.status !== 'Terminated') return true;
      return this.schedules.some(
        (s) => s.employeeId === e.id && parseFloat(s.plannedHours || '0') > 0
      );
    });
  }

  private getCurrentPeriodDates(): string[] {
    if (this.timetableMode === 'weekly') {
      return this.getWeekDateStrings();
    }
    const [year, month] = this.currentMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const list: string[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      list.push(`${this.currentMonth}-${String(day).padStart(2, '0')}`);
    }
    return list;
  }

  private updateSelectionBar(): void {
    const bar = document.getElementById('selection-action-bar');
    const countEl = document.getElementById('selection-count');
    if (countEl) countEl.textContent = `${this.selectedCells.size} selected`;
    if (bar) bar.classList.toggle('hidden', this.selectedCells.size === 0);
  }

  private handleCellClick(
    cell: HTMLElement,
    empId: number,
    dateStr: string,
    e: MouseEvent
  ): void {
    if (this.currentUser?.role === 'viewer') {
      this.focusCell(empId, dateStr, false);
      return;
    }

    const isSelectAction = this.selectMode || e.ctrlKey || e.metaKey || e.shiftKey;
    this.focusCell(empId, dateStr, false);

    if (!isSelectAction) {
      this.startInlineCellEdit(cell, empId, dateStr);
      return;
    }

    if (e.shiftKey && this.lastSelectedCell) {
      const emps = this.getFilteredTimetableEmployees();
      const dates = this.getCurrentPeriodDates();
      const r1 = emps.findIndex((x) => x.id === this.lastSelectedCell!.empId);
      const r2 = emps.findIndex((x) => x.id === empId);
      const c1 = dates.indexOf(this.lastSelectedCell.dateStr);
      const c2 = dates.indexOf(dateStr);

      if (r1 !== -1 && r2 !== -1 && c1 !== -1 && c2 !== -1) {
        const rMin = Math.min(r1, r2);
        const rMax = Math.max(r1, r2);
        const cMin = Math.min(c1, c2);
        const cMax = Math.max(c1, c2);
        for (let r = rMin; r <= rMax; r++) {
          for (let c = cMin; c <= cMax; c++) {
            this.selectedCells.add(`${emps[r].id}:${dates[c]}`);
          }
        }
      }
    } else {
      const key = `${empId}:${dateStr}`;
      if (this.selectedCells.has(key)) {
        this.selectedCells.delete(key);
      } else {
        this.selectedCells.add(key);
      }
    }

    this.lastSelectedCell = { empId, dateStr };
    this.updateSelectionBar();
    this.renderTimetable();
  }

  private startInlineRateEdit(td: HTMLElement, empId: number): void {
    if (this.currentUser?.role === 'viewer') return;
    if (td.querySelector('input.cell-inline-input')) return;
    const emp = this.employees.find((x) => x.id === empId);
    if (!emp) return;

    const hourly = parseFloat(emp.hourlyRate || '0');
    const base = parseFloat(emp.baseSalary || '0');
    if (hourly <= 0 && base > 0) {
      this.startInlineBaseSalaryEdit(td, empId);
      return;
    }

    const originalHtml = td.innerHTML;
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'cell-inline-input';
    input.style.maxWidth = '62px';
    input.value = String(parseFloat(emp.hourlyRate || '0'));

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    let done = false;
    const commit = async () => {
      if (done) return;
      done = true;
      const raw = input.value.trim().replace(',', '.');
      const num = parseFloat(raw);
      if (isNaN(num) || num < 0) {
        td.innerHTML = originalHtml;
        return;
      }
      try {
        await this.api(`/api/employees/${empId}/hourly-rate`, {
          method: 'PATCH',
          body: JSON.stringify({ hourlyRate: num }),
        });
        this.toast(`Updated hourly rate to ${this.formatMoney(num)}`);
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
        td.innerHTML = originalHtml;
      }
    };

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        commit();
      } else if (ev.key === 'Escape') {
        done = true;
        td.innerHTML = originalHtml;
      }
    });
    input.addEventListener('blur', commit);
    input.addEventListener('click', (ev) => ev.stopPropagation());
  }

  private renderMonthlyTimetable(): void {
    const [year, month] = this.currentMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const dowLabelsMap: Record<Language, string[]> = {
      en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      sq: ['Di', 'Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh'],
      it: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
    };
    const dowLabels = dowLabelsMap[this.currentLang] || dowLabelsMap.en;
    const filteredEmps = this.getFilteredTimetableEmployees();

    const dayInfos: { dateStr: string; day: number; dow: string; isWeekend: boolean }[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dt = new Date(year, month - 1, day);
      const dowIdx = dt.getDay();
      dayInfos.push({
        dateStr: `${this.currentMonth}-${String(day).padStart(2, '0')}`,
        day,
        dow: dowLabels[dowIdx],
        isWeekend: dowIdx === 0 || dowIdx === 6,
      });
    }

    const headerCols = dayInfos
      .map(
        (d) =>
          `<th class="m-day-hdr ${d.isWeekend ? 'weekend-col' : ''}">${d.day}<span class="m-day-dow">${d.dow}</span></th>`
      )
      .join('');

    let grandTotalHours = 0;
    let grandTotalPay = 0;

    const bodyRows = filteredEmps
      .map((emp) => {
        let monthlyTotalHours = 0;
        const hourly = parseFloat(emp.hourlyRate || '0');
        const base = parseFloat(emp.baseSalary || '0');
        const isFixed = hourly <= 0 && base > 0;

        const cells = dayInfos
          .map((d) => {
            const sched = this.schedules.find(
              (s) => s.employeeId === emp.id && s.workDate === d.dateStr
            );
            const isSel = this.selectedCells.has(`${emp.id}:${d.dateStr}`);
            const selClass = isSel ? 'cell-selected' : '';

            if (sched) {
              const hrs = parseFloat(sched.plannedHours || '0');
              monthlyTotalHours += hrs;
              const shortTagMap: Record<string, string> = {
                Off: 'Off',
                Leave: 'L',
                Absence: 'Ab',
                Holiday: 'H',
                Sick: 'S',
              };
              const shortShift = shortTagMap[sched.shiftType] || sched.shiftType[0];
              const displayVal =
                sched.shiftType === 'Off'
                  ? 'Off'
                  : sched.shiftType === 'Absence'
                  ? 'Ab'
                  : sched.shiftType === 'Leave'
                  ? `L`
                  : sched.shiftType === 'Holiday'
                  ? `H`
                  : sched.shiftType === 'Sick'
                  ? `S ${this.formatDuration(hrs, true)}`
                  : this.formatDuration(hrs, true);
              return `
                <td class="${d.isWeekend ? 'weekend-col' : ''}">
                  <div tabindex="0" class="m-cell tt-shift-${sched.shiftType} ${selClass}" data-emp="${emp.id}" data-date="${d.dateStr}" title="${emp.firstName} ${emp.lastName} | ${d.dateStr} | ${sched.shiftType} (${this.formatDuration(hrs)})">
                    <span class="m-cell-val">${displayVal}</span>
                    <span class="m-cell-tag">${shortShift}</span>
                  </div>
                </td>
              `;
            }

            return `
              <td class="${d.isWeekend ? 'weekend-col' : ''}">
                <div tabindex="0" class="m-cell ${selClass}" data-emp="${emp.id}" data-date="${d.dateStr}" title="Assign shift for ${d.dateStr}">
                  <span class="m-cell-empty">·</span>
                </div>
              </td>
            `;
          })
          .join('');

        let rowPay = 0;
        let rateCellHtml = '';
        if (hourly > 0) {
          rowPay = +(monthlyTotalHours * hourly).toFixed(2);
          rateCellHtml = `<td class="rate-cell" data-rate-emp="${emp.id}" title="${this.t('click_edit_rate', 'Click to edit hourly rate')}">${this.formatMoney(hourly)}/h</td>`;
        } else if (isFixed) {
          rowPay = base;
          const targetHours = emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
          const effRate = monthlyTotalHours > 0 ? +(base / monthlyTotalHours).toFixed(2) : +(base / targetHours).toFixed(2);
          rateCellHtml = `<td class="rate-cell rate-fixed" data-rate-emp="${emp.id}" title="${this.t('fixed_salary', 'Fixed Monthly Salary')}: ${this.formatMoney(base)} (${this.t('click_edit_salary', 'Click to edit base salary')})">${this.formatMoney(effRate)}/h <span style="font-size:0.65rem;color:#38bdf8;font-weight:600;display:block">(${this.t('fixed', 'Fixed')})</span></td>`;
        } else {
          rowPay = 0;
          rateCellHtml = `<td class="rate-cell" data-rate-emp="${emp.id}">—</td>`;
        }

        grandTotalHours += monthlyTotalHours;
        grandTotalPay += rowPay;

        return `
          <tr data-row-emp="${emp.id}" class="tt-row ${this.selectedRowEmpId === emp.id ? 'row-selected' : ''}">
            <td class="sticky-col" data-select-row="${emp.id}" style="cursor:pointer" title="Click to highlight ${emp.firstName} ${emp.lastName}">
              <strong>${emp.firstName} ${emp.lastName}</strong>
              <div style="font-size:0.66rem;color:#94a3b8">${emp.employeeCode} • ${this.formatDuration(monthlyTotalHours)}</div>
            </td>
            ${cells}
            <td style="font-weight:700;color:#e2e8f0;padding:0 0.45rem">${this.formatDuration(monthlyTotalHours)}</td>
            ${rateCellHtml}
            <td class="total-pay-cell">${this.formatMoney(rowPay)}</td>
          </tr>
        `;
      })
      .join('');

    const container = document.getElementById('timetable-matrix-container');
    if (container) {
      container.innerHTML = `
        <table class="monthly-table">
          <thead>
            <tr>
              <th class="sticky-col">${this.t('th_employee', 'Employee')} (${this.currentMonth})</th>
              ${headerCols}
              <th class="m-sum-col">${this.t('th_month_total', 'Month Total')}</th>
              <th class="m-rate-col">${this.t('th_price_hr', 'Price / Hr')}</th>
              <th class="m-total-col">${this.t('th_total', 'Total')}</th>
            </tr>
          </thead>
          <tbody>${bodyRows}</tbody>
          <tfoot>
            <tr class="tfoot-totals">
              <td class="sticky-col">${this.t('total_grand', 'Grand Total')} (${filteredEmps.length} ${this.t('staff', 'staff')})</td>
              <td colspan="${daysInMonth}"></td>
              <td>${this.formatDuration(grandTotalHours)}</td>
              <td>—</td>
              <td class="total-pay-cell">${this.formatMoney(grandTotalPay)}</td>
            </tr>
          </tfoot>
        </table>
      `;

      container.querySelectorAll('[data-select-row]').forEach((td) => {
        td.addEventListener('click', (e) => {
          e.stopPropagation();
          const empId = Number(td.getAttribute('data-select-row'));
          if (this.selectedRowEmpId === empId) {
            this.highlightRow(null);
          } else {
            this.highlightRow(empId);
          }
        });
      });

      container.querySelectorAll('tr[data-row-emp]').forEach((tr) => {
        tr.addEventListener('click', () => {
          const empId = Number(tr.getAttribute('data-row-emp'));
          if (empId && this.selectedRowEmpId !== empId) {
            this.highlightRow(empId);
          }
        });
      });

      container.querySelectorAll('.m-cell').forEach((cell) => {
        cell.addEventListener('click', (e) => {
          const empId = Number(cell.getAttribute('data-emp'));
          const dateStr = cell.getAttribute('data-date') || `${this.currentMonth}-01`;
          this.handleCellClick(cell as HTMLElement, empId, dateStr, e as MouseEvent);
        });
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const empId = Number(cell.getAttribute('data-emp'));
          const dateStr = cell.getAttribute('data-date') || `${this.currentMonth}-01`;
          this.openCellContextMenu(e as MouseEvent, empId, dateStr);
        });
      });

      container.querySelectorAll('.rate-cell').forEach((td) => {
        td.addEventListener('click', () => {
          const empId = Number(td.getAttribute('data-rate-emp'));
          this.startInlineRateEdit(td as HTMLElement, empId);
        });
      });

      this.restoreCellFocus();
    }
    this.updateSelectionBar();
  }

  private renderWeeklyTimetable(): void {
    const weekDates = this.getWeekDateStrings();
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const labelEl = document.getElementById('timetable-week-label');
    if (labelEl) {
      labelEl.textContent = `${weekDates[0]} → ${weekDates[6]}`;
    }

    const filteredEmps = this.getFilteredTimetableEmployees();
    const headerCells = weekDates
      .map((dateStr, idx) => `<th>${dayNames[idx]} <span style="font-weight:400;color:#94a3b8">${dateStr.slice(5)}</span></th>`)
      .join('');

    let grandTotalHours = 0;
    let grandTotalPay = 0;

    const bodyRows = filteredEmps
      .map((emp) => {
        let weeklyTotal = 0;
        const hourly = parseFloat(emp.hourlyRate || '0');
        const base = parseFloat(emp.baseSalary || '0');
        const isFixed = hourly <= 0 && base > 0;

        const dayCells = weekDates
          .map((dateStr) => {
            const sched = this.schedules.find(
              (s) => s.employeeId === emp.id && s.workDate === dateStr
            );
            const isSel = this.selectedCells.has(`${emp.id}:${dateStr}`);
            const selClass = isSel ? 'cell-selected' : '';

            if (sched) {
              const hrs = parseFloat(sched.plannedHours || '0');
              weeklyTotal += hrs;
              return `
                <td>
                  <div tabindex="0" class="tt-cell has-shift tt-shift-${sched.shiftType} ${selClass}" data-emp="${emp.id}" data-date="${dateStr}">
                    <div class="tt-type">${sched.shiftType} • ${this.formatDuration(hrs, true)}</div>
                    ${
                      sched.shiftType === 'Off'
                        ? `<div class="tt-time">Rest Day</div>`
                        : `<div class="tt-time">${sched.startTime}–${sched.endTime}</div>`
                    }
                  </div>
                </td>
              `;
            }

            return `
              <td>
                <div tabindex="0" class="tt-cell ${selClass}" data-emp="${emp.id}" data-date="${dateStr}">
                  <div class="tt-empty">+</div>
                </div>
              </td>
            `;
          })
          .join('');

        let rowPay = 0;
        let rateCellHtml = '';
        if (hourly > 0) {
          rowPay = +(weeklyTotal * hourly).toFixed(2);
          rateCellHtml = `<td class="rate-cell" data-rate-emp="${emp.id}" title="${this.t('click_edit_rate', 'Click to edit hourly rate')}">${this.formatMoney(hourly)}/h</td>`;
        } else if (isFixed) {
          const targetHours = emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
          const effRate = +(base / targetHours).toFixed(2);
          const weeklyBase = +(base / 4).toFixed(2);
          rowPay = weeklyTotal > 0 ? (weeklyTotal >= (emp.weeklyTargetHours || 40) ? weeklyBase : +(weeklyTotal * effRate).toFixed(2)) : weeklyBase;
          rateCellHtml = `<td class="rate-cell rate-fixed" data-rate-emp="${emp.id}" title="${this.t('fixed_salary', 'Fixed Monthly Salary')}: ${this.formatMoney(base)} (${this.t('click_edit_salary', 'Click to edit base salary')})">${this.formatMoney(effRate)}/h <span style="font-size:0.65rem;color:#38bdf8;font-weight:600;display:block">(${this.t('fixed', 'Fixed')})</span></td>`;
        } else {
          rowPay = 0;
          rateCellHtml = `<td class="rate-cell" data-rate-emp="${emp.id}">—</td>`;
        }

        grandTotalHours += weeklyTotal;
        grandTotalPay += rowPay;

        const diffColor =
          weeklyTotal >= emp.weeklyTargetHours
            ? '#34d399'
            : weeklyTotal > 0
            ? '#fbbf24'
            : '#94a3b8';

        return `
          <tr data-row-emp="${emp.id}" class="tt-row ${this.selectedRowEmpId === emp.id ? 'row-selected' : ''}">
            <td class="sticky-col" data-select-row="${emp.id}" style="cursor:pointer" title="Click to highlight ${emp.firstName} ${emp.lastName}">
              <strong>${emp.firstName} ${emp.lastName}</strong>
              <div style="font-size:0.68rem;color:${diffColor};font-weight:600">
                ${this.formatDuration(weeklyTotal)} / ${this.formatDuration(emp.weeklyTargetHours)}
              </div>
            </td>
            ${dayCells}
            <td style="font-weight:700">${this.formatDuration(weeklyTotal)}</td>
            ${rateCellHtml}
            <td class="total-pay-cell">${this.formatMoney(rowPay)}</td>
          </tr>
        `;
      })
      .join('');

    const container = document.getElementById('timetable-matrix-container');
    if (container) {
      container.innerHTML = `
        <table class="data-table timetable-table">
          <thead>
            <tr>
              <th class="sticky-col" style="min-width:155px">${this.t('th_employee', 'Employee')}</th>
              ${headerCells}
              <th>Week Total</th>
              <th>Price / Hr</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>${bodyRows}</tbody>
          <tfoot>
            <tr class="tfoot-totals">
              <td class="sticky-col">Grand Total (${filteredEmps.length} staff)</td>
              <td colspan="7"></td>
              <td>${this.formatDuration(grandTotalHours)}</td>
              <td>—</td>
              <td class="total-pay-cell">${this.formatMoney(grandTotalPay)}</td>
            </tr>
          </tfoot>
        </table>
      `;

      container.querySelectorAll('[data-select-row]').forEach((td) => {
        td.addEventListener('click', (e) => {
          e.stopPropagation();
          const empId = Number(td.getAttribute('data-select-row'));
          if (this.selectedRowEmpId === empId) {
            this.highlightRow(null);
          } else {
            this.highlightRow(empId);
          }
        });
      });

      container.querySelectorAll('tr[data-row-emp]').forEach((tr) => {
        tr.addEventListener('click', () => {
          const empId = Number(tr.getAttribute('data-row-emp'));
          if (empId && this.selectedRowEmpId !== empId) {
            this.highlightRow(empId);
          }
        });
      });

      container.querySelectorAll('.tt-cell').forEach((cell) => {
        cell.addEventListener('click', (e) => {
          const empId = Number(cell.getAttribute('data-emp'));
          const dateStr = cell.getAttribute('data-date') || weekDates[0];
          this.handleCellClick(cell as HTMLElement, empId, dateStr, e as MouseEvent);
        });
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          const empId = Number(cell.getAttribute('data-emp'));
          const dateStr = cell.getAttribute('data-date') || weekDates[0];
          this.openCellContextMenu(e as MouseEvent, empId, dateStr);
        });
      });

      container.querySelectorAll('.rate-cell').forEach((td) => {
        td.addEventListener('click', () => {
          const empId = Number(td.getAttribute('data-rate-emp'));
          this.startInlineRateEdit(td as HTMLElement, empId);
        });
      });

      this.restoreCellFocus();
    }
    this.updateSelectionBar();
  }

  private formatParagraphToHtml(text: string): string {
    const safe = (text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return safe.replace(/\r?\n/g, '<br />');
  }

  private exportTimetableToPDF(): void {
    const filteredEmps = this.getFilteredTimetableEmployees();
    const dates = this.getCurrentPeriodDates();
    const periodLabel =
      this.timetableMode === 'monthly'
        ? this.currentMonth
        : `${dates[0]} to ${dates[dates.length - 1]}`;
    const unitLabel = this.settings.timeUnit === 'minutes' ? 'Minutes' : 'Hours';
    const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
    const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';
    const headerHtml = this.formatParagraphToHtml(customHeader);
    const footerHtml = this.formatParagraphToHtml(customFooter);

    let grandTotalHours = 0;
    let grandTotalPay = 0;

    const headerCols = dates
      .map((d) => `<th>${this.timetableMode === 'monthly' ? d.slice(8) : d.slice(5)}</th>`)
      .join('');

    const rowsHtml = filteredEmps
      .map((emp) => {
        let empHours = 0;
        const hourly = parseFloat(emp.hourlyRate || '0');
        const base = parseFloat(emp.baseSalary || '0');
        const isFixed = hourly <= 0 && base > 0;
        const cells = dates
          .map((d) => {
            const s = this.schedules.find((x) => x.employeeId === emp.id && x.workDate === d);
            if (!s) return `<td></td>`;
            const hrs = parseFloat(s.plannedHours || '0');
            empHours += hrs;
            const txt =
              s.shiftType === 'Off'
                ? 'Off'
                : s.shiftType === 'Absence'
                ? 'Ab'
                : this.formatDuration(hrs, true);
            return `<td>${txt}</td>`;
          })
          .join('');

        let pay = 0;
        let rateStr = '';
        if (hourly > 0) {
          pay = +(empHours * hourly).toFixed(2);
          rateStr = `${this.formatMoney(hourly)}/h`;
        } else if (isFixed) {
          const targetHours = emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
          if (this.timetableMode === 'monthly') {
            pay = base;
            const effRate = empHours > 0 ? +(base / empHours).toFixed(2) : +(base / targetHours).toFixed(2);
            rateStr = `${this.formatMoney(effRate)}/h (${this.t('fixed', 'Fixed')})`;
          } else {
            const effRate = +(base / targetHours).toFixed(2);
            const weeklyBase = +(base / 4).toFixed(2);
            pay = empHours > 0 ? (empHours >= (emp.weeklyTargetHours || 40) ? weeklyBase : +(empHours * effRate).toFixed(2)) : weeklyBase;
            rateStr = `${this.formatMoney(effRate)}/h (${this.t('fixed', 'Fixed')})`;
          }
        } else {
          pay = 0;
          rateStr = '—';
        }

        grandTotalHours += empHours;
        grandTotalPay += pay;

        return `
          <tr>
            <td class="emp-col"><strong>${emp.firstName} ${emp.lastName}</strong></td>
            ${cells}
            <td class="num-col"><strong>${this.formatDuration(empHours)}</strong></td>
            <td class="num-col">${rateStr}</td>
            <td class="num-col"><strong>${this.formatMoney(pay)}</strong></td>
          </tr>
        `;
      })
      .join('');

    const win = window.open('', '_blank', 'width=1200,height=800');
    if (!win) {
      this.toast('Please allow pop-ups to export PDF');
      return;
    }

    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>${customHeader} - ${periodLabel}</title>
  <style>
    @page { size: landscape; margin: 10mm; }
    body { font-family: Arial, sans-serif; color: #111827; font-size: 10px; margin: 0; }
    .hdr { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; border-bottom: 2px solid #111827; padding-bottom: 6px; }
    .hdr h1 { font-size: 15px; margin: 0; }
    .hdr span { font-size: 10px; color: #4b5563; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #cbd5e1; padding: 3px 4px; text-align: center; }
    th { background: #f1f5f9; font-weight: 700; font-size: 9px; }
    td.emp-col, th.emp-col { text-align: left; min-width: 120px; }
    td.num-col { text-align: right; white-space: nowrap; }
    tfoot td { background: #f8fafc; font-weight: 700; border-top: 2px solid #334155; }
    .ftr { margin-top: 12px; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; font-size: 9px; color: #64748b; }
  </style>
</head>
<body>
  <div class="hdr">
    <div>
      <div style="font-size:14px;font-weight:bold;margin-bottom:4px">${headerHtml}</div>
      <span style="font-weight:600;color:#0f172a">Workhours &amp; Compensation Report (${periodLabel})</span>
    </div>
    <span>Unit: ${unitLabel} | Generated: ${new Date().toLocaleDateString()}</span>
  </div>
  <table>
    <thead>
      <tr>
        <th class="emp-col">Employee</th>
        ${headerCols}
        <th>Total Time</th>
        <th>Price / Hr</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
    <tfoot>
      <tr>
        <td class="emp-col">Grand Total (${filteredEmps.length} staff)</td>
        <td colspan="${dates.length}"></td>
        <td class="num-col">${this.formatDuration(grandTotalHours)}</td>
        <td>—</td>
        <td class="num-col">${this.formatMoney(grandTotalPay)}</td>
      </tr>
    </tfoot>
  </table>
  <div class="ftr">
    <div style="line-height:1.4">${footerHtml}</div>
    <div style="white-space:nowrap;margin-left:15px">Page 1 of 1</div>
  </div>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`);
    win.document.close();
  }

  private exportTimetableToExcel(): void {
    const filteredEmps = this.getFilteredTimetableEmployees();
    const dates = this.getCurrentPeriodDates();
    const periodLabel =
      this.timetableMode === 'monthly'
        ? this.currentMonth
        : `${dates[0]}_to_${dates[dates.length - 1]}`;
    const unitLabel = this.settings.timeUnit === 'minutes' ? 'Minutes' : 'Hours';
    const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
    const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';

    let grandTotalHours = 0;
    let grandTotalPay = 0;

    const headerCols = dates
      .map((d) => `<th>${this.timetableMode === 'monthly' ? d.slice(8) : d.slice(5)}</th>`)
      .join('');

    const rowsHtml = filteredEmps
      .map((emp) => {
        let empHours = 0;
        const hourly = parseFloat(emp.hourlyRate || '0');
        const base = parseFloat(emp.baseSalary || '0');
        const isFixed = hourly <= 0 && base > 0;
        const cells = dates
          .map((d) => {
            const s = this.schedules.find((x) => x.employeeId === emp.id && x.workDate === d);
            if (!s) return `<td></td>`;
            const hrs = parseFloat(s.plannedHours || '0');
            empHours += hrs;
            const txt =
              s.shiftType === 'Off'
                ? 'Off'
                : s.shiftType === 'Absence'
                ? 'Ab'
                : s.shiftType === 'Leave'
                ? 'Leave'
                : s.shiftType === 'Holiday'
                ? 'Holiday'
                : s.shiftType === 'Sick'
                ? `Sick (${this.formatDuration(hrs, true)})`
                : this.formatDuration(hrs, true);
            return `<td>${txt}</td>`;
          })
          .join('');

        let pay = 0;
        let rateStr = '';
        if (hourly > 0) {
          pay = +(empHours * hourly).toFixed(2);
          rateStr = `${this.formatMoney(hourly)}/h`;
        } else if (isFixed) {
          const targetHours = emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
          if (this.timetableMode === 'monthly') {
            pay = base;
            const effRate = empHours > 0 ? +(base / empHours).toFixed(2) : +(base / targetHours).toFixed(2);
            rateStr = `${this.formatMoney(effRate)}/h (${this.t('fixed', 'Fixed')})`;
          } else {
            const effRate = +(base / targetHours).toFixed(2);
            const weeklyBase = +(base / 4).toFixed(2);
            pay = empHours > 0 ? (empHours >= (emp.weeklyTargetHours || 40) ? weeklyBase : +(empHours * effRate).toFixed(2)) : weeklyBase;
            rateStr = `${this.formatMoney(effRate)}/h (${this.t('fixed', 'Fixed')})`;
          }
        } else {
          pay = 0;
          rateStr = '—';
        }

        grandTotalHours += empHours;
        grandTotalPay += pay;

        return `
          <tr>
            <td><strong>${emp.firstName} ${emp.lastName}</strong></td>
            ${cells}
            <td><strong>${this.formatDuration(empHours)}</strong></td>
            <td>${rateStr}</td>
            <td><strong>${this.formatMoney(pay)}</strong></td>
          </tr>
        `;
      })
      .join('');

    const headerHtml = this.formatParagraphToHtml(customHeader);
    const footerHtml = this.formatParagraphToHtml(customFooter);

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8" /></head>
      <body>
        <table border="1">
          <thead>
            <tr>
              <th colspan="${dates.length + 4}" style="font-size:13px;background:#e2e8f0;font-weight:bold;padding:8px;text-align:left">
                ${headerHtml}<br /><span style="font-size:11px;font-weight:normal">Workhours (${periodLabel}) [Unit: ${unitLabel}]</span>
              </th>
            </tr>
            <tr style="background:#f1f5f9;font-weight:bold">
              <th>Employee</th>
              ${headerCols}
              <th>Total Time</th>
              <th>Price / Hr</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
          <tfoot>
            <tr style="background:#f8fafc;font-weight:bold">
              <td>Grand Total (${filteredEmps.length} staff)</td>
              <td colspan="${dates.length}"></td>
              <td>${this.formatDuration(grandTotalHours)}</td>
              <td>—</td>
              <td>${this.formatMoney(grandTotalPay)}</td>
            </tr>
            <tr>
              <td colspan="${dates.length + 4}" style="font-size:11px;color:#64748b;background:#f8fafc;padding:6px;text-align:left">
                ${footerHtml}
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
      </html>
    `;

    this.downloadTextFile(
      `workhours-${periodLabel}.xls`,
      '\uFEFF' + excelHtml,
      'application/vnd.ms-excel;charset=utf-8;'
    );
  }

  private startInlineCellEdit(
    cell: HTMLElement,
    empId: number,
    dateStr: string,
    initialChar?: string
  ): void {
    if (this.currentUser?.role === 'viewer') return;
    if (cell.querySelector('input.cell-inline-input')) return;

    this.focusCell(empId, dateStr, false);

    const existing = this.schedules.find(
      (s) => s.employeeId === empId && s.workDate === dateStr
    );
    const existingHours = existing ? parseFloat(existing.plannedHours || '0') : 0;
    const isMinutes = this.settings.timeUnit === 'minutes';
    const initialVal =
      initialChar !== undefined
        ? initialChar
        : existing
        ? isMinutes
          ? String(Math.round(existingHours * 60))
          : String(existingHours)
        : '';

    const originalHtml = cell.innerHTML;
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'cell-inline-input';
    input.value = initialVal;
    input.placeholder = isMinutes ? 'min' : 'hrs';

    cell.innerHTML = '';
    cell.appendChild(input);
    input.focus();
    if (initialChar === undefined) {
      input.select();
    } else {
      // Put cursor at end of entered character
      input.setSelectionRange(input.value.length, input.value.length);
    }

    let finished = false;
    const commit = async () => {
      if (finished) return;
      finished = true;
      const raw = input.value.trim().replace(',', '.');

      if (raw === '') {
        if (existing) {
          try {
            await this.api(`/api/schedules/${existing.id}`, { method: 'DELETE' });
            this.toast('Cell cleared');
            await this.loadAllData();
          } catch (err: any) {
            this.toast(err.message);
            cell.innerHTML = originalHtml;
          }
        } else {
          cell.innerHTML = originalHtml;
        }
        return;
      }

      const num = Math.max(0, parseFloat(raw));
      if (isNaN(num)) {
        cell.innerHTML = originalHtml;
        return;
      }

      const hoursToSave = isMinutes ? +(num / 60).toFixed(2) : +num.toFixed(2);
      const shiftType =
        hoursToSave === 0
          ? 'Off'
          : existing && !['Off', 'Leave', 'Absence', 'Holiday', 'Sick'].includes(existing.shiftType)
          ? existing.shiftType
          : 'Morning';

      try {
        await this.api('/api/schedules', {
          method: 'POST',
          body: JSON.stringify({
            employeeId: empId,
            workDate: dateStr,
            shiftType,
            startTime: existing?.startTime || this.settings.defaultShiftStart,
            endTime: existing?.endTime || this.settings.defaultShiftEnd,
            breakMinutes: existing?.breakMinutes ?? this.settings.defaultBreakMinutes,
            plannedHours: hoursToSave,
          }),
        });
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
        cell.innerHTML = originalHtml;
      }
    };

    input.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        commit();
      } else if (e.key === 'Escape') {
        finished = true;
        cell.innerHTML = originalHtml;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        commit();
        this.moveCellFocus(-1, 0);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        commit();
        this.moveCellFocus(1, 0);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        commit();
        this.moveCellFocus(0, -1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        commit();
        this.moveCellFocus(0, 1);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        commit();
        this.moveCellFocus(0, e.shiftKey ? -1 : 1);
      }
    });

    input.addEventListener('blur', () => {
      commit();
    });

    input.addEventListener('click', (e) => e.stopPropagation());
  }

  private openCellContextMenu(e: MouseEvent, empId: number, dateStr: string): void {
    if (this.currentUser?.role === 'viewer') return;
    const menu = document.getElementById('cell-context-menu');
    if (!menu) return;

    this.ctxTarget = { empId, dateStr };
    const label = document.getElementById('ctx-cell-label');
    if (label) label.textContent = `${this.getEmployeeName(empId)} • ${dateStr}`;

    menu.classList.remove('hidden');
    const menuW = 195;
    const menuH = 240;
    const x = Math.min(e.clientX, window.innerWidth - menuW - 8);
    const y = Math.min(e.clientY, window.innerHeight - menuH - 8);
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;
  }

  private bindCellContextMenu(): void {
    const menu = document.getElementById('cell-context-menu');
    if (!menu) return;

    const hideMenu = () => menu.classList.add('hidden');

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target as Node)) hideMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideMenu();
    });

    menu.querySelectorAll('[data-ctx-type]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!this.ctxTarget) return;
        const shiftType = btn.getAttribute('data-ctx-type') || 'Leave';
        const { empId, dateStr } = this.ctxTarget;
        hideMenu();

        try {
          await this.api('/api/schedules', {
            method: 'POST',
            body: JSON.stringify({
              employeeId: empId,
              workDate: dateStr,
              shiftType,
              notes: `Marked as ${shiftType}`,
            }),
          });
          this.toast(`${dateStr} marked as ${shiftType}`);
          await this.loadAllData();
        } catch (err: any) {
          this.toast(err.message);
        }
      });
    });

    menu.querySelector('[data-ctx-action="edit-modal"]')?.addEventListener('click', () => {
      if (!this.ctxTarget) return;
      const { empId, dateStr } = this.ctxTarget;
      hideMenu();
      this.openShiftModal(empId, dateStr);
    });

    menu.querySelector('[data-ctx-action="clear"]')?.addEventListener('click', async () => {
      if (!this.ctxTarget) return;
      const { empId, dateStr } = this.ctxTarget;
      hideMenu();
      const existing = this.schedules.find(
        (s) => s.employeeId === empId && s.workDate === dateStr
      );
      if (existing) {
        await this.api(`/api/schedules/${existing.id}`, { method: 'DELETE' });
        this.toast('Cell cleared');
        await this.loadAllData();
      }
    });
  }

  private highlightRow(empId: number | null): void {
    this.selectedRowEmpId = empId;
    document.querySelectorAll('.row-selected').forEach((r) => r.classList.remove('row-selected'));
    if (empId !== null) {
      document.querySelectorAll(`tr[data-row-emp="${empId}"]`).forEach((r) => {
        r.classList.add('row-selected');
      });
    }
  }

  private restoreCellFocus(): void {
    if (this.selectedRowEmpId !== null) {
      this.highlightRow(this.selectedRowEmpId);
    }
    if (!this.focusedCell) return;
    const { empId, dateStr } = this.focusedCell;
    const selector = `[data-emp="${empId}"][data-date="${dateStr}"]`;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      document.querySelectorAll('.active-focus').forEach((c) => c.classList.remove('active-focus'));
      el.classList.add('active-focus');
    }
  }

  private focusCell(empId: number, dateStr: string, scroll = true): void {
    this.focusedCell = { empId, dateStr };
    this.highlightRow(empId);
    document.querySelectorAll('.active-focus').forEach((c) => c.classList.remove('active-focus'));
    const selector = `[data-emp="${empId}"][data-date="${dateStr}"]`;
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      el.classList.add('active-focus');
      el.focus();
      if (scroll) {
        el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }
  }

  private moveCellFocus(dRow: number, dCol: number): void {
    const emps = this.getFilteredTimetableEmployees();
    const dates = this.getCurrentPeriodDates();
    if (emps.length === 0 || dates.length === 0) return;

    let rIdx = 0;
    let cIdx = 0;

    if (this.focusedCell) {
      const foundR = emps.findIndex((x) => x.id === this.focusedCell!.empId);
      const foundC = dates.indexOf(this.focusedCell!.dateStr);
      if (foundR !== -1) rIdx = foundR;
      if (foundC !== -1) cIdx = foundC;
    }

    const nextR = Math.max(0, Math.min(emps.length - 1, rIdx + dRow));
    const nextC = Math.max(0, Math.min(dates.length - 1, cIdx + dCol));

    const nextEmp = emps[nextR];
    const nextDate = dates[nextC];
    if (nextEmp && nextDate) {
      this.focusCell(nextEmp.id, nextDate, true);
    }
  }

  private bindKeyboardNavigation(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      // Check if we are in timetable tab
      const timetableSection = document.getElementById('tab-timetable');
      if (!timetableSection || timetableSection.classList.contains('hidden')) return;

      // Ignore if user is inside a modal or typing in an input/select/textarea outside cell editor
      const activeEl = document.activeElement as HTMLElement | null;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT');

      if (isInput && !activeEl.classList.contains('cell-inline-input')) {
        return;
      }

      // If currently editing inside a cell input, let input's own keydown handler handle commits & arrow navigation
      if (activeEl?.classList.contains('cell-inline-input')) {
        return;
      }

      // Not typing in an input: Arrow Navigation & Direct Digit Modification
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.moveCellFocus(-1, 0);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.moveCellFocus(1, 0);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.moveCellFocus(0, -1);
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.moveCellFocus(0, 1);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        this.moveCellFocus(0, e.shiftKey ? -1 : 1);
        return;
      }

      // Enter / F2 to edit
      if (e.key === 'Enter' || e.key === 'F2') {
        if (this.currentUser?.role === 'viewer') return;
        if (this.focusedCell) {
          e.preventDefault();
          const selector = `[data-emp="${this.focusedCell.empId}"][data-date="${this.focusedCell.dateStr}"]`;
          const cell = document.querySelector(selector) as HTMLElement | null;
          if (cell) {
            this.startInlineCellEdit(cell, this.focusedCell.empId, this.focusedCell.dateStr);
          }
        }
        return;
      }

      // Delete / Backspace to clear cell
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (this.currentUser?.role === 'viewer') return;
        if (this.focusedCell) {
          e.preventDefault();
          const { empId, dateStr } = this.focusedCell;
          const existing = this.schedules.find(
            (s) => s.employeeId === empId && s.workDate === dateStr
          );
          if (existing) {
            this.api(`/api/schedules/${existing.id}`, { method: 'DELETE' }).then(() => {
              this.toast('Cell cleared');
              this.loadAllData();
            });
          }
        }
        return;
      }

      // Direct Typing of number (0-9 or .) modifies the cell immediately
      if (/^[0-9,.]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (this.currentUser?.role === 'viewer') return;
        if (!this.focusedCell) {
          const emps = this.getFilteredTimetableEmployees();
          const dates = this.getCurrentPeriodDates();
          if (emps[0] && dates[0]) {
            this.focusCell(emps[0].id, dates[0], true);
          }
        }
        if (this.focusedCell) {
          e.preventDefault();
          const selector = `[data-emp="${this.focusedCell.empId}"][data-date="${this.focusedCell.dateStr}"]`;
          const cell = document.querySelector(selector) as HTMLElement | null;
          if (cell) {
            this.startInlineCellEdit(cell, this.focusedCell.empId, this.focusedCell.dateStr, e.key);
          }
        }
      }
    });
  }

  private openShiftModal(empId: number, workDate: string): void {
    const existing = this.schedules.find(
      (s) => s.employeeId === empId && s.workDate === workDate
    );

    (document.getElementById('sched-id') as HTMLInputElement).value = existing
      ? String(existing.id)
      : '';
    (document.getElementById('sched-employee') as HTMLSelectElement).value = String(empId);
    (document.getElementById('sched-date') as HTMLInputElement).value = workDate;
    (document.getElementById('sched-type') as HTMLSelectElement).value =
      existing?.shiftType || 'Morning';
    (document.getElementById('sched-start') as HTMLInputElement).value =
      existing?.startTime || this.settings.defaultShiftStart;
    (document.getElementById('sched-end') as HTMLInputElement).value =
      existing?.endTime || this.settings.defaultShiftEnd;
    (document.getElementById('sched-break') as HTMLInputElement).value = String(
      existing?.breakMinutes ?? this.settings.defaultBreakMinutes
    );
    (document.getElementById('sched-notes') as HTMLInputElement).value = existing?.notes || '';

    const delBtn = document.getElementById('btn-delete-sched');
    if (delBtn) {
      delBtn.classList.toggle('hidden', !existing);
      delBtn.onclick = async () => {
        if (!existing) return;
        await this.api(`/api/schedules/${existing.id}`, { method: 'DELETE' });
        this.closeModal('modal-schedule');
        this.toast('Shift removed');
        await this.loadAllData();
      };
    }

    this.openModal('modal-schedule');
  }

  // --- Time Logs (Leaves, Absences & Sick) ---
  private renderAttendance(): void {
    const searchVal = (
      (document.getElementById('timelog-search') as HTMLInputElement | null)?.value || ''
    ).toLowerCase();
    const typeVal = (
      document.getElementById('timelog-type-filter') as HTMLSelectElement | null
    )?.value;
    const fromVal = (
      document.getElementById('timelog-from') as HTMLInputElement | null
    )?.value;
    const toVal = (
      document.getElementById('timelog-to') as HTMLInputElement | null
    )?.value;

    const list = this.timeLogRecords
      .filter((r) => {
        if (typeVal && r.shiftType !== typeVal) return false;
        if (fromVal && r.workDate < fromVal) return false;
        if (toVal && r.workDate > toVal) return false;
        if (searchVal) {
          const emp = this.employees.find((e) => e.id === r.employeeId);
          const hay = `${r.workDate} ${r.shiftType} ${emp?.employeeCode || ''} ${emp?.firstName || ''} ${emp?.lastName || ''} ${r.notes || ''}`.toLowerCase();
          if (!hay.includes(searchVal)) return false;
        }
        return true;
      })
      .sort((a, b) => b.workDate.localeCompare(a.workDate));

    let leaveDays = 0;
    let leaveHours = 0;
    let absenceDays = 0;
    let sickDays = 0;
    let sickHours = 0;
    let totalCreditedPay = 0;

    list.forEach((r) => {
      const hrs = parseFloat(r.plannedHours || '0');
      const emp = this.employees.find((e) => e.id === r.employeeId);
      const hourly = emp ? parseFloat(emp.hourlyRate || '0') : 0;
      const base = emp ? parseFloat(emp.baseSalary || '0') : 0;
      const targetHours = emp && emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
      const rate = hourly > 0 ? hourly : (base > 0 ? +(base / targetHours).toFixed(2) : 0);
      const pay = hrs * rate;
      totalCreditedPay += pay;

      if (r.shiftType === 'Leave') {
        leaveDays++;
        leaveHours += hrs;
      } else if (r.shiftType === 'Absence') {
        absenceDays++;
      } else if (r.shiftType === 'Sick') {
        sickDays++;
        sickHours += hrs;
      }
    });

    const summaryEl = document.getElementById('timelog-summary-cards');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="kpi-card">
          <span class="kpi-label">Total Records</span>
          <span class="kpi-value">${list.length}</span>
          <span class="kpi-sub">Filtered entries</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Leaves</span>
          <span class="kpi-value" style="color:#22d3ee">${leaveDays}d (${this.formatDuration(leaveHours)})</span>
          <span class="kpi-sub">Total leave time</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Absences</span>
          <span class="kpi-value" style="color:#f87171">${absenceDays}d</span>
          <span class="kpi-sub">Unpaid / absent days</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Sick (${this.settings.sickPayPercent ?? 80}%)</span>
          <span class="kpi-value" style="color:#fb923c">${sickDays}d (${this.formatDuration(sickHours)})</span>
          <span class="kpi-sub">Calculated sick time</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Credited Pay Total</span>
          <span class="kpi-value" style="color:#34d399">${this.formatMoney(totalCreditedPay)}</span>
          <span class="kpi-sub">Leave + Sick pay</span>
        </div>
      `;
    }

    const tbody = document.getElementById('timelog-tbody');
    if (!tbody) return;

    tbody.innerHTML =
      list
        .map((r) => {
          const emp = this.employees.find((e) => e.id === r.employeeId);
          const hrs = parseFloat(r.plannedHours || '0');
          const hourly = emp ? parseFloat(emp.hourlyRate || '0') : 0;
          const base = emp ? parseFloat(emp.baseSalary || '0') : 0;
          const targetHours = emp && emp.weeklyTargetHours > 0 ? emp.weeklyTargetHours * 4 : 160;
          const rate = hourly > 0 ? hourly : (base > 0 ? +(base / targetHours).toFixed(2) : 0);
          const pay = +(hrs * rate).toFixed(2);
          return `
            <tr>
              <td><strong>${r.workDate}</strong></td>
              <td>${emp?.employeeCode || '—'}</td>
              <td><strong>${emp?.firstName || '—'}</strong></td>
              <td><strong>${emp?.lastName || '—'}</strong></td>
              <td><span class="badge tt-shift-${r.shiftType}">${r.shiftType}</span></td>
              <td><strong>${this.formatDuration(hrs)}</strong></td>
              <td style="color:#34d399;font-weight:600">${this.formatMoney(pay)}</td>
              <td>${r.notes || '—'}</td>
              <td>
                ${
                  this.currentUser?.role === 'viewer'
                    ? '<span style="color:#64748b">—</span>'
                    : `<button class="btn btn-xs btn-danger" data-del-timelog="${r.id}">×</button>`
                }
              </td>
            </tr>
          `;
        })
        .join('') || `<tr><td colspan="9">No Leave, Absence, or Sick records match your filter</td></tr>`;

    tbody.querySelectorAll('[data-del-timelog]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-timelog');
        await this.api(`/api/schedules/${id}`, { method: 'DELETE' });
        this.toast('Record deleted');
        await this.loadAllData();
      });
    });
  }

  // --- Salary & Payroll Rendering ---
  private renderPayroll(): void {
    const periodVal = (
      document.getElementById('payroll-period-picker') as HTMLInputElement | null
    )?.value;
    const statusVal = (
      document.getElementById('payroll-status-filter') as HTMLSelectElement | null
    )?.value;
    const empStatusVal = (
      document.getElementById('payroll-emp-status-filter') as HTMLSelectElement | null
    )?.value;

    const filtered = this.payrolls.filter((p) => {
      if (periodVal && p.payPeriod !== periodVal) return false;
      if (statusVal && p.paymentStatus !== statusVal) return false;
      if (empStatusVal) {
        const emp = this.employees.find((e) => e.id === p.employeeId);
        if (!emp || emp.status !== empStatusVal) return false;
      }
      return true;
    });

    const bannerEl = document.getElementById('payroll-settings-banner');
    if (bannerEl) {
      const soc = parseFloat(this.settings.socialSecurityPercent || '9.5');
      const med = parseFloat(this.settings.medicalSecurityPercent || '1.7');
      const inc = parseFloat(this.settings.incomeTaxPercent || '13.0');
      bannerEl.innerHTML = `
        <div class="toolbar-group">
          <strong style="color:#a5b4fc">Active Settings (Net → Gross):</strong>
          <span>Social Security: <strong>${soc}%</strong></span>
          <span>•</span>
          <span>Medical Security: <strong>${med}%</strong></span>
          <span>•</span>
          <span>Tax Over Income: <strong>${inc}%</strong></span>
        </div>
        <button type="button" class="btn btn-xs btn-ghost" id="btn-payroll-edit-settings">Edit in Settings →</button>
      `;
      document.getElementById('btn-payroll-edit-settings')?.addEventListener('click', () => {
        const settingsBtn = document.querySelector('.nav-item[data-tab="settings"]') as HTMLElement | null;
        settingsBtn?.click();
      });
    }

    const socPct = parseFloat(this.settings.socialSecurityPercent || '9.5');
    const medPct = parseFloat(this.settings.medicalSecurityPercent || '1.7');
    const incPct = parseFloat(this.settings.incomeTaxPercent || '13.0');
    const computeRowAmounts = (p: PayrollRecord) => {
      const netNum = parseFloat(p.netSalary || '0');
      let grossNum = parseFloat(p.grossPay || '0');
      let socAmt = parseFloat(p.socialSecurityAmount || '0');
      let medAmt = parseFloat(p.medicalSecurityAmount || '0');
      let incAmt = parseFloat(p.incomeTaxAmount || '0');

      if (!grossNum || grossNum <= 0) {
        if (netNum < 44400) {
          socAmt = 4750;
          medAmt = 850;
          incAmt = 0;
          grossNum = +(netNum + medAmt + incAmt + socAmt).toFixed(2);
        } else {
          const divisor = Math.max(0.01, +(1 - (socPct + medPct + incPct) / 100).toFixed(4));
          grossNum = +((netNum - 3900) / divisor).toFixed(2);
          socAmt = +(grossNum * (socPct / 100)).toFixed(2);
          medAmt = +(grossNum * (medPct / 100)).toFixed(2);
          incAmt = +(Math.max(0, grossNum - 30000) * (incPct / 100)).toFixed(2);
        }
      }
      return { netNum, grossNum, socAmt, medAmt, incAmt };
    };

    const totalNet = filtered.reduce((s, p) => s + parseFloat(p.netSalary || '0'), 0);
    const totalGross = filtered.reduce((s, p) => s + computeRowAmounts(p).grossNum, 0);
    const paidTotal = filtered
      .filter((p) => p.paymentStatus === 'Paid')
      .reduce((s, p) => s + parseFloat(p.netSalary || '0'), 0);
    const pendingTotal = filtered
      .filter((p) => p.paymentStatus !== 'Paid')
      .reduce((s, p) => s + parseFloat(p.netSalary || '0'), 0);

    const summaryEl = document.getElementById('payroll-summary-cards');
    if (summaryEl) {
      summaryEl.innerHTML = `
        <div class="kpi-card">
          <span class="kpi-label">Records</span>
          <span class="kpi-value">${filtered.length}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Total Net Salary</span>
          <span class="kpi-value" style="color:#34d399">${this.formatMoney(totalNet)}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Total Gross Pay</span>
          <span class="kpi-value" style="color:#38bdf8">${this.formatMoney(totalGross)}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Paid / Pending</span>
          <span class="kpi-value" style="font-size:0.95rem">${this.formatMoney(paidTotal)} / <span style="color:#fbbf24">${this.formatMoney(pendingTotal)}</span></span>
        </div>
      `;
    }

    const tbody = document.getElementById('payroll-tbody');
    if (!tbody) return;

    tbody.innerHTML =
      filtered
        .map((p) => {
          const emp = this.employees.find((e) => e.id === p.employeeId);
          const dateLabel = p.paymentDate || p.payPeriod;
          const bankNum = emp?.bankAccount || '—';
          const { netNum, grossNum, socAmt, medAmt, incAmt } = computeRowAmounts(p);
          return `
            <tr>
              <td><strong>${dateLabel}</strong></td>
              <td>${bankNum}</td>
              <td><strong>${this.getEmployeeName(p.employeeId)}</strong></td>
              <td><strong style="color:#34d399">${this.formatMoney(netNum)}</strong></td>
              <td>${this.formatMoney(socAmt)}</td>
              <td>${this.formatMoney(medAmt)}</td>
              <td>${this.formatMoney(incAmt)}</td>
              <td><strong style="color:#38bdf8">${this.formatMoney(grossNum)}</strong></td>
              <td><span class="badge badge-${p.paymentStatus}">${p.paymentStatus}</span></td>
              <td>
                <div class="toolbar-group">
                  <button class="btn btn-xs btn-secondary" data-view-slip="${p.id}">Slip</button>
                  ${
                    this.currentUser?.role === 'admin'
                      ? p.paymentStatus === 'Pending'
                        ? `<button class="btn btn-xs btn-primary" data-pay-status="${p.id}" data-next="Approved">Approve</button>`
                        : p.paymentStatus === 'Approved'
                        ? `<button class="btn btn-xs btn-success" data-pay-status="${p.id}" data-next="Paid">Pay</button>`
                        : ''
                      : ''
                  }
                  ${
                    this.currentUser?.role === 'admin'
                      ? `<button class="btn btn-xs btn-danger" data-del-pay="${p.id}">×</button>`
                      : ''
                  }
                </div>
              </td>
            </tr>
          `;
        })
        .join('') || `<tr><td colspan="10">No payroll records for this period.</td></tr>`;

    tbody.querySelectorAll('[data-pay-status]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-pay-status');
        const nextStatus = btn.getAttribute('data-next');
        await this.api(`/api/payrolls/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ paymentStatus: nextStatus }),
        });
        this.toast(`Payroll marked ${nextStatus}`);
        await this.loadAllData();
      });
    });

    tbody.querySelectorAll('[data-del-pay]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-del-pay');
        await this.api(`/api/payrolls/${id}`, { method: 'DELETE' });
        this.toast('Payroll entry deleted');
        await this.loadAllData();
      });
    });

    tbody.querySelectorAll('[data-view-slip]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-view-slip'));
        const rec = this.payrolls.find((x) => x.id === id);
        if (rec) this.showPayslipModal(rec);
      });
    });
  }

  private showPayslipModal(p: PayrollRecord): void {
    const emp = this.employees.find((e) => e.id === p.employeeId);
    const socPct = parseFloat(this.settings.socialSecurityPercent || '9.5');
    const medPct = parseFloat(this.settings.medicalSecurityPercent || '1.7');
    const incPct = parseFloat(this.settings.incomeTaxPercent || '13.0');

    const netNum = parseFloat(p.netSalary || '0');
    let grossNum = parseFloat(p.grossPay || '0');
    let socAmt = parseFloat(p.socialSecurityAmount || '0');
    let medAmt = parseFloat(p.medicalSecurityAmount || '0');
    let incAmt = parseFloat(p.incomeTaxAmount || '0');

    if (!grossNum || grossNum <= 0) {
      if (netNum < 44400) {
        socAmt = 4750;
        medAmt = 850;
        incAmt = 0;
        grossNum = +(netNum + medAmt + incAmt + socAmt).toFixed(2);
      } else {
        const divisor = Math.max(0.01, +(1 - (socPct + medPct + incPct) / 100).toFixed(4));
        grossNum = +((netNum - 3900) / divisor).toFixed(2);
        socAmt = +(grossNum * (socPct / 100)).toFixed(2);
        medAmt = +(grossNum * (medPct / 100)).toFixed(2);
        incAmt = +(Math.max(0, grossNum - 30000) * (incPct / 100)).toFixed(2);
      }
    }
    const totalTaxes = +(socAmt + medAmt + incAmt).toFixed(2);

    const container = document.getElementById('payslip-content');
    if (container) {
      container.innerHTML = `
        <div class="payslip-header">
          <div>
            <h3>PulseHR Payslip</h3>
            <p style="color:#94a3b8;font-size:0.78rem">Period: <strong>${p.payPeriod}</strong> | #PS-${10000 + p.id}</p>
          </div>
          <div style="text-align:right">
            <span class="badge badge-${p.paymentStatus}">${p.paymentStatus}</span>
            <p style="color:#94a3b8;font-size:0.74rem;margin-top:0.2rem">Date: ${p.paymentDate || p.payPeriod}</p>
          </div>
        </div>

        <div class="payslip-grid">
          <div>
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase">Employee</p>
            <p><strong>${emp ? `${emp.firstName} ${emp.lastName}` : ''} (${emp?.employeeCode || ''})</strong></p>
            <p style="font-size:0.78rem">Bank: <strong>${emp?.bankAccount || '—'}</strong> | Period Hours: <strong>${parseFloat(p.regularHoursWorked || '0').toFixed(2)}h</strong></p>
          </div>
          <div>
            <p style="color:#94a3b8;font-size:0.7rem;text-transform:uppercase">Tax Calculation Tier</p>
            <p style="font-size:0.78rem">${netNum < 44400 ? 'Minimum Threshold Tier (&lt;44,400 Lek)' : 'Standard Tier (&ge;44,400 Lek)'}</p>
            <p style="font-size:0.78rem">Social: <strong>${netNum < 44400 ? '4,750 Lek' : `${socPct}%`}</strong> | Med: <strong>${netNum < 44400 ? '850 Lek' : `${medPct}%`}</strong> | Tax: <strong>${netNum < 44400 ? '0 Lek' : `${incPct}% (&gt;30k)`}</strong></p>
          </div>
        </div>

        <table class="data-table" style="margin-bottom:0.85rem">
          <thead>
            <tr><th>Component</th><th>Calculation</th><th>Amount (Lek)</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Net Payment (Take-Home)</strong></td><td>—</td><td><strong style="color:#34d399">${this.formatMoney(netNum)}</strong></td></tr>
            <tr><td>Social Security</td><td>${netNum < 44400 ? 'Fixed (Min Wage Base)' : `${socPct}% of Gross`}</td><td>${this.formatMoney(socAmt)}</td></tr>
            <tr><td>Medical Security</td><td>${netNum < 44400 ? 'Fixed (Min Wage Base)' : `${medPct}% of Gross`}</td><td>${this.formatMoney(medAmt)}</td></tr>
            <tr><td>Tax Over Income</td><td>${netNum < 44400 ? 'Exempt (&lt;44,400)' : `${incPct}% over 30,000 Lek`}</td><td>${this.formatMoney(incAmt)}</td></tr>
            <tr><td><strong>Total Taxes &amp; Contributions</strong></td><td>—</td><td><strong>${this.formatMoney(totalTaxes)}</strong></td></tr>
          </tbody>
        </table>

        <div class="payslip-net-banner">
          <span>CALCULATED GROSS PAY</span>
          <span style="color:#38bdf8">${this.formatMoney(grossNum)}</span>
        </div>
      `;
    }

    this.openModal('modal-payslip');
  }

  // --- Employees Directory Filtering & Rendering ---
  private getFilteredEmployees(): Employee[] {
    const searchVal = (
      (document.getElementById('emp-search') as HTMLInputElement | null)?.value || ''
    ).toLowerCase();
    const statusVal = (
      document.getElementById('emp-status-filter') as HTMLSelectElement | null
    )?.value;
    const genderVal = (
      document.getElementById('emp-gender-filter') as HTMLSelectElement | null
    )?.value;
    const payTypeVal = (
      document.getElementById('emp-paytype-filter') as HTMLSelectElement | null
    )?.value;
    const profileVal = (
      document.getElementById('emp-profile-filter') as HTMLSelectElement | null
    )?.value;
    const docVal = (
      document.getElementById('emp-doc-filter') as HTMLSelectElement | null
    )?.value;

    return this.employees.filter((e) => {
      if (statusVal && e.status !== statusVal) return false;

      if (genderVal) {
        if (genderVal === 'unset') {
          if (e.gender) return false;
        } else if (e.gender !== genderVal) {
          return false;
        }
      }

      if (payTypeVal) {
        const baseNum = parseFloat(e.baseSalary || '0');
        const hourlyNum = parseFloat(e.hourlyRate || '0');
        if (payTypeVal === 'base' && baseNum <= 0) return false;
        if (payTypeVal === 'hourly' && (hourlyNum <= 0 || baseNum > 0)) return false;
      }

      if (profileVal) {
        if (profileVal === 'has_photo' && !e.idPhoto) return false;
        if (profileVal === 'no_photo' && e.idPhoto) return false;
        if (profileVal === 'has_id' && !e.idNumber) return false;
        if (profileVal === 'no_id' && e.idNumber) return false;
        if (profileVal === 'no_bank' && e.bankAccount) return false;
        if (profileVal === 'no_dob' && e.dateOfBirth) return false;
      }

      if (docVal) {
        const docKeys = [
          'docMedicalReport',
          'docMedicalChart',
          'docWorkContract',
          'docWorkBook',
          'docDeclaration',
          'docTraining',
        ] as const;
        const verifiedCount = docKeys.filter((k) => Boolean(e[k])).length;

        if (docVal === 'complete' && verifiedCount < 6) return false;
        if (docVal === 'incomplete' && verifiedCount === 6) return false;
        if (docVal === 'none' && verifiedCount > 0) return false;
        if (docVal.startsWith('missing:')) {
          const key = docVal.split(':')[1] as keyof Employee;
          if (Boolean(e[key])) return false;
        }
        if (docVal.startsWith('has:')) {
          const key = docVal.split(':')[1] as keyof Employee;
          if (!Boolean(e[key])) return false;
        }
      }

      if (searchVal) {
        const hay = `${e.hireDate} ${e.employeeCode} ${e.firstName} ${e.lastName} ${e.gender || ''} ${e.dateOfBirth || ''} ${e.idNumber || ''} ${e.bankAccount || ''} ${e.email || ''} ${e.phone || ''} ${e.position || ''} ${e.status}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });
  }

  private getActiveEmployeeFilterSummary(): string {
    const parts: string[] = [];
    const searchVal = (document.getElementById('emp-search') as HTMLInputElement | null)?.value?.trim();
    const statusSel = document.getElementById('emp-status-filter') as HTMLSelectElement | null;
    const genderSel = document.getElementById('emp-gender-filter') as HTMLSelectElement | null;
    const paySel = document.getElementById('emp-paytype-filter') as HTMLSelectElement | null;
    const profSel = document.getElementById('emp-profile-filter') as HTMLSelectElement | null;
    const docSel = document.getElementById('emp-doc-filter') as HTMLSelectElement | null;

    if (searchVal) parts.push(`Search: "${searchVal}"`);
    if (statusSel?.value) parts.push(`Status: ${statusSel.options[statusSel.selectedIndex].text}`);
    if (genderSel?.value) parts.push(`Gender: ${genderSel.options[genderSel.selectedIndex].text}`);
    if (paySel?.value) parts.push(`Pay: ${paySel.options[paySel.selectedIndex].text}`);
    if (profSel?.value) parts.push(profSel.options[profSel.selectedIndex].text);
    if (docSel?.value) parts.push(`Docs: ${docSel.options[docSel.selectedIndex].text}`);
    return parts.length > 0 ? parts.join(' | ') : 'All Employees (No active filters)';
  }

  private renderEmployees(): void {
    const list = this.getFilteredEmployees();

    const countEl = document.getElementById('emp-filter-count');
    if (countEl) {
      countEl.textContent = `${list.length} / ${this.employees.length}`;
    }

    const tbody = document.getElementById('employees-tbody');
    if (!tbody) return;

    tbody.innerHTML =
      list
        .map((e) => {
          const statusClass = e.status.replace(/\s+/g, '-');
          const baseNum = parseFloat(e.baseSalary || '0');
          const hourlyNum = parseFloat(e.hourlyRate || '0');
          const initials = `${(e.firstName[0] || '').toUpperCase()}${(e.lastName[0] || '').toUpperCase()}`;
          const isViewer = this.currentUser?.role === 'viewer';
          const genderShort = e.gender === 'Male' ? 'M' : e.gender === 'Female' ? 'F' : (e.gender || '—');
          return `
            <tr>
              <td>${e.hireDate}</td>
              <td><strong>${e.employeeCode}</strong></td>
              <td style="text-align:center">
                ${
                  e.idPhoto
                    ? `<img src="${e.idPhoto}" class="emp-avatar-thumb" alt="${e.firstName}" />`
                    : `<span class="emp-avatar-placeholder">${initials || '?'}</span>`
                }
              </td>
              <td><strong>${e.firstName}</strong></td>
              <td><strong>${e.lastName}</strong></td>
              <td style="text-align:center" title="${e.gender || ''}">${genderShort}</td>
              <td>${e.dateOfBirth ? e.dateOfBirth.split('T')[0] : '—'}</td>
              <td><span style="font-family:monospace;font-size:0.72rem">${e.idNumber || '—'}</span></td>
              <td><span class="emp-bank-cell" title="${e.bankAccount || ''}">${e.bankAccount || '—'}</span></td>
              <td><span class="badge badge-${statusClass}">${e.status}</span></td>
              <td class="rate-cell" data-base-emp="${e.id}" title="Click to edit base salary">${baseNum > 0 ? this.formatMoney(baseNum) : '—'}</td>
              <td class="rate-cell" data-hourly-emp="${e.id}" title="Click to edit hourly rate">${hourlyNum > 0 ? `${this.formatMoney(hourlyNum)}/h` : '—'}</td>
              <td class="doc-chk-cell" title="Medical Report">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docMedicalReport" data-doc-emp="${e.id}" ${e.docMedicalReport ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td class="doc-chk-cell" title="Medical Chart">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docMedicalChart" data-doc-emp="${e.id}" ${e.docMedicalChart ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td class="doc-chk-cell" title="Work Contract">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docWorkContract" data-doc-emp="${e.id}" ${e.docWorkContract ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td class="doc-chk-cell" title="Work Chart (Librezë Pune)">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docWorkBook" data-doc-emp="${e.id}" ${e.docWorkBook ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td class="doc-chk-cell" title="Declaration">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docDeclaration" data-doc-emp="${e.id}" ${e.docDeclaration ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td class="doc-chk-cell" title="Training">
                <input type="checkbox" class="doc-chk-input" data-doc-toggle="docTraining" data-doc-emp="${e.id}" ${e.docTraining ? 'checked' : ''} ${isViewer ? 'disabled' : ''} />
              </td>
              <td style="text-align:right">
                <div class="emp-actions">
                  <button type="button" class="btn-action btn-action-chart" data-chart-emp="${e.id}" title="View Worker Chart">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    Chart
                  </button>
                  ${
                    this.currentUser?.role === 'admin'
                      ? `<button type="button" class="btn-action btn-action-edit" data-edit-emp="${e.id}" title="Edit Employee">Edit</button>
                         <button type="button" class="btn-action btn-action-del" data-del-emp="${e.id}" title="Delete Employee">&times;</button>`
                      : ''
                  }
                </div>
              </td>
            </tr>
          `;
        })
        .join('') || `<tr><td colspan="19">No employees match your filter</td></tr>`;

    tbody.querySelectorAll('[data-doc-toggle]').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        const docKey = input.getAttribute('data-doc-toggle') || '';
        const empId = Number(input.getAttribute('data-doc-emp'));
        this.toggleEmployeeDoc(empId, docKey, input.checked);
      });
    });

    tbody.querySelectorAll('[data-chart-emp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const empId = Number(btn.getAttribute('data-chart-emp'));
        this.openWorkerChart(empId);
      });
    });

    tbody.querySelectorAll('[data-base-emp]').forEach((td) => {
      td.addEventListener('click', () => {
        const empId = Number(td.getAttribute('data-base-emp'));
        this.startInlineBaseSalaryEdit(td as HTMLElement, empId);
      });
    });

    tbody.querySelectorAll('[data-hourly-emp]').forEach((td) => {
      td.addEventListener('click', () => {
        const empId = Number(td.getAttribute('data-hourly-emp'));
        this.startInlineRateEdit(td as HTMLElement, empId);
      });
    });

    tbody.querySelectorAll('[data-edit-emp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-edit-emp'));
        const emp = this.employees.find((x) => x.id === id);
        if (!emp) return;

        (document.getElementById('emp-id') as HTMLInputElement).value = String(emp.id);
        (document.getElementById('emp-hire-date') as HTMLInputElement).value = emp.hireDate;
        (document.getElementById('emp-code') as HTMLInputElement).value = emp.employeeCode;
        (document.getElementById('emp-first-name') as HTMLInputElement).value = emp.firstName;
        (document.getElementById('emp-last-name') as HTMLInputElement).value = emp.lastName;
        (document.getElementById('emp-bank') as HTMLInputElement).value = emp.bankAccount || '';
        (document.getElementById('emp-status') as HTMLSelectElement).value = emp.status;

        const emailEl = document.getElementById('emp-email') as HTMLInputElement | null;
        if (emailEl) emailEl.value = emp.email || '';
        const phoneEl = document.getElementById('emp-phone') as HTMLInputElement | null;
        if (phoneEl) phoneEl.value = emp.phone || '';
        const posEl = document.getElementById('emp-position') as HTMLInputElement | null;
        if (posEl) posEl.value = emp.position || 'Staff';

        const genderEl = document.getElementById('emp-gender') as HTMLSelectElement | null;
        if (genderEl) genderEl.value = emp.gender || '';
        const dobEl = document.getElementById('emp-dob') as HTMLInputElement | null;
        if (dobEl) dobEl.value = emp.dateOfBirth ? emp.dateOfBirth.split('T')[0] : '';
        const idNumEl = document.getElementById('emp-id-number') as HTMLInputElement | null;
        if (idNumEl) idNumEl.value = emp.idNumber || '';

        const photoVal = document.getElementById('emp-photo-val') as HTMLInputElement | null;
        if (photoVal) photoVal.value = emp.idPhoto || '';
        const photoImg = document.getElementById('emp-photo-img') as HTMLImageElement | null;
        const photoPlaceholder = document.getElementById('emp-photo-placeholder');
        const btnRemovePhoto = document.getElementById('btn-remove-photo');
        if (emp.idPhoto) {
          if (photoImg) {
            photoImg.src = emp.idPhoto;
            photoImg.classList.remove('hidden');
          }
          if (photoPlaceholder) photoPlaceholder.classList.add('hidden');
          if (btnRemovePhoto) btnRemovePhoto.classList.remove('hidden');
        } else {
          if (photoImg) {
            photoImg.src = '';
            photoImg.classList.add('hidden');
          }
          if (photoPlaceholder) photoPlaceholder.classList.remove('hidden');
          if (btnRemovePhoto) btnRemovePhoto.classList.add('hidden');
        }

        (document.getElementById('emp-doc-med-report') as HTMLInputElement).checked = Boolean(emp.docMedicalReport);
        (document.getElementById('emp-doc-med-chart') as HTMLInputElement).checked = Boolean(emp.docMedicalChart);
        (document.getElementById('emp-doc-contract') as HTMLInputElement).checked = Boolean(emp.docWorkContract);
        (document.getElementById('emp-doc-workbook') as HTMLInputElement).checked = Boolean(emp.docWorkBook);
        (document.getElementById('emp-doc-declaration') as HTMLInputElement).checked = Boolean(emp.docDeclaration);
        (document.getElementById('emp-doc-training') as HTMLInputElement).checked = Boolean(emp.docTraining);

        const baseNum = parseFloat(emp.baseSalary || '0');
        const hourlyNum = parseFloat(emp.hourlyRate || '0');
        const isHourly = hourlyNum > 0 && baseNum === 0;
        (document.getElementById('emp-pay-type') as HTMLSelectElement).value = isHourly
          ? 'hourly'
          : 'base';
        (document.getElementById('emp-pay-amount') as HTMLInputElement).value = isHourly
          ? String(hourlyNum)
          : String(baseNum);
        const reasonInput = document.getElementById('emp-salary-reason') as HTMLInputElement | null;
        if (reasonInput) reasonInput.value = '';

        const title = document.getElementById('modal-emp-title');
        if (title) title.textContent = `Edit — ${emp.firstName} ${emp.lastName}`;
        this.openModal('modal-employee');
      });
    });

    tbody.querySelectorAll('[data-del-emp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-del-emp'));
        const emp = this.employees.find((x) => x.id === id);
        if (!emp) return;

        const msgEl = document.getElementById('confirm-del-emp-msg');
        if (msgEl) {
          msgEl.textContent = `Are you sure you want to delete ${emp.firstName} ${emp.lastName} (${emp.employeeCode})? This will permanently remove their workhours, payroll, and hourly rate records.`;
        }

        const execBtn = document.getElementById('btn-confirm-del-emp-exec');
        if (execBtn) {
          execBtn.onclick = async () => {
            await this.api(`/api/employees/${id}`, { method: 'DELETE' });
            this.closeModal('modal-confirm-delete-emp');
            this.toast(`Deleted ${emp.firstName} ${emp.lastName}`);
            await this.loadAllData();
          };
        }

        this.openModal('modal-confirm-delete-emp');
      });
    });
  }

  private async toggleEmployeeDoc(empId: number, docKey: string, checked: boolean): Promise<void> {
    if (this.currentUser?.role === 'viewer') return;
    try {
      await this.api(`/api/employees/${empId}/documents`, {
        method: 'PATCH',
        body: JSON.stringify({ [docKey]: checked }),
      });
      const emp = this.employees.find((x) => x.id === empId);
      if (emp) {
        (emp as any)[docKey] = checked;
      }
      this.toast(`Updated document status for ${emp ? emp.firstName : 'employee'}`);
      this.renderEmployees();
    } catch (err: any) {
      this.toast(err.message || 'Failed to update document status');
      this.renderEmployees();
    }
  }

  private currentWorkerChartEmpId: number | null = null;
  private isWorkerChartEditing = false;
  private empChartSchedules: WorkSchedule[] = [];
  private empChartLoadedId: number | null = null;

  private openWorkerChart(empId: number, editMode = false): void {
    const emp = this.employees.find((x) => x.id === empId);
    if (!emp) return;
    this.currentWorkerChartEmpId = emp.id;
    this.isWorkerChartEditing = editMode;

    // Fetch complete schedule history for this employee across all months if not yet loaded
    if (this.empChartLoadedId !== empId) {
      this.empChartLoadedId = empId;
      this.api<WorkSchedule[]>(`/api/schedules?employeeId=${empId}`)
        .then((allRows) => {
          this.empChartSchedules = allRows;
          if (this.currentWorkerChartEmpId === empId) {
            this.renderWorkerChartContent(emp, this.isWorkerChartEditing);
          }
        })
        .catch(() => {});
    }

    this.renderWorkerChartContent(emp, editMode);
    this.openModal('modal-worker-chart');
  }

  private getEmployeeAllSchedules(empId: number): WorkSchedule[] {
    if (this.empChartLoadedId === empId && this.empChartSchedules.length > 0) {
      return this.empChartSchedules;
    }
    const map = new Map<number, WorkSchedule>();
    this.schedules.filter((s) => s.employeeId === empId).forEach((s) => map.set(s.id, s));
    this.timeLogRecords.filter((s) => s.employeeId === empId).forEach((s) => map.set(s.id, s));
    return Array.from(map.values());
  }

  private renderWorkerChartContent(emp: Employee, editMode = false): void {
    const titleEl = document.getElementById('worker-chart-title');
    if (titleEl) {
      titleEl.textContent = editMode
        ? `Editing Worker Chart — ${emp.firstName} ${emp.lastName}`
        : `${emp.firstName} ${emp.lastName} — Worker Chart (${emp.employeeCode})`;
    }

    const editBtn = document.getElementById('btn-wc-edit-emp');
    if (editBtn) {
      editBtn.innerHTML = editMode
        ? `Cancel Edit`
        : `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Edit Chart`;
      editBtn.onclick = () => {
        this.openWorkerChart(emp.id, !this.isWorkerChartEditing);
      };
    }

    const bodyEl = document.getElementById('worker-chart-body');
    if (!bodyEl) return;

    const initials = `${(emp.firstName[0] || '').toUpperCase()}${(emp.lastName[0] || '').toUpperCase()}`;
    const statusBadgeClass = emp.status.replace(/\s+/g, '-');
    const avatarHtml = `
      <div class="wc-avatar-frame">
        ${
          emp.idPhoto
            ? `<img src="${emp.idPhoto}" id="wc-edit-photo-preview" class="wc-avatar" alt="${emp.firstName} ${emp.lastName}" />`
            : `<div id="wc-edit-photo-placeholder" class="wc-avatar-placeholder"><span>${initials || '?'}</span></div>`
        }
        <span class="badge badge-${statusBadgeClass} wc-status-dot-badge">${emp.status}</span>
      </div>
      ${
        editMode
          ? `<div class="wc-avatar-edit-overlay">
               <input type="file" id="wc-photo-file-input" accept="image/*" class="hidden" />
               <input type="hidden" id="wc-photo-data-val" value="${emp.idPhoto || ''}" />
               <button type="button" class="wc-copy-btn" id="btn-wc-change-photo">📷 Photo</button>
               <button type="button" class="wc-copy-btn" id="btn-wc-clear-photo" style="color:#f87171;border-color:rgba(239,68,68,0.3)">✕</button>
             </div>`
          : ''
      }
    `;

    const baseSal = parseFloat(emp.baseSalary || '0');
    const hourlySal = parseFloat(emp.hourlyRate || '0');
    const dobIso = emp.dateOfBirth ? String(emp.dateOfBirth).split('T')[0] : '';
    const hireIso = emp.hireDate ? String(emp.hireDate).split('T')[0] : '';

    // Calculate age
    let ageStr = '—';
    if (dobIso) {
      const birth = new Date(dobIso);
      const diff = Date.now() - birth.getTime();
      const ageDate = new Date(diff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (!isNaN(calculatedAge)) {
        ageStr = `${calculatedAge} yrs`;
      }
    }

    // Calculate tenure from hireDate
    let tenureStr = 'New Hire';
    if (hireIso) {
      const hire = new Date(hireIso);
      const now = new Date();
      const totalMonths =
        (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
      if (totalMonths >= 12) {
        const yrs = Math.floor(totalMonths / 12);
        const mos = totalMonths % 12;
        tenureStr = mos > 0 ? `${yrs}y ${mos}m` : `${yrs} yr${yrs > 1 ? 's' : ''}`;
      } else if (totalMonths > 0) {
        tenureStr = `${totalMonths} mo${totalMonths > 1 ? 's' : ''}`;
      }
    }

    // Workhours, Attendance & Leave breakdown across ALL schedules for this employee
    const empSchedules = this.getEmployeeAllSchedules(emp.id);
    let workedHours = 0;
    let presentDays = 0;
    let leaveDays = 0;
    let sickDays = 0;
    let absentDays = 0;
    let holidayDays = 0;
    let currentMonthHours = 0;

    empSchedules.forEach((s) => {
      const hrs = parseFloat(s.plannedHours || '0');
      const st = (s.shiftType || '').toLowerCase();
      const ym = (s.workDate || '').slice(0, 7);
      if (ym === this.currentMonth && st !== 'off' && st !== 'absence' && st !== 'absent') {
        currentMonthHours += hrs;
      }
      if (st === 'leave' || st === 'vacation') {
        leaveDays++;
        workedHours += hrs;
      } else if (st === 'sick' || st === 'raport') {
        sickDays++;
        workedHours += hrs;
      } else if (st === 'holiday') {
        holidayDays++;
        workedHours += hrs;
      } else if (st === 'absence' || st === 'absent') {
        absentDays++;
      } else if (st !== 'off' && hrs > 0) {
        presentDays++;
        workedHours += hrs;
      }
    });

    // Also include attendanceLogs if schedules are empty
    const empAtt = this.attendanceLogs.filter((a) => a.employeeId === emp.id);
    if (empSchedules.length === 0 && empAtt.length > 0) {
      empAtt.forEach((a) => {
        const hrs = parseFloat(a.totalHours || '0');
        workedHours += hrs;
        if (a.status === 'Absent') absentDays++;
        else presentDays++;
      });
    }

    const avgHrsPerDay = presentDays > 0 ? (workedHours / presentDays).toFixed(1) : '0.0';

    // Payroll & estimated current month earnings
    const empPayrolls = this.payrolls.filter((p) => p.employeeId === emp.id);
    const totalNetPaid = empPayrolls.reduce((sum, p) => sum + parseFloat(p.netSalary || '0'), 0);
    const latestPayroll = empPayrolls[0];
    const estimatedCurrentMonthPay =
      baseSal > 0 ? baseSal : hourlySal > 0 ? currentMonthHours * hourlySal : 0;

    // Salary / Hourly rate change history for this employee
    const empSalaryHist = this.salaryHistory.filter((h) => h.employeeId === emp.id);
    const latestSalChange = empSalaryHist[0];

    // Last 6 months hours distribution for bar chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [curY, curM] = (this.currentMonth || this.formatDateISO(new Date()).slice(0, 7))
      .split('-')
      .map(Number);
    const refDt = new Date(curY || new Date().getFullYear(), (curM || 1) - 1, 1);
    const last6Months: { key: string; label: string; hours: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(refDt.getFullYear(), refDt.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push({
        key: ym,
        label: `${monthNames[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`,
        hours: 0,
      });
    }
    empSchedules.forEach((s) => {
      const st = (s.shiftType || '').toLowerCase();
      if (st === 'off' || st === 'absence' || st === 'absent') return;
      const ym = (s.workDate || '').slice(0, 7);
      const bucket = last6Months.find((m) => m.key === ym);
      if (bucket) {
        bucket.hours += parseFloat(s.plannedHours || '0');
      }
    });
    const maxMonthHours = Math.max(160, ...last6Months.map((m) => m.hours));

    // Documents list & compliance score
    const docItems = [
      {
        key: 'docMedicalReport',
        label: 'Medical Report',
        sub: 'Raporti Mjekësor',
        ok: Boolean(emp.docMedicalReport),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      },
      {
        key: 'docMedicalChart',
        label: 'Medical Chart',
        sub: 'Kartela Mjekësore',
        ok: Boolean(emp.docMedicalChart),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M12 11v6"/><path d="M9 14h6"/></svg>`,
      },
      {
        key: 'docWorkContract',
        label: 'Work Contract',
        sub: 'Kontrata e Punës',
        ok: Boolean(emp.docWorkContract),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      },
      {
        key: 'docWorkBook',
        label: 'Work Chart (Librezë Pune)',
        sub: 'Libreza Zyrtare e Punës',
        ok: Boolean(emp.docWorkBook),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      },
      {
        key: 'docDeclaration',
        label: 'Declaration',
        sub: 'Deklarata Personale',
        ok: Boolean(emp.docDeclaration),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
      },
      {
        key: 'docTraining',
        label: 'Training Certificate',
        sub: 'Certifikata e Trajnimit',
        ok: Boolean(emp.docTraining),
        icon: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
      },
    ];

    const verifiedCount = docItems.filter((d) => d.ok).length;
    const compliancePct = Math.round((verifiedCount / docItems.length) * 100);
    const ringColor =
      compliancePct === 100 ? '#10b981' : compliancePct >= 50 ? '#38bdf8' : '#f59e0b';

    const primaryCompLabel =
      baseSal > 0
        ? this.formatMoney(baseSal)
        : hourlySal > 0
        ? `${this.formatMoney(hourlySal)}/h`
        : '0.00 Lek';
    const subCompLabel =
      baseSal > 0 && hourlySal > 0
        ? `Base + ${this.formatMoney(hourlySal)}/h`
        : baseSal > 0
        ? `Monthly Fixed • ${emp.weeklyTargetHours || 40}h/wk`
        : `Hourly Rate • ${emp.overtimeRateMultiplier || '1.50'}x OT`;

    const isAdmin = this.currentUser?.role === 'admin';
    const editableAttr =
      !editMode && isAdmin
        ? `class="wc-id-item wc-editable-hint" title="Double-click to edit"`
        : `class="wc-id-item"`;

    bodyEl.innerHTML = `
      <div class="wc-bento-layout">
        <!-- LEFT SIDEBAR: Glass Profile & Complete Personal Identity -->
        <aside class="wc-glass-panel wc-sidebar-panel">
          <div class="wc-profile-center">
            ${avatarHtml}
            ${
              editMode
                ? `
                  <div style="width:100%;display:flex;flex-direction:column;gap:0.4rem;margin-top:0.5rem">
                    <div class="wc-edit-row-2">
                      <input type="text" id="wc-in-code" class="wc-glass-input" value="${emp.employeeCode}" placeholder="Code" title="Employ Number" />
                      <select id="wc-in-status" class="wc-glass-select" title="Status">
                        <option value="Employed" ${emp.status === 'Employed' ? 'selected' : ''}>Employed</option>
                        <option value="Provisory" ${emp.status === 'Provisory' ? 'selected' : ''}>Provisory</option>
                        <option value="Active" ${emp.status === 'Active' ? 'selected' : ''}>Active</option>
                        <option value="Terminated" ${emp.status === 'Terminated' ? 'selected' : ''}>Terminated</option>
                      </select>
                    </div>
                    <div class="wc-edit-row-2">
                      <input type="text" id="wc-in-first" class="wc-glass-input" value="${emp.firstName}" placeholder="First Name" />
                      <input type="text" id="wc-in-last" class="wc-glass-input" value="${emp.lastName}" placeholder="Last Name" />
                    </div>
                    <div class="wc-edit-row-2">
                      <input type="text" id="wc-in-pos" class="wc-glass-input" value="${emp.position || 'Staff'}" placeholder="Position" />
                      <select id="wc-in-emptype" class="wc-glass-select" title="Employment Type">
                        <option value="Full-Time" ${emp.employmentType === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
                        <option value="Part-Time" ${emp.employmentType === 'Part-Time' ? 'selected' : ''}>Part-Time</option>
                        <option value="Contract" ${emp.employmentType === 'Contract' ? 'selected' : ''}>Contract</option>
                      </select>
                    </div>
                  </div>
                `
                : `
                  <span class="wc-emp-code-tag">ID ${emp.employeeCode}</span>
                  <h2 class="wc-name">${emp.firstName} ${emp.lastName}</h2>
                  <div class="wc-role-line">${emp.position || 'Staff'} &bull; ${emp.employmentType || 'Full-Time'}</div>
                  <div class="wc-meta-pills">
                    <span class="wc-meta-pill">⚧ ${emp.gender || 'Not set'}</span>
                    <span class="wc-meta-pill">🎂 ${ageStr !== '—' ? ageStr : 'DOB not set'}</span>
                    <span class="wc-meta-pill">⏱️ ${tenureStr}</span>
                  </div>
                `
            }
          </div>

          <div class="wc-identity-stack">
            <div class="wc-edit-row-2">
              <div ${editableAttr}>
                <span class="wc-label">Gender</span>
                ${
                  editMode
                    ? `<select id="wc-in-gender" class="wc-glass-select">
                         <option value="" ${!emp.gender ? 'selected' : ''}>— Select —</option>
                         <option value="Male" ${emp.gender === 'Male' ? 'selected' : ''}>Male</option>
                         <option value="Female" ${emp.gender === 'Female' ? 'selected' : ''}>Female</option>
                         <option value="Other" ${emp.gender === 'Other' ? 'selected' : ''}>Other</option>
                       </select>`
                    : `<span class="wc-value">${emp.gender || 'Not set'}</span>`
                }
              </div>

              <div ${editableAttr}>
                <span class="wc-label">Date of Birth</span>
                ${
                  editMode
                    ? `<input type="date" id="wc-in-dob" class="wc-glass-input" value="${dobIso}" />`
                    : `<span class="wc-value">${dobIso || 'Not set'}</span>`
                }
              </div>
            </div>

            <div class="wc-edit-row-2">
              <div ${editableAttr}>
                <div class="wc-id-item-top">
                  <span class="wc-label">National ID No.</span>
                  ${
                    !editMode && emp.idNumber
                      ? `<button type="button" class="wc-copy-btn" data-wc-copy="${emp.idNumber}">Copy</button>`
                      : ''
                  }
                </div>
                ${
                  editMode
                    ? `<input type="text" id="wc-in-idnum" class="wc-glass-input" value="${emp.idNumber || ''}" placeholder="e.g. I81023055A" />`
                    : `<span class="wc-value" style="font-family:monospace">${emp.idNumber || 'Not set'}</span>`
                }
              </div>

              <div ${editableAttr}>
                <span class="wc-label">Date of Hire</span>
                ${
                  editMode
                    ? `<input type="date" id="wc-in-hire" class="wc-glass-input" value="${hireIso}" />`
                    : `<span class="wc-value">${hireIso || '—'}</span>`
                }
              </div>
            </div>

            <div ${editableAttr}>
              <div class="wc-id-item-top">
                <span class="wc-label">Bank Account / IBAN</span>
                ${
                  !editMode && emp.bankAccount
                    ? `<button type="button" class="wc-copy-btn" data-wc-copy="${emp.bankAccount}">Copy</button>`
                    : ''
                }
              </div>
              ${
                editMode
                  ? `<input type="text" id="wc-in-bank" class="wc-glass-input" value="${emp.bankAccount || ''}" placeholder="IBAN / Bank Account" />`
                  : `<span class="wc-value" style="font-family:monospace;font-size:0.75rem">${emp.bankAccount || 'Not set'}</span>`
              }
            </div>

            <div ${editableAttr}>
              <span class="wc-label">Email Address</span>
              ${
                editMode
                  ? `<input type="email" id="wc-in-email" class="wc-glass-input" value="${emp.email || ''}" placeholder="Email address" />`
                  : `<span class="wc-value" style="font-size:0.74rem">${emp.email || 'Not set'}</span>`
              }
            </div>

            <div ${editableAttr}>
              <span class="wc-label">Phone Number</span>
              ${
                editMode
                  ? `<input type="text" id="wc-in-phone" class="wc-glass-input" value="${emp.phone || ''}" placeholder="+355 69 ..." />`
                  : `<span class="wc-value" style="font-size:0.76rem">${emp.phone || 'Not set'}</span>`
              }
            </div>
          </div>
        </aside>

        <!-- RIGHT WORKSPACE: KPIs, Documents Grid & Activity Analytics -->
        <div class="wc-main-workspace">
          <!-- Row 1: 4 Glass KPI Cards -->
          <div class="wc-kpi-grid">
            <div class="wc-kpi-card">
              <div class="wc-kpi-top">
                <span>Compensation</span>
                <span class="wc-kpi-icon" style="background:rgba(56,189,248,0.15);color:#38bdf8">💰</span>
              </div>
              <div class="wc-kpi-val" style="color:#38bdf8">${primaryCompLabel}</div>
              <div class="wc-kpi-sub">${subCompLabel}</div>
            </div>

            <div class="wc-kpi-card">
              <div class="wc-kpi-top">
                <span>Logged Worktime</span>
                <span class="wc-kpi-icon" style="background:rgba(16,185,129,0.15);color:#34d399">⏱️</span>
              </div>
              <div class="wc-kpi-val" style="color:#34d399">${workedHours.toFixed(1)} hrs</div>
              <div class="wc-kpi-sub">${presentDays} shifts &bull;This mo: ${currentMonthHours.toFixed(1)}h (Avg ${avgHrsPerDay}h/d)</div>
            </div>

            <div class="wc-kpi-card">
              <div class="wc-kpi-top">
                <span>Leaves &amp; Absences</span>
                <span class="wc-kpi-icon" style="background:rgba(245,158,11,0.15);color:#fbbf24">📋</span>
              </div>
              <div class="wc-kpi-val">${leaveDays + sickDays + absentDays + holidayDays} days</div>
              <div class="wc-kpi-sub">${leaveDays} Leave &bull; ${sickDays} Sick &bull; ${absentDays} Absence</div>
            </div>

            <div class="wc-kpi-card">
              <div class="wc-kpi-top">
                <span>${totalNetPaid > 0 ? 'Cumulative Net Paid' : 'Est. Monthly Pay'}</span>
                <span class="wc-kpi-icon" style="background:rgba(168,85,247,0.15);color:#c084fc">🏦</span>
              </div>
              <div class="wc-kpi-val">${
                totalNetPaid > 0
                  ? this.formatMoney(totalNetPaid)
                  : estimatedCurrentMonthPay > 0
                  ? this.formatMoney(estimatedCurrentMonthPay)
                  : '0.00 Lek'
              }</div>
              <div class="wc-kpi-sub">${
                latestPayroll
                  ? `Last: ${latestPayroll.payPeriod} (${latestPayroll.paymentStatus})`
                  : `Current month (${this.currentMonth}) est.`
              }</div>
            </div>
          </div>

          <!-- Row 2: Official Documents Verification Matrix -->
          <div class="wc-glass-panel">
            <div class="wc-section-header">
              <h4 class="wc-section-title">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Official Documents Checklist (Verifikimi i Dokumenteve)
              </h4>
              <div class="wc-compliance-pill">
                <span style="color:${ringColor}">${verifiedCount}/${docItems.length} Verified (${compliancePct}%)</span>
                <div class="wc-mini-progress">
                  <div class="wc-mini-progress-fill" style="width:${compliancePct}%;background:${ringColor}"></div>
                </div>
              </div>
            </div>
            <div class="wc-docs-grid">
              ${docItems
                .map(
                  (d) => `
                  <div class="wc-doc-card ${d.ok ? 'is-verified' : ''}" data-wc-doc-toggle="${d.key}" title="Click to toggle ${d.label}">
                    <div class="wc-doc-left">
                      <div class="wc-doc-icon-box">${d.icon}</div>
                      <div class="wc-doc-titles">
                        <span class="wc-doc-name">${d.label}</span>
                        <span class="wc-doc-sub">${d.sub}</span>
                      </div>
                    </div>
                    <span class="wc-doc-status-badge ${d.ok ? 'wc-doc-ok' : 'wc-doc-missing'}">
                      ${d.ok ? '✓ Verified' : '✗ Missing'}
                    </span>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>

          <!-- Row 3: 6-Month Workhours Chart & Financial Setup -->
          <div class="wc-bottom-split">
            <div class="wc-glass-panel" style="display:flex;flex-direction:column;justify-content:space-between">
              <div class="wc-section-header" style="margin-bottom:0.5rem">
                <h4 class="wc-section-title">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  6-Month Workhours Activity
                </h4>
                <span style="font-size:0.68rem;color:var(--text-muted)">Target: ${(emp.weeklyTargetHours || 40) * 4}h/mo</span>
              </div>

              <div class="wc-bars-wrap">
                ${last6Months
                  .map((m) => {
                    const pct = Math.min(100, Math.round((m.hours / maxMonthHours) * 100));
                    return `
                      <div class="wc-bar-col" title="${m.label}: ${m.hours.toFixed(1)} hrs">
                        <span class="wc-bar-val">${m.hours > 0 ? `${Math.round(m.hours)}h` : '0h'}</span>
                        <div class="wc-bar-track">
                          <div class="wc-bar-fill" style="height:${Math.max(m.hours > 0 ? 12 : 4, pct)}%"></div>
                        </div>
                        <span class="wc-bar-lbl">${m.label}</span>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>

            <div class="wc-glass-panel" style="display:flex;flex-direction:column;justify-content:space-between">
              <div>
                <div class="wc-section-header" style="margin-bottom:0.6rem">
                  <h4 class="wc-section-title">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    Contract &amp; Rate Terms
                  </h4>
                  ${
                    editMode
                      ? `<button type="button" class="btn btn-primary btn-xs" id="btn-wc-save-all">💾 Save Changes</button>`
                      : ''
                  }
                </div>
                <div class="wc-comp-grid">
                  <div class="wc-comp-box ${!editMode && isAdmin ? 'wc-editable-hint' : ''}">
                    <span class="wc-label">Base Salary (Lek)</span>
                    ${
                      editMode
                        ? `<input type="number" step="0.01" id="wc-in-base" class="wc-glass-input" value="${baseSal}" />`
                        : `<span class="wc-value" style="color:#34d399">${this.formatMoney(baseSal)}</span>`
                    }
                  </div>
                  <div class="wc-comp-box ${!editMode && isAdmin ? 'wc-editable-hint' : ''}">
                    <span class="wc-label">Hourly Rate (Lek/h)</span>
                    ${
                      editMode
                        ? `<input type="number" step="0.01" id="wc-in-hourly" class="wc-glass-input" value="${hourlySal}" />`
                        : `<span class="wc-value" style="color:#38bdf8">${this.formatMoney(hourlySal)}/h</span>`
                    }
                  </div>
                  <div class="wc-comp-box ${!editMode && isAdmin ? 'wc-editable-hint' : ''}">
                    <span class="wc-label">Weekly Target</span>
                    ${
                      editMode
                        ? `<input type="number" id="wc-in-weekly" class="wc-glass-input" value="${emp.weeklyTargetHours || 40}" />`
                        : `<span class="wc-value">${emp.weeklyTargetHours || 40} hrs/wk</span>`
                    }
                  </div>
                  <div class="wc-comp-box ${!editMode && isAdmin ? 'wc-editable-hint' : ''}">
                    <span class="wc-label">Overtime &amp; Tax</span>
                    ${
                      editMode
                        ? `<input type="number" step="0.1" id="wc-in-ot" class="wc-glass-input" value="${emp.overtimeRateMultiplier || '1.50'}" />`
                        : `<span class="wc-value">${emp.overtimeRateMultiplier || '1.50'}x &bull; ${emp.taxRatePercent || '15.00'}%</span>`
                    }
                  </div>
                </div>
                ${
                  latestSalChange
                    ? `<div style="margin-top:0.45rem;font-size:0.68rem;color:var(--text-muted)">
                         Last rate change: <strong>${this.formatMoney(parseFloat(latestSalChange.previousSalary))} → ${this.formatMoney(parseFloat(latestSalChange.newSalary))}</strong> (${latestSalChange.effectiveDate} • ${latestSalChange.reason})
                       </div>`
                    : ''
                }
              </div>

              <div class="wc-signatures">
                <div class="wc-sig-box">
                  <span class="wc-sig-title">Employee Signature</span>
                  <div class="wc-sig-line"></div>
                </div>
                <div class="wc-sig-box">
                  <span class="wc-sig-title">HR Director Stamp</span>
                  <div class="wc-sig-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Double-click any editable field in View Mode to enter In-Chart Edit Mode
    if (!editMode && isAdmin) {
      bodyEl.querySelectorAll('.wc-editable-hint').forEach((el) => {
        el.addEventListener('dblclick', () => {
          this.openWorkerChart(emp.id, true);
        });
      });
    }

    // Photo change/clear handlers in In-Chart Edit Mode
    if (editMode) {
      const photoFileIn = document.getElementById('wc-photo-file-input') as HTMLInputElement | null;
      const photoValIn = document.getElementById('wc-photo-data-val') as HTMLInputElement | null;

      document.getElementById('btn-wc-change-photo')?.addEventListener('click', () => {
        photoFileIn?.click();
      });

      photoFileIn?.addEventListener('change', () => {
        const file = photoFileIn.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
          this.toast('Image size must be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target?.result as string;
          if (photoValIn) photoValIn.value = dataUrl;
          const frame = bodyEl.querySelector('.wc-avatar-frame');
          if (frame) {
            frame.innerHTML = `<img src="${dataUrl}" class="wc-avatar" alt="Preview" /><span class="badge badge-${statusBadgeClass} wc-status-dot-badge">${emp.status}</span>`;
          }
        };
        reader.readAsDataURL(file);
      });

      document.getElementById('btn-wc-clear-photo')?.addEventListener('click', () => {
        if (photoValIn) photoValIn.value = '';
        const frame = bodyEl.querySelector('.wc-avatar-frame');
        if (frame) {
          frame.innerHTML = `<div class="wc-avatar-placeholder"><span>${initials || '?'}</span></div><span class="badge badge-${statusBadgeClass} wc-status-dot-badge">${emp.status}</span>`;
        }
      });

      document.getElementById('btn-wc-save-all')?.addEventListener('click', async () => {
        const payload = {
          employeeCode: (document.getElementById('wc-in-code') as HTMLInputElement)?.value.trim() || emp.employeeCode,
          firstName: (document.getElementById('wc-in-first') as HTMLInputElement)?.value.trim() || emp.firstName,
          lastName: (document.getElementById('wc-in-last') as HTMLInputElement)?.value.trim() || emp.lastName,
          position: (document.getElementById('wc-in-pos') as HTMLInputElement)?.value.trim() || 'Staff',
          employmentType: (document.getElementById('wc-in-emptype') as HTMLSelectElement)?.value || emp.employmentType || 'Full-Time',
          status: (document.getElementById('wc-in-status') as HTMLSelectElement)?.value || emp.status,
          gender: (document.getElementById('wc-in-gender') as HTMLSelectElement)?.value || null,
          idNumber: (document.getElementById('wc-in-idnum') as HTMLInputElement)?.value.trim() || null,
          dateOfBirth: (document.getElementById('wc-in-dob') as HTMLInputElement)?.value || null,
          bankAccount: (document.getElementById('wc-in-bank') as HTMLInputElement)?.value.trim() || null,
          hireDate: (document.getElementById('wc-in-hire') as HTMLInputElement)?.value || emp.hireDate,
          email: (document.getElementById('wc-in-email') as HTMLInputElement)?.value.trim() || emp.email,
          phone: (document.getElementById('wc-in-phone') as HTMLInputElement)?.value.trim() || null,
          idPhoto: photoValIn ? photoValIn.value || null : emp.idPhoto,
          baseSalary: Number((document.getElementById('wc-in-base') as HTMLInputElement)?.value || 0).toFixed(2),
          hourlyRate: Number((document.getElementById('wc-in-hourly') as HTMLInputElement)?.value || 0).toFixed(2),
          weeklyTargetHours: Number((document.getElementById('wc-in-weekly') as HTMLInputElement)?.value || 40),
          overtimeRateMultiplier: Number((document.getElementById('wc-in-ot') as HTMLInputElement)?.value || 1.5).toFixed(2),
          docMedicalReport: Boolean(emp.docMedicalReport),
          docMedicalChart: Boolean(emp.docMedicalChart),
          docWorkContract: Boolean(emp.docWorkContract),
          docWorkBook: Boolean(emp.docWorkBook),
          docDeclaration: Boolean(emp.docDeclaration),
          docTraining: Boolean(emp.docTraining),
        };

        try {
          await this.api(`/api/employees/${emp.id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          });
          this.toast('Worker Chart updated');
          await this.loadAllData();
          this.openWorkerChart(emp.id, false);
        } catch (err: any) {
          this.toast(err.message || 'Failed to update Worker Chart');
        }
      });
    }

    // Bind interactive document toggle directly inside the Worker Chart
    bodyEl.querySelectorAll('[data-wc-doc-toggle]').forEach((card) => {
      card.addEventListener('click', async () => {
        if (this.currentUser?.role === 'viewer') return;
        const docKey = card.getAttribute('data-wc-doc-toggle') || '';
        if (!docKey) return;
        const nextVal = !Boolean((emp as any)[docKey]);
        await this.toggleEmployeeDoc(emp.id, docKey, nextVal);
        this.openWorkerChart(emp.id, this.isWorkerChartEditing);
      });
    });

    // Bind copy buttons for ID Number / Bank IBAN
    bodyEl.querySelectorAll('[data-wc-copy]').forEach((btn) => {
      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const text = btn.getAttribute('data-wc-copy') || '';
        if (text && navigator.clipboard) {
          navigator.clipboard.writeText(text);
          this.toast(`Copied: ${text}`);
        }
      });
    });
  }

  private printWorkerChart(empId: number | null): void {
    if (!empId) return;
    const emp = this.employees.find((x) => x.id === empId);
    if (!emp) return;

    const win = window.open('', '_blank');
    if (!win) {
      this.toast('Please allow pop-ups to print the Worker Chart');
      return;
    }

    const baseSal = parseFloat(emp.baseSalary || '0');
    const hourlySal = parseFloat(emp.hourlyRate || '0');
    const dobFormatted = emp.dateOfBirth ? emp.dateOfBirth.split('T')[0] : '—';

    let ageStr = '—';
    if (emp.dateOfBirth) {
      const birth = new Date(emp.dateOfBirth);
      const diff = Date.now() - birth.getTime();
      const calculatedAge = Math.abs(new Date(diff).getUTCFullYear() - 1970);
      if (!isNaN(calculatedAge)) ageStr = `${calculatedAge} years`;
    }

    let tenureStr = 'New Hire';
    if (emp.hireDate) {
      const hire = new Date(emp.hireDate);
      const now = new Date();
      const totalMonths =
        (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
      if (totalMonths >= 12) {
        const yrs = Math.floor(totalMonths / 12);
        const mos = totalMonths % 12;
        tenureStr = mos > 0 ? `${yrs} yrs, ${mos} mos` : `${yrs} yrs`;
      } else if (totalMonths > 0) {
        tenureStr = `${totalMonths} mos`;
      }
    }

    const empSchedules = this.getEmployeeAllSchedules(emp.id);
    let workedHours = 0;
    let presentDays = 0;
    let leaveDays = 0;
    let sickDays = 0;
    let absentDays = 0;

    empSchedules.forEach((s) => {
      const hrs = parseFloat(s.plannedHours || '0');
      const st = (s.shiftType || '').toLowerCase();
      if (st === 'leave' || st === 'vacation') {
        leaveDays++;
        workedHours += hrs;
      } else if (st === 'sick' || st === 'raport') {
        sickDays++;
        workedHours += hrs;
      } else if (st === 'holiday') {
        workedHours += hrs;
      } else if (st === 'absence' || st === 'absent') {
        absentDays++;
      } else if (st !== 'off' && hrs > 0) {
        presentDays++;
        workedHours += hrs;
      }
    });

    const avgHrsPerDay = presentDays > 0 ? (workedHours / presentDays).toFixed(1) : '0.0';
    const empPayrolls = this.payrolls.filter((p) => p.employeeId === emp.id);
    const totalNetPaid = empPayrolls.reduce((sum, p) => sum + parseFloat(p.netSalary || '0'), 0);
    const latestPayroll = empPayrolls[0];

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [curY, curM] = (this.currentMonth || this.formatDateISO(new Date()).slice(0, 7))
      .split('-')
      .map(Number);
    const refDt = new Date(curY || new Date().getFullYear(), (curM || 1) - 1, 1);
    const last6Months: { key: string; label: string; hours: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(refDt.getFullYear(), refDt.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      last6Months.push({
        key: ym,
        label: `${monthNames[d.getMonth()]} ${d.getFullYear()}`,
        hours: 0,
      });
    }
    empSchedules.forEach((s) => {
      const st = (s.shiftType || '').toLowerCase();
      if (st === 'off' || st === 'absence' || st === 'absent') return;
      const ym = (s.workDate || '').slice(0, 7);
      const bucket = last6Months.find((m) => m.key === ym);
      if (bucket) bucket.hours += parseFloat(s.plannedHours || '0');
    });

    const docs = [
      { label: 'Medical Report (Raporti Mjekësor)', ok: Boolean(emp.docMedicalReport) },
      { label: 'Medical Chart (Kartela Mjekësore)', ok: Boolean(emp.docMedicalChart) },
      { label: 'Work Contract (Kontrata e Punës)', ok: Boolean(emp.docWorkContract) },
      { label: 'Work Chart / Librezë Pune', ok: Boolean(emp.docWorkBook) },
      { label: 'Declaration (Deklarata)', ok: Boolean(emp.docDeclaration) },
      { label: 'Training Certificate (Trajnimi)', ok: Boolean(emp.docTraining) },
    ];
    const verifiedCount = docs.filter((d) => d.ok).length;

    const photoHtml = emp.idPhoto
      ? `<img src="${emp.idPhoto}" class="emp-photo" alt="${emp.firstName}" />`
      : `<div class="emp-photo-box">No Photo</div>`;

    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Worker Chart - ${emp.firstName} ${emp.lastName} (${emp.employeeCode})</title>
  <style>
    @page { size: A4 portrait; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      font-size: 11px;
      line-height: 1.4;
      margin: 0;
      padding: 0;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #111827;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .header-left h1 {
      font-size: 18px;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .header-left p {
      margin: 2px 0;
      font-size: 11px;
      color: #374151;
    }
    .emp-photo {
      width: 76px;
      height: 76px;
      object-fit: cover;
      border: 1px solid #111827;
      border-radius: 4px;
    }
    .emp-photo-box {
      width: 76px;
      height: 76px;
      border: 1px solid #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: #6b7280;
      background: #f9fafb;
    }
    h2 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      padding: 5px 8px;
      margin: 12px 0 6px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 6px;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 5px 8px;
      text-align: left;
      vertical-align: middle;
    }
    th {
      background: #f9fafb;
      font-weight: 700;
      width: 22%;
      color: #374151;
    }
    td {
      width: 28%;
    }
    .center-table th, .center-table td {
      width: auto;
      text-align: center;
    }
    .ok { font-weight: bold; color: #065f46; }
    .missing { color: #991b1b; }
    .signatures {
      margin-top: 32px;
      display: flex;
      justify-content: space-between;
      gap: 40px;
    }
    .sig-col {
      flex: 1;
      text-align: center;
    }
    .sig-line {
      border-bottom: 1px solid #111827;
      height: 36px;
      margin-bottom: 6px;
    }
    .footer {
      margin-top: 22px;
      border-top: 1px solid #d1d5db;
      padding-top: 6px;
      font-size: 9px;
      color: #6b7280;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>Worker Chart / Kartela e Punëtorit</h1>
      <p><strong>Employee:</strong> ${emp.firstName} ${emp.lastName} &nbsp;|&nbsp; <strong>Code:</strong> ${emp.employeeCode} &nbsp;|&nbsp; <strong>Status:</strong> ${emp.status}</p>
      <p><strong>Position:</strong> ${emp.position || 'Staff'} (${emp.employmentType || 'Full-Time'}) &nbsp;|&nbsp; <strong>Date Generated:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    <div>${photoHtml}</div>
  </div>

  <h2>1. Personal &amp; Contact Information</h2>
  <table>
    <tbody>
      <tr>
        <th>First Name</th>
        <td><strong>${emp.firstName}</strong></td>
        <th>Last Name</th>
        <td><strong>${emp.lastName}</strong></td>
      </tr>
      <tr>
        <th>Gender</th>
        <td>${emp.gender || '—'}</td>
        <th>Date of Birth / Age</th>
        <td>${dobFormatted} (${ageStr})</td>
      </tr>
      <tr>
        <th>National ID / Passport</th>
        <td style="font-family:monospace"><strong>${emp.idNumber || '—'}</strong></td>
        <th>Phone Number</th>
        <td>${emp.phone || '—'}</td>
      </tr>
      <tr>
        <th>Email Address</th>
        <td colspan="3">${emp.email || '—'}</td>
      </tr>
    </tbody>
  </table>

  <h2>2. Employment &amp; Compensation Details</h2>
  <table>
    <tbody>
      <tr>
        <th>Employee Code</th>
        <td><strong>${emp.employeeCode}</strong></td>
        <th>Employment Status</th>
        <td><strong>${emp.status}</strong></td>
      </tr>
      <tr>
        <th>Position / Role</th>
        <td>${emp.position || 'Staff'}</td>
        <th>Employment Type</th>
        <td>${emp.employmentType || 'Full-Time'}</td>
      </tr>
      <tr>
        <th>Date of Hire</th>
        <td>${emp.hireDate}</td>
        <th>Total Tenure</th>
        <td>${tenureStr}</td>
      </tr>
      <tr>
        <th>Base Monthly Salary</th>
        <td><strong>${baseSal > 0 ? this.formatMoney(baseSal) : '—'}</strong></td>
        <th>Hourly Pay Rate</th>
        <td><strong>${hourlySal > 0 ? `${this.formatMoney(hourlySal)} / hr` : '—'}</strong></td>
      </tr>
      <tr>
        <th>Weekly Target Hours</th>
        <td>${emp.weeklyTargetHours || 40} hrs / week</td>
        <th>Overtime Multiplier</th>
        <td>${emp.overtimeRateMultiplier || '1.50'}x (Tax: ${emp.taxRatePercent || '15.00'}%)</td>
      </tr>
      <tr>
        <th>Bank Account (IBAN)</th>
        <td colspan="3" style="font-family:monospace">${emp.bankAccount || '—'}</td>
      </tr>
    </tbody>
  </table>

  <h2>3. Official Documents Verification (${verifiedCount} / ${docs.length} Completed)</h2>
  <table>
    <tbody>
      <tr>
        <th>${docs[0].label}</th>
        <td class="${docs[0].ok ? 'ok' : 'missing'}">${docs[0].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
        <th>${docs[1].label}</th>
        <td class="${docs[1].ok ? 'ok' : 'missing'}">${docs[1].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
      </tr>
      <tr>
        <th>${docs[2].label}</th>
        <td class="${docs[2].ok ? 'ok' : 'missing'}">${docs[2].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
        <th>${docs[3].label}</th>
        <td class="${docs[3].ok ? 'ok' : 'missing'}">${docs[3].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
      </tr>
      <tr>
        <th>${docs[4].label}</th>
        <td class="${docs[4].ok ? 'ok' : 'missing'}">${docs[4].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
        <th>${docs[5].label}</th>
        <td class="${docs[5].ok ? 'ok' : 'missing'}">${docs[5].ok ? '✓ YES (Verified)' : '✗ NO (Missing)'}</td>
      </tr>
    </tbody>
  </table>

  <h2>4. Workhours, Attendance &amp; Payroll Summary</h2>
  <table>
    <tbody>
      <tr>
        <th>Total Worked Hours</th>
        <td><strong>${workedHours.toFixed(1)} hrs</strong> (${presentDays} shifts)</td>
        <th>Average Daily Hours</th>
        <td>${avgHrsPerDay} hrs / day</td>
      </tr>
      <tr>
        <th>Leave / Vacation Days</th>
        <td>${leaveDays} days</td>
        <th>Sick / Medical Days</th>
        <td>${sickDays} days</td>
      </tr>
      <tr>
        <th>Unexcused Absences</th>
        <td>${absentDays} days</td>
        <th>Payroll Runs Processed</th>
        <td>${empPayrolls.length} runs ${latestPayroll ? `(Last: ${latestPayroll.payPeriod} - ${latestPayroll.paymentStatus})` : ''}</td>
      </tr>
      <tr>
        <th>Cumulative Net Paid</th>
        <td colspan="3"><strong>${totalNetPaid > 0 ? this.formatMoney(totalNetPaid) : '0.00 Lek'}</strong></td>
      </tr>
    </tbody>
  </table>

  <h2>5. Last 6 Months Workhours History</h2>
  <table class="center-table">
    <thead>
      <tr>
        ${last6Months.map((m) => `<th>${m.label}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr>
        ${last6Months.map((m) => `<td><strong>${m.hours.toFixed(1)} hrs</strong></td>`).join('')}
      </tr>
    </tbody>
  </table>

  <div class="signatures">
    <div class="sig-col">
      <div class="sig-line"></div>
      <strong>Employee Signature</strong><br/>
      <span>(${emp.firstName} ${emp.lastName})</span>
    </div>
    <div class="sig-col">
      <div class="sig-line"></div>
      <strong>HR Administrator / Authorized Stamp</strong><br/>
      <span>Date: ____ / ____ / ________</span>
    </div>
  </div>

  <div class="footer">
    <span>Official Employee Dossier — ${emp.employeeCode} (${emp.firstName} ${emp.lastName})</span>
    <span>Page 1 of 1</span>
  </div>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`);
    win.document.close();
  }

  private startInlineBaseSalaryEdit(td: HTMLElement, empId: number): void {
    if (this.currentUser?.role === 'viewer') return;
    if (td.querySelector('input.cell-inline-input')) return;
    const emp = this.employees.find((x) => x.id === empId);
    if (!emp) return;

    const originalHtml = td.innerHTML;
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'decimal';
    input.className = 'cell-inline-input';
    input.style.maxWidth = '85px';
    input.value = String(parseFloat(emp.baseSalary || '0'));

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    let done = false;
    const commit = async () => {
      if (done) return;
      done = true;
      const raw = input.value.trim().replace(',', '.');
      const num = parseFloat(raw);
      if (isNaN(num) || num < 0) {
        td.innerHTML = originalHtml;
        return;
      }
      try {
        await this.api(`/api/employees/${empId}/base-salary`, {
          method: 'PATCH',
          body: JSON.stringify({
            baseSalary: num,
            reason: 'Inline Base Salary Edit',
          }),
        });
        this.toast(`Base salary updated & registered in Salary Records`);
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
        td.innerHTML = originalHtml;
      }
    };

    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        ev.preventDefault();
        commit();
      } else if (ev.key === 'Escape') {
        done = true;
        td.innerHTML = originalHtml;
      }
    });
    input.addEventListener('blur', commit);
    input.addEventListener('click', (ev) => ev.stopPropagation());
  }

  // --- Base Salary Records Rendering ---
  private renderSalaryHistory(): void {
    const searchVal = (
      (document.getElementById('salary-history-search') as HTMLInputElement | null)?.value || ''
    ).toLowerCase();
    const empFilter = (
      document.getElementById('salary-history-emp-filter') as HTMLSelectElement | null
    )?.value;

    const list = this.salaryHistory.filter((rec) => {
      if (empFilter && String(rec.employeeId) !== empFilter) return false;
      if (searchVal) {
        const emp = this.employees.find((e) => e.id === rec.employeeId);
        const hay = `${rec.effectiveDate} ${emp?.employeeCode || ''} ${emp?.firstName || ''} ${emp?.lastName || ''} ${rec.reason}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });

    const tbody = document.getElementById('salary-history-tbody');
    if (!tbody) return;

    tbody.innerHTML =
      list
        .map((rec) => {
          const emp = this.employees.find((e) => e.id === rec.employeeId);
          const ts = rec.createdAt ? new Date(rec.createdAt).toLocaleString() : rec.effectiveDate;
          return `
            <tr>
              <td style="font-size:0.78rem;color:#94a3b8">${ts}</td>
              <td><strong>${emp?.firstName || '—'}</strong></td>
              <td><strong>${emp?.lastName || '—'}</strong></td>
              <td style="font-weight:700;color:#34d399">${this.formatMoney(rec.newSalary)}/h</td>
            </tr>
          `;
        })
        .join('') || `<tr><td colspan="4">No hourly rate records found</td></tr>`;
  }

  // --- Form Submissions ---
  private bindForms(): void {
    // Settings Form
    document.getElementById('form-settings')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedUnit =
        (document.getElementById('set-unit-minutes') as HTMLInputElement)?.checked
          ? 'minutes'
          : 'hours';
      const payload = {
        timeUnit: selectedUnit,
        compactMode:
          (document.getElementById('set-compact-mode') as HTMLSelectElement).value === 'true',
        standardDayMinutes: Number(
          (document.getElementById('set-std-minutes') as HTMLInputElement).value || 480
        ),
        defaultShiftStart: (document.getElementById('set-shift-start') as HTMLInputElement).value,
        defaultShiftEnd: (document.getElementById('set-shift-end') as HTMLInputElement).value,
        defaultBreakMinutes: Number(
          (document.getElementById('set-break-minutes') as HTMLInputElement).value || 60
        ),
        sickPayPercent: Number(
          (document.getElementById('set-sick-percent') as HTMLInputElement).value ?? 80
        ),
        socialSecurityPercent:
          (document.getElementById('set-social-sec') as HTMLInputElement).value || '9.5',
        medicalSecurityPercent:
          (document.getElementById('set-medical-sec') as HTMLInputElement).value || '1.7',
        incomeTaxPercent:
          (document.getElementById('set-income-tax') as HTMLInputElement).value || '13.0',
        exportHeader:
          (document.getElementById('set-export-header') as HTMLInputElement | null)?.value ||
          'PulseHR Workforce Management',
        exportFooter:
          (document.getElementById('set-export-footer') as HTMLInputElement | null)?.value ||
          'Confidential • Generated by PulseHR',
      };

      try {
        this.settings = await this.api<HRSettings>('/api/settings', {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        this.applySettingsToUI();
        this.renderAll();
        this.toast(`Settings saved (Time unit: ${selectedUnit.toUpperCase()})`);
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // Employee Form
    document.getElementById('form-employee')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = (document.getElementById('emp-id') as HTMLInputElement).value;
      const payType = (document.getElementById('emp-pay-type') as HTMLSelectElement).value;
      const payAmt =
        parseFloat(
          ((document.getElementById('emp-pay-amount') as HTMLInputElement).value || '0').replace(
            ',',
            '.'
          )
        ) || 0;
      const payload = {
        hireDate: (document.getElementById('emp-hire-date') as HTMLInputElement).value,
        employeeCode: (document.getElementById('emp-code') as HTMLInputElement).value,
        firstName: (document.getElementById('emp-first-name') as HTMLInputElement).value,
        lastName: (document.getElementById('emp-last-name') as HTMLInputElement).value,
        email: (document.getElementById('emp-email') as HTMLInputElement | null)?.value.trim() || '',
        phone: (document.getElementById('emp-phone') as HTMLInputElement | null)?.value.trim() || null,
        position: (document.getElementById('emp-position') as HTMLInputElement | null)?.value.trim() || 'Staff',
        bankAccount: (document.getElementById('emp-bank') as HTMLInputElement).value,
        status: (document.getElementById('emp-status') as HTMLSelectElement).value,
        gender: (document.getElementById('emp-gender') as HTMLSelectElement | null)?.value || null,
        dateOfBirth: (document.getElementById('emp-dob') as HTMLInputElement | null)?.value || null,
        idNumber: (document.getElementById('emp-id-number') as HTMLInputElement | null)?.value || null,
        idPhoto: (document.getElementById('emp-photo-val') as HTMLInputElement | null)?.value || null,
        docMedicalReport: Boolean((document.getElementById('emp-doc-med-report') as HTMLInputElement | null)?.checked),
        docMedicalChart: Boolean((document.getElementById('emp-doc-med-chart') as HTMLInputElement | null)?.checked),
        docWorkContract: Boolean((document.getElementById('emp-doc-contract') as HTMLInputElement | null)?.checked),
        docWorkBook: Boolean((document.getElementById('emp-doc-workbook') as HTMLInputElement | null)?.checked),
        docDeclaration: Boolean((document.getElementById('emp-doc-declaration') as HTMLInputElement | null)?.checked),
        docTraining: Boolean((document.getElementById('emp-doc-training') as HTMLInputElement | null)?.checked),
        baseSalary: payType === 'base' ? payAmt.toFixed(2) : '0.00',
        hourlyRate: payType === 'hourly' ? payAmt.toFixed(2) : '0.00',
        salaryChangeReason:
          (document.getElementById('emp-salary-reason') as HTMLInputElement | null)?.value || '',
      };

      try {
        if (id) {
          await this.api(`/api/employees/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          });
          this.toast('Employee updated');
        } else {
          await this.api('/api/employees', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          this.toast('Employee created');
        }
        this.closeModal('modal-employee');
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // Schedule Form
    document.getElementById('form-schedule')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        employeeId: (document.getElementById('sched-employee') as HTMLSelectElement).value,
        workDate: (document.getElementById('sched-date') as HTMLInputElement).value,
        shiftType: (document.getElementById('sched-type') as HTMLSelectElement).value,
        startTime: (document.getElementById('sched-start') as HTMLInputElement).value,
        endTime: (document.getElementById('sched-end') as HTMLInputElement).value,
        breakMinutes: (document.getElementById('sched-break') as HTMLInputElement).value,
        notes: (document.getElementById('sched-notes') as HTMLInputElement).value,
      };

      try {
        await this.api('/api/schedules', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        this.closeModal('modal-schedule');
        this.toast('Shift saved');
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // Attendance Form
    document.getElementById('form-attendance')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const directVal = (document.getElementById('att-direct-duration') as HTMLInputElement).value;
      let directMinutes: number | undefined;
      if (directVal !== '') {
        const parsed = parseFloat(directVal);
        directMinutes = this.settings.timeUnit === 'minutes' ? parsed : parsed * 60;
      }

      const payload = {
        employeeId: (document.getElementById('att-employee') as HTMLSelectElement).value,
        workDate: (document.getElementById('att-date') as HTMLInputElement).value,
        status: (document.getElementById('att-status') as HTMLSelectElement).value,
        clockIn: (document.getElementById('att-in') as HTMLInputElement).value,
        clockOut: (document.getElementById('att-out') as HTMLInputElement).value,
        breakMinutes: (document.getElementById('att-break') as HTMLInputElement).value,
        directMinutes,
        notes: (document.getElementById('att-notes') as HTMLInputElement).value,
      };

      try {
        await this.api('/api/attendance', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        this.closeModal('modal-attendance');
        this.toast('Time log saved');
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // Payroll Form
    document.getElementById('form-payroll')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        employeeId: (document.getElementById('pay-employee') as HTMLSelectElement).value,
        payPeriod: (document.getElementById('pay-period') as HTMLInputElement).value,
        basePay: (document.getElementById('pay-base') as HTMLInputElement).value,
        regularHoursWorked: (document.getElementById('pay-reg-hours') as HTMLInputElement).value,
        overtimeHoursWorked: (document.getElementById('pay-ot-hours') as HTMLInputElement).value,
        bonuses: (document.getElementById('pay-bonuses') as HTMLInputElement).value,
        allowances: (document.getElementById('pay-allowances') as HTMLInputElement).value,
        deductions: (document.getElementById('pay-deductions') as HTMLInputElement).value,
        paymentStatus: (document.getElementById('pay-status') as HTMLSelectElement).value,
        notes: (document.getElementById('pay-notes') as HTMLInputElement).value,
      };

      try {
        await this.api('/api/payrolls', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        this.closeModal('modal-payroll');
        this.toast('Payroll record saved');
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // User Form (Create / Edit Username & Password)
    document.getElementById('form-user')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = (document.getElementById('edit-user-id') as HTMLInputElement).value;
      const username = (document.getElementById('edit-user-username') as HTMLInputElement).value.trim();
      const fullName = (document.getElementById('edit-user-fullname') as HTMLInputElement).value.trim();
      const password = (document.getElementById('edit-user-password') as HTMLInputElement).value;
      const role = (document.getElementById('edit-user-role') as HTMLSelectElement).value;
      const status = (document.getElementById('edit-user-status') as HTMLSelectElement).value;

      if (!username) {
        this.toast('Username is required');
        return;
      }

      if (!id && (!password || password.trim().length < 4)) {
        this.toast('Password must be at least 4 characters');
        return;
      }

      if (password && password.trim().length > 0 && password.trim().length < 4) {
        this.toast('Password must be at least 4 characters');
        return;
      }

      const payload: any = { username, fullName, role, status };
      if (password && password.trim().length > 0) payload.password = password.trim();

      try {
        if (id) {
          await this.api(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
          });
          this.toast('User updated successfully');
        } else {
          await this.api('/api/users', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          this.toast('User created successfully');
        }
        this.closeModal('modal-user');
        await this.loadUsers();
      } catch (err: any) {
        this.toast(err.message);
      }
    });
  }

  // --- Filters & Special Buttons ---
  private bindFiltersAndActions(): void {
    // Monthly / Weekly toggle
    const setMode = (mode: 'monthly' | 'weekly') => {
      this.timetableMode = mode;
      document.getElementById('btn-view-monthly')?.classList.toggle('active', mode === 'monthly');
      document.getElementById('btn-view-weekly')?.classList.toggle('active', mode === 'weekly');
      document.getElementById('monthly-nav-controls')?.classList.toggle('hidden', mode !== 'monthly');
      document.getElementById('weekly-nav-controls')?.classList.toggle('hidden', mode !== 'weekly');
      this.loadAllData();
    };

    document.getElementById('btn-view-monthly')?.addEventListener('click', () => setMode('monthly'));
    document.getElementById('btn-view-weekly')?.addEventListener('click', () => setMode('weekly'));

    // Month navigation
    const shiftMonth = (delta: number) => {
      const [y, m] = this.currentMonth.split('-').map(Number);
      const dt = new Date(y, m - 1 + delta, 1);
      this.currentMonth = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      const picker = document.getElementById('timetable-month-picker') as HTMLInputElement | null;
      if (picker) picker.value = this.currentMonth;
      this.loadAllData();
    };

    document.getElementById('btn-prev-month')?.addEventListener('click', () => shiftMonth(-1));
    document.getElementById('btn-next-month')?.addEventListener('click', () => shiftMonth(1));
    document.getElementById('timetable-month-picker')?.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).value;
      if (val) {
        this.currentMonth = val;
        this.loadAllData();
      }
    });

    // Week navigation
    document.getElementById('btn-prev-week')?.addEventListener('click', () => {
      this.currentWeekMonday.setDate(this.currentWeekMonday.getDate() - 7);
      this.loadAllData();
    });
    document.getElementById('btn-curr-week')?.addEventListener('click', () => {
      this.currentWeekMonday = this.getMonday(new Date());
      this.loadAllData();
    });
    document.getElementById('btn-next-week')?.addEventListener('click', () => {
      this.currentWeekMonday.setDate(this.currentWeekMonday.getDate() + 7);
      this.loadAllData();
    });

    document.getElementById('timetable-dept-filter')?.addEventListener('change', () => {
      this.renderTimetable();
    });

    document.getElementById('btn-autofill-period')?.addEventListener('click', async () => {
      if (this.timetableMode === 'monthly') {
        const res = await this.api<{ count: number }>('/api/schedules/bulk-month', {
          method: 'POST',
          body: JSON.stringify({
            month: this.currentMonth,
            startTime: this.settings.defaultShiftStart,
            endTime: this.settings.defaultShiftEnd,
            breakMinutes: this.settings.defaultBreakMinutes,
          }),
        });
        this.toast(`Auto-filled ${res.count} weekday slots for ${this.currentMonth}`);
      } else {
        const mondayDate = this.formatDateISO(this.currentWeekMonday);
        const res = await this.api<{ count: number }>('/api/schedules/bulk-week', {
          method: 'POST',
          body: JSON.stringify({
            mondayDate,
            startTime: this.settings.defaultShiftStart,
            endTime: this.settings.defaultShiftEnd,
          }),
        });
        this.toast(`Auto-filled ${res.count} weekday slots`);
      }
      await this.loadAllData();
    });

    // Select Mode & Batch Actions
    document.getElementById('btn-toggle-select')?.addEventListener('click', (e) => {
      this.selectMode = !this.selectMode;
      (e.currentTarget as HTMLElement).classList.toggle('active-toggle', this.selectMode);
      this.toast(this.selectMode ? 'Select mode ON — click cells to select' : 'Select mode OFF');
    });

    const getSelectedPayloadCells = () =>
      Array.from(this.selectedCells).map((key) => {
        const [empId, workDate] = key.split(':');
        return { employeeId: Number(empId), workDate };
      });

    document.getElementById('btn-batch-apply-val')?.addEventListener('click', async () => {
      const input = document.getElementById('batch-value-input') as HTMLInputElement | null;
      const raw = (input?.value || '').trim().replace(',', '.');
      const num = parseFloat(raw);
      if (isNaN(num) || num < 0) {
        this.toast('Enter a valid number');
        return;
      }
      const hours =
        this.settings.timeUnit === 'minutes' ? +(num / 60).toFixed(2) : +num.toFixed(2);
      const cells = getSelectedPayloadCells();
      await this.api('/api/schedules/batch', {
        method: 'POST',
        body: JSON.stringify({
          cells,
          action: 'set',
          shiftType: hours === 0 ? 'Off' : 'Morning',
          plannedHours: hours,
        }),
      });
      this.selectedCells.clear();
      this.toast(`Updated ${cells.length} cells`);
      await this.loadAllData();
    });

    document.querySelectorAll('[data-batch-type]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const shiftType = btn.getAttribute('data-batch-type') || 'Leave';
        const cells = getSelectedPayloadCells();
        await this.api('/api/schedules/batch', {
          method: 'POST',
          body: JSON.stringify({ cells, action: 'set', shiftType }),
        });
        this.selectedCells.clear();
        this.toast(`Marked ${cells.length} cells as ${shiftType}`);
        await this.loadAllData();
      });
    });

    document.getElementById('btn-batch-clear')?.addEventListener('click', async () => {
      const cells = getSelectedPayloadCells();
      await this.api('/api/schedules/batch', {
        method: 'POST',
        body: JSON.stringify({ cells, action: 'clear' }),
      });
      this.selectedCells.clear();
      this.toast(`Cleared ${cells.length} cells`);
      await this.loadAllData();
    });

    document.getElementById('btn-batch-deselect')?.addEventListener('click', () => {
      this.selectedCells.clear();
      this.lastSelectedCell = null;
      this.renderTimetable();
    });

    // Clear All Table with Confirmation Modal
    document.getElementById('btn-clear-timetable')?.addEventListener('click', () => {
      const dates = this.getCurrentPeriodDates();
      const periodText =
        this.timetableMode === 'monthly'
          ? `month ${this.currentMonth}`
          : `week ${dates[0]} to ${dates[dates.length - 1]}`;
      const msgEl = document.getElementById('confirm-clear-msg');
      if (msgEl) {
        msgEl.textContent = `Are you sure you want to clear all workhour records for ${periodText}? This action cannot be undone.`;
      }
      this.openModal('modal-confirm-clear');
    });

    document.getElementById('btn-confirm-clear-exec')?.addEventListener('click', async () => {
      const dates = this.getCurrentPeriodDates();
      const filteredEmps = this.getFilteredTimetableEmployees();
      await this.api('/api/schedules/clear-range', {
        method: 'POST',
        body: JSON.stringify({
          startDate: dates[0],
          endDate: dates[dates.length - 1],
          employeeIds: filteredEmps.map((e) => e.id),
        }),
      });
      this.selectedCells.clear();
      this.closeModal('modal-confirm-clear');
      this.toast('Workhours table cleared');
      await this.loadAllData();
    });

    // Export Timetable to Excel & PDF
    document.getElementById('btn-export-timetable-excel')?.addEventListener('click', () => {
      this.exportTimetableToExcel();
    });
    document.getElementById('btn-export-timetable-pdf')?.addEventListener('click', () => {
      this.exportTimetableToPDF();
    });

    // Time Logs filters
    document.getElementById('timelog-search')?.addEventListener('input', () => {
      this.renderAttendance();
    });
    document.getElementById('timelog-type-filter')?.addEventListener('change', () => {
      this.renderAttendance();
    });
    document.getElementById('timelog-from')?.addEventListener('change', () => {
      this.renderAttendance();
    });
    document.getElementById('timelog-to')?.addEventListener('change', () => {
      this.renderAttendance();
    });
    document.getElementById('btn-timelog-clear-dates')?.addEventListener('click', () => {
      const f = document.getElementById('timelog-from') as HTMLInputElement | null;
      const t = document.getElementById('timelog-to') as HTMLInputElement | null;
      if (f) f.value = '';
      if (t) t.value = '';
      this.renderAttendance();
    });

    // Payroll filters & generator
    document.getElementById('payroll-period-picker')?.addEventListener('change', () => {
      this.renderPayroll();
    });
    document.getElementById('payroll-status-filter')?.addEventListener('change', () => {
      this.renderPayroll();
    });
    document.getElementById('payroll-emp-status-filter')?.addEventListener('change', () => {
      this.renderPayroll();
    });

    document.getElementById('btn-generate-period-payroll')?.addEventListener('click', async () => {
      const periodInput = document.getElementById('payroll-period-picker') as HTMLInputElement;
      const payPeriod = periodInput?.value || new Date().toISOString().slice(0, 7);
      const res = await this.api<{ generatedCount: number }>('/api/payrolls/generate-period', {
        method: 'POST',
        body: JSON.stringify({ payPeriod, defaultAllowance: 0, defaultBonus: 0 }),
      });
      if (res.generatedCount === 0) {
        this.toast(`No workhours found for ${payPeriod} — 0 payrolls generated`);
      } else {
        this.toast(`Generated ${res.generatedCount} salary records for ${payPeriod}`);
      }
      await this.loadAllData();
    });

    document.getElementById('btn-export-payroll-excel')?.addEventListener('click', () => {
      const periodVal = (
        document.getElementById('payroll-period-picker') as HTMLInputElement | null
      )?.value;
      const statusVal = (
        document.getElementById('payroll-status-filter') as HTMLSelectElement | null
      )?.value;

      const filtered = this.payrolls.filter((p) => {
        if (periodVal && p.payPeriod !== periodVal) return false;
        if (statusVal && p.paymentStatus !== statusVal) return false;
        const empStatusVal = (
          document.getElementById('payroll-emp-status-filter') as HTMLSelectElement | null
        )?.value;
        if (empStatusVal) {
          const emp = this.employees.find((e) => e.id === p.employeeId);
          if (!emp || emp.status !== empStatusVal) return false;
        }
        return true;
      });

      const socPct = parseFloat(this.settings.socialSecurityPercent || '9.5');
      const medPct = parseFloat(this.settings.medicalSecurityPercent || '1.7');
      const incPct = parseFloat(this.settings.incomeTaxPercent || '13.0');
      const computeRow = (p: PayrollRecord) => {
        const netNum = parseFloat(p.netSalary || '0');
        let grossNum = parseFloat(p.grossPay || '0');
        let socAmt = parseFloat(p.socialSecurityAmount || '0');
        let medAmt = parseFloat(p.medicalSecurityAmount || '0');
        let incAmt = parseFloat(p.incomeTaxAmount || '0');

        if (!grossNum || grossNum <= 0) {
          if (netNum < 44400) {
            socAmt = 4750;
            medAmt = 850;
            incAmt = 0;
            grossNum = +(netNum + medAmt + incAmt + socAmt).toFixed(2);
          } else {
            const divisor = Math.max(0.01, +(1 - (socPct + medPct + incPct) / 100).toFixed(4));
            grossNum = +((netNum - 3900) / divisor).toFixed(2);
            socAmt = +(grossNum * (socPct / 100)).toFixed(2);
            medAmt = +(grossNum * (medPct / 100)).toFixed(2);
            incAmt = +(Math.max(0, grossNum - 30000) * (incPct / 100)).toFixed(2);
          }
        }
        return { netNum, grossNum, socAmt, medAmt, incAmt };
      };

      let totalNet = 0;
      let totalSoc = 0;
      let totalMed = 0;
      let totalInc = 0;
      let totalGross = 0;

      const rowsHtml = filtered
        .map((p) => {
          const emp = this.employees.find((e) => e.id === p.employeeId);
          const { netNum, grossNum, socAmt, medAmt, incAmt } = computeRow(p);
          totalNet += netNum;
          totalSoc += socAmt;
          totalMed += medAmt;
          totalInc += incAmt;
          totalGross += grossNum;
          return `
            <tr>
              <td>${p.paymentDate || p.payPeriod}</td>
              <td>${emp?.bankAccount || ''}</td>
              <td><strong>${this.getEmployeeName(p.employeeId)}</strong></td>
              <td>${this.formatMoney(netNum)}</td>
              <td>${this.formatMoney(socAmt)}</td>
              <td>${this.formatMoney(medAmt)}</td>
              <td>${this.formatMoney(incAmt)}</td>
              <td>${this.formatMoney(grossNum)}</td>
              <td>${p.paymentStatus}</td>
            </tr>
          `;
        })
        .join('');

      const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
      const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';
      const headerHtml = this.formatParagraphToHtml(customHeader);
      const footerHtml = this.formatParagraphToHtml(customFooter);

      const periodLabel = periodVal || 'all';
      const excelHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8" /></head>
        <body>
          <table border="1">
            <thead>
              <tr>
                <th colspan="9" style="font-size:13px;background:#e2e8f0;font-weight:bold;padding:8px;text-align:left">
                  ${headerHtml}<br /><span style="font-size:11px;font-weight:normal">Payroll (${periodLabel})</span>
                </th>
              </tr>
              <tr style="background:#f1f5f9;font-weight:bold">
                <th>Date</th>
                <th>Bank Number</th>
                <th>Name</th>
                <th>Net Salary</th>
                <th>Social Security</th>
                <th>Medical Security</th>
                <th>Income Tax</th>
                <th>Gross Pay</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
            <tfoot>
              <tr style="background:#f8fafc;font-weight:bold">
                <td colspan="3">Total (${filtered.length} employees)</td>
                <td>${this.formatMoney(totalNet)}</td>
                <td>${this.formatMoney(totalSoc)}</td>
                <td>${this.formatMoney(totalMed)}</td>
                <td>${this.formatMoney(totalInc)}</td>
                <td>${this.formatMoney(totalGross)}</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="9" style="font-size:11px;color:#64748b;background:#f8fafc;padding:6px;text-align:left">
                  ${footerHtml}
                </td>
              </tr>
            </tfoot>
          </table>
        </body>
        </html>
      `;

      this.downloadTextFile(
        `payroll-${periodLabel}.xls`,
        '\uFEFF' + excelHtml,
        'application/vnd.ms-excel;charset=utf-8;'
      );
    });

    // Export for Bank (Bank Number, Name, Surname, Net Salary)
    document.getElementById('btn-export-payroll-bank')?.addEventListener('click', () => {
      const periodVal = (
        document.getElementById('payroll-period-picker') as HTMLInputElement | null
      )?.value;
      const statusVal = (
        document.getElementById('payroll-status-filter') as HTMLSelectElement | null
      )?.value;
      const empStatusVal = (
        document.getElementById('payroll-emp-status-filter') as HTMLSelectElement | null
      )?.value;

      const filtered = this.payrolls.filter((p) => {
        if (periodVal && p.payPeriod !== periodVal) return false;
        if (statusVal && p.paymentStatus !== statusVal) return false;
        if (empStatusVal) {
          const emp = this.employees.find((e) => e.id === p.employeeId);
          if (!emp || emp.status !== empStatusVal) return false;
        }
        return true;
      });

      let totalNet = 0;
      const rowsHtml = filtered
        .map((p) => {
          const emp = this.employees.find((e) => e.id === p.employeeId);
          const bankNum = emp?.bankAccount || '';
          const firstName = emp?.firstName || '';
          const lastName = emp?.lastName || '';
          const netNum = parseFloat(p.netSalary || '0');
          totalNet += netNum;
          return `
            <tr>
              <td>${bankNum}</td>
              <td>${firstName}</td>
              <td>${lastName}</td>
              <td>${this.formatMoney(netNum)}</td>
            </tr>
          `;
        })
        .join('');

      const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
      const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';
      const headerHtml = this.formatParagraphToHtml(customHeader);
      const footerHtml = this.formatParagraphToHtml(customFooter);

      const periodLabel = periodVal || 'all';
      const excelHtml = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8" /></head>
        <body>
          <table border="1">
            <thead>
              <tr>
                <th colspan="4" style="font-size:13px;background:#e2e8f0;font-weight:bold;padding:8px;text-align:left">
                  ${headerHtml}<br /><span style="font-size:11px;font-weight:normal">Bank Transfer List (${periodLabel})</span>
                </th>
              </tr>
              <tr style="background:#f1f5f9;font-weight:bold">
                <th>Bank Number</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
            <tfoot>
              <tr style="background:#f8fafc;font-weight:bold">
                <td colspan="3">Total (${filtered.length} employees)</td>
                <td>${this.formatMoney(totalNet)}</td>
              </tr>
              <tr>
                <td colspan="4" style="font-size:11px;color:#64748b;background:#f8fafc;padding:6px;text-align:left">
                  ${footerHtml}
                </td>
              </tr>
            </tfoot>
          </table>
        </body>
        </html>
      `;

      this.downloadTextFile(
        `bank-transfer-${periodLabel}.xls`,
        '\uFEFF' + excelHtml,
        'application/vnd.ms-excel;charset=utf-8;'
      );
    });

    // Employee & Salary History filters
    document.getElementById('emp-search')?.addEventListener('input', () => this.renderEmployees());
    [
      'emp-status-filter',
      'emp-gender-filter',
      'emp-paytype-filter',
      'emp-profile-filter',
      'emp-doc-filter',
    ].forEach((filterId) => {
      document.getElementById(filterId)?.addEventListener('change', () => this.renderEmployees());
    });
    document.getElementById('btn-reset-emp-filters')?.addEventListener('click', () => {
      const searchIn = document.getElementById('emp-search') as HTMLInputElement | null;
      if (searchIn) searchIn.value = '';
      [
        'emp-status-filter',
        'emp-gender-filter',
        'emp-paytype-filter',
        'emp-profile-filter',
        'emp-doc-filter',
      ].forEach((filterId) => {
        const sel = document.getElementById(filterId) as HTMLSelectElement | null;
        if (sel) sel.value = '';
      });
      this.renderEmployees();
    });
    document.getElementById('salary-history-search')?.addEventListener('input', () =>
      this.renderSalaryHistory()
    );
    document.getElementById('salary-history-emp-filter')?.addEventListener('change', () =>
      this.renderSalaryHistory()
    );

    // Quick Add Employee
    document.getElementById('form-quick-add-emp')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const dateInput = document.getElementById('qa-date') as HTMLInputElement;
      const codeInput = document.getElementById('qa-code') as HTMLInputElement;
      const firstInput = document.getElementById('qa-first') as HTMLInputElement;
      const lastInput = document.getElementById('qa-last') as HTMLInputElement;
      const bankInput = document.getElementById('qa-bank') as HTMLInputElement;
      const statusSel = document.getElementById('qa-status') as HTMLSelectElement;
      const payTypeSel = document.getElementById('qa-pay-type') as HTMLSelectElement;
      const payAmtInput = document.getElementById('qa-pay-amount') as HTMLInputElement;

      const firstName = firstInput.value.trim();
      const lastName = lastInput.value.trim();
      if (!firstName || !lastName) return;

      const seq = 1001 + this.employees.length + Math.floor(Math.random() * 50);
      const employeeCode = codeInput.value.trim() || `EMP-${seq}`;
      const email = `${firstName.toLowerCase().replace(/[^a-z0-9]/g, '')}.${lastName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')}.${seq}@company.io`;

      const payAmt = parseFloat(payAmtInput.value.trim().replace(',', '.') || '0') || 0;
      const isHourly = payTypeSel.value === 'hourly';
      const baseSalary = isHourly ? 0 : payAmt;
      const hourlyRate = isHourly ? payAmt : 0;
      const hireDate = dateInput.value || this.formatDateISO(new Date());

      try {
        await this.api('/api/employees', {
          method: 'POST',
          body: JSON.stringify({
            employeeCode,
            firstName,
            lastName,
            email,
            position: 'Staff',
            employmentType: 'Full-Time',
            status: statusSel.value || 'Employed',
            hireDate,
            baseSalary: baseSalary.toFixed(2),
            hourlyRate: hourlyRate.toFixed(2),
            overtimeRateMultiplier: '1.50',
            weeklyTargetHours: 40,
            bankAccount: bankInput.value.trim() || null,
            taxRatePercent: '15.00',
          }),
        });
        codeInput.value = '';
        firstInput.value = '';
        lastInput.value = '';
        bankInput.value = '';
        payAmtInput.value = '';
        firstInput.focus();
        this.toast(`Added ${firstName} ${lastName}`);
        await this.loadAllData();
      } catch (err: any) {
        this.toast(err.message);
      }
    });

    // Export Sample Employee CSV
    document.getElementById('btn-sample-emp-csv')?.addEventListener('click', () => {
      const headers = [
        'hireDate',
        'employeeCode',
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'idNumber',
        'bankAccount',
        'status',
        'baseSalary',
        'hourlyRate',
      ];
      const today = this.formatDateISO(new Date());
      const sampleRows = [
        [today, 'EMP-2001', 'Mario', 'Rossi', 'Male', '1990-05-14', 'I90514123A', 'AL47212110090000000235698741', 'Employed', '65000.00', '500.00'],
        [today, 'EMP-2002', 'Laura', 'Bianchi', 'Female', '1995-10-22', 'I951022456B', 'AL35202111090000000001234567', 'Provisory', '45000.00', '350.00'],
      ];
      const csv = [headers.join(','), ...sampleRows.map((r) => r.join(','))].join('\n');
      this.downloadTextFile('employees-sample.csv', csv, 'text/csv');
    });

    // Export Filtered Employees CSV
    document.getElementById('btn-export-emp-csv')?.addEventListener('click', () => {
      const filteredList = this.getFilteredEmployees();
      if (filteredList.length === 0) {
        this.toast('No employees match the current filter to export');
        return;
      }
      const headers = [
        'hireDate',
        'employeeCode',
        'firstName',
        'lastName',
        'gender',
        'dateOfBirth',
        'idNumber',
        'bankAccount',
        'status',
        'baseSalary',
        'hourlyRate',
        'medicalReport',
        'medicalChart',
        'workContract',
        'workChart',
        'declaration',
        'training',
      ];
      const escapeCsv = (val: string) => {
        const s = String(val ?? '');
        return s.includes(',') || s.includes('"') || s.includes('\n')
          ? `"${s.replace(/"/g, '""')}"`
          : s;
      };
      const rows = filteredList.map((e) =>
        [
          e.hireDate,
          e.employeeCode,
          e.firstName,
          e.lastName,
          e.gender || '',
          e.dateOfBirth ? e.dateOfBirth.split('T')[0] : '',
          e.idNumber || '',
          e.bankAccount || '',
          e.status,
          e.baseSalary,
          e.hourlyRate,
          e.docMedicalReport ? 'Yes' : 'No',
          e.docMedicalChart ? 'Yes' : 'No',
          e.docWorkContract ? 'Yes' : 'No',
          e.docWorkBook ? 'Yes' : 'No',
          e.docDeclaration ? 'Yes' : 'No',
          e.docTraining ? 'Yes' : 'No',
        ].map(escapeCsv)
      );
      const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      this.downloadTextFile(
        `employees-filtered-${this.formatDateISO(new Date())}.csv`,
        '\uFEFF' + csv,
        'text/csv;charset=utf-8;'
      );
      this.toast(`Exported ${filteredList.length} filtered employee(s) to CSV`);
    });

    // Export Filtered Employees PDF
    document.getElementById('btn-export-emp-pdf')?.addEventListener('click', () => {
      const filteredList = this.getFilteredEmployees();
      if (filteredList.length === 0) {
        this.toast('No employees match the current filter to export');
        return;
      }
      const win = window.open('', '_blank');
      if (!win) {
        this.toast('Please allow pop-ups to export PDF');
        return;
      }

      const filterSummary = this.getActiveEmployeeFilterSummary();
      const customHeader = this.settings.exportHeader || 'PulseHR Workforce Management';
      const customFooter = this.settings.exportFooter || 'Confidential • Generated by PulseHR';
      const headerHtml = this.formatParagraphToHtml(customHeader);
      const footerHtml = this.formatParagraphToHtml(customFooter);

      const rowsHtml = filteredList
        .map((e, idx) => {
          const baseNum = parseFloat(e.baseSalary || '0');
          const hourlyNum = parseFloat(e.hourlyRate || '0');
          const dob = e.dateOfBirth ? e.dateOfBirth.split('T')[0] : '—';
          const chk = (v?: boolean) =>
            v ? '<span class="ok">✓</span>' : '<span class="no">✗</span>';
          return `
            <tr>
              <td>${idx + 1}</td>
              <td>${e.hireDate}</td>
              <td><strong>${e.employeeCode}</strong></td>
              <td><strong>${e.firstName} ${e.lastName}</strong></td>
              <td>${e.gender || '—'}</td>
              <td>${dob}</td>
              <td style="font-family:monospace">${e.idNumber || '—'}</td>
              <td style="font-family:monospace">${e.bankAccount || '—'}</td>
              <td>${e.status}</td>
              <td style="text-align:right">${baseNum > 0 ? this.formatMoney(baseNum) : '—'}</td>
              <td style="text-align:right">${hourlyNum > 0 ? `${this.formatMoney(hourlyNum)}/h` : '—'}</td>
              <td>${chk(e.docMedicalReport)}</td>
              <td>${chk(e.docMedicalChart)}</td>
              <td>${chk(e.docWorkContract)}</td>
              <td>${chk(e.docWorkBook)}</td>
              <td>${chk(e.docDeclaration)}</td>
              <td>${chk(e.docTraining)}</td>
            </tr>
          `;
        })
        .join('');

      win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Employees Report (${filteredList.length} staff)</title>
  <style>
    @page { size: A4 landscape; margin: 10mm; }
    body { font-family: Arial, Helvetica, sans-serif; color: #111827; font-size: 10px; margin: 0; }
    .hdr { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #111827; padding-bottom: 6px; margin-bottom: 10px; }
    .filter-bar { background: #f3f4f6; border: 1px solid #d1d5db; padding: 5px 8px; margin-bottom: 10px; font-size: 10px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #cbd5e1; padding: 4px 5px; text-align: center; vertical-align: middle; }
    th { background: #f1f5f9; font-weight: 700; font-size: 9px; text-transform: uppercase; }
    td:nth-child(4) { text-align: left; }
    .ok { color: #065f46; font-weight: bold; }
    .no { color: #991b1b; }
    .ftr { margin-top: 12px; border-top: 1px solid #cbd5e1; padding-top: 6px; display: flex; justify-content: space-between; font-size: 9px; color: #64748b; }
  </style>
</head>
<body>
  <div class="hdr">
    <div>
      <div style="font-size:14px;font-weight:bold;margin-bottom:3px">${headerHtml}</div>
      <span style="font-weight:600;color:#0f172a">Employees Directory &amp; Document Compliance Report</span>
    </div>
    <span>Showing: <strong>${filteredList.length}</strong> of ${this.employees.length} employees | Date: ${new Date().toLocaleDateString()}</span>
  </div>
  <div class="filter-bar"><strong>Active Filters:</strong> ${filterSummary}</div>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Hire Date</th>
        <th>Code</th>
        <th>Full Name</th>
        <th>Gender</th>
        <th>DOB</th>
        <th>ID No.</th>
        <th>Bank IBAN</th>
        <th>Status</th>
        <th>Base Salary</th>
        <th>Rate/Hr</th>
        <th>Med. Rep</th>
        <th>Med. Chart</th>
        <th>Contract</th>
        <th>Librezë</th>
        <th>Decl.</th>
        <th>Training</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <div class="ftr">
    <div>${footerHtml}</div>
    <div>Page 1 of 1</div>
  </div>
  <script>window.onload = function() { window.print(); };</script>
</body>
</html>`);
      win.document.close();
    });

    // Import Employees CSV
    const csvFileInput = document.getElementById('emp-csv-file') as HTMLInputElement | null;
    document.getElementById('btn-import-emp-csv')?.addEventListener('click', () => {
      if (csvFileInput) {
        csvFileInput.value = '';
        csvFileInput.click();
      }
    });

    csvFileInput?.addEventListener('change', async () => {
      const file = csvFileInput.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const rows = this.parseEmployeeCSV(text);
        if (rows.length === 0) {
          this.toast('No valid employee rows found in CSV');
          return;
        }
        const res = await this.api<{ imported: number; skipped: number }>(
          '/api/employees/bulk-import',
          {
            method: 'POST',
            body: JSON.stringify({ rows }),
          }
        );
        this.toast(`Imported ${res.imported} employees (${res.skipped} skipped)`);
        await this.loadAllData();
      } catch (err: any) {
        this.toast(`Import error: ${err.message}`);
      }
    });

    // Users Approvals Tab Filters
    document.getElementById('users-search')?.addEventListener('input', () => this.renderUsers());
    document.getElementById('users-status-filter')?.addEventListener('change', () => this.renderUsers());
    document.getElementById('users-role-filter')?.addEventListener('change', () => this.renderUsers());
    document.getElementById('btn-refresh-users')?.addEventListener('click', () => this.loadUsers());
    document.getElementById('btn-add-user')?.addEventListener('click', () => this.openUserEditModal());
  }

  private downloadTextFile(filename: string, content: string, mime: string): void {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private parseEmployeeCSV(text: string): Record<string, string>[] {
    const lines = text
      .replace(/^\uFEFF/, '')
      .split(/\r?\n/)
      .filter((l) => l.trim() !== '');
    if (lines.length < 2) return [];

    // Support both comma and semicolon (European Excel) delimiters
    const firstLine = lines[0];
    const delimiter =
      (firstLine.match(/;/g)?.length || 0) > (firstLine.match(/,/g)?.length || 0) ? ';' : ',';

    const splitLine = (line: string): string[] => {
      const out: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          if (inQuotes && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (ch === delimiter && !inQuotes) {
          out.push(cur.trim());
          cur = '';
        } else {
          cur += ch;
        }
      }
      out.push(cur.trim());
      return out;
    };

    const normalizeHeader = (h: string): string => {
      const k = h.toLowerCase().replace(/[^a-z0-9]/g, '');
      const map: Record<string, string> = {
        employeecode: 'employeeCode',
        employnumber: 'employeeCode',
        empnumber: 'employeeCode',
        code: 'employeeCode',
        firstname: 'firstName',
        first: 'firstName',
        name: 'firstName',
        lastname: 'lastName',
        last: 'lastName',
        surname: 'lastName',
        surename: 'lastName',
        email: 'email',
        phone: 'phone',
        position: 'position',
        role: 'position',
        employmenttype: 'employmentType',
        type: 'employmentType',
        status: 'status',
        hiredate: 'hireDate',
        date: 'hireDate',
        basesalary: 'baseSalary',
        salary: 'baseSalary',
        hourlyrate: 'hourlyRate',
        rate: 'hourlyRate',
        priceperhour: 'hourlyRate',
        overtimeratemultiplier: 'overtimeRateMultiplier',
        weeklytargethours: 'weeklyTargetHours',
        taxratepercent: 'taxRatePercent',
        bankaccount: 'bankAccount',
        banknumber: 'bankAccount',
        bank: 'bankAccount',
      };
      return map[k] || h;
    };

    const headers = splitLine(lines[0]).map(normalizeHeader);
    const result: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const vals = splitLine(lines[i]);
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        if (vals[idx] !== undefined) obj[h] = vals[idx];
      });
      if (obj.firstName || obj.lastName) {
        result.push(obj);
      }
    }
    return result;
  }

  // --- User Approvals & Access Management (Admin Only) ---
  private async loadUsers(): Promise<void> {
    try {
      this.users = await this.api<UserRecord[]>('/api/users');
      this.renderUsers();
    } catch (err: any) {
      console.warn('Could not load users:', err.message);
    }
  }

  private renderUsers(): void {
    const searchVal = (
      (document.getElementById('users-search') as HTMLInputElement | null)?.value || ''
    ).toLowerCase();
    const statusVal = (
      document.getElementById('users-status-filter') as HTMLSelectElement | null
    )?.value;
    const roleVal = (
      document.getElementById('users-role-filter') as HTMLSelectElement | null
    )?.value;

    const list = this.users.filter((u) => {
      if (statusVal && u.status !== statusVal) return false;
      if (roleVal && u.role !== roleVal) return false;
      if (searchVal) {
        const hay = `${u.username} ${u.fullName || ''} ${u.role} ${u.status}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });

    const tbody = document.getElementById('users-tbody');
    if (!tbody) return;

    tbody.innerHTML =
      list
        .map((u) => {
          const isPrimaryAdmin = u.username === 'admin';
          const dt = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—';
          const statusBadge =
            u.status === 'approved'
              ? 'badge-Approved'
              : u.status === 'pending'
              ? 'badge-Pending'
              : 'badge-danger';

          return `
            <tr>
              <td>${dt}</td>
              <td><strong>${u.username}</strong></td>
              <td>${u.fullName || '—'}</td>
              <td>
                <select class="input-select input-xs" data-change-role="${u.id}" ${isPrimaryAdmin ? 'disabled' : ''}>
                  <option value="viewer" ${u.role === 'viewer' ? 'selected' : ''}>Viewer (Read-Only)</option>
                  <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
              </td>
              <td><span class="badge ${statusBadge}">${u.status.toUpperCase()}</span></td>
              <td>
                <div class="toolbar-group">
                  <button class="btn btn-xs btn-primary" data-user-edit="${u.id}" title="Edit Username & Password">✏️ Edit</button>
                  ${
                    u.status !== 'approved'
                      ? `<button class="btn btn-xs btn-success" data-user-action="approve" data-user-id="${u.id}">Approve</button>`
                      : ''
                  }
                  ${
                    u.status !== 'rejected' && !isPrimaryAdmin
                      ? `<button class="btn btn-xs btn-secondary" data-user-action="reject" data-user-id="${u.id}">Reject</button>`
                      : ''
                  }
                  ${
                    !isPrimaryAdmin
                      ? `<button class="btn btn-xs btn-danger" data-user-del="${u.id}">Delete</button>`
                      : '<span style="font-size:0.75rem;color:#64748b">Primary</span>'
                  }
                </div>
              </td>
            </tr>
          `;
        })
        .join('') || `<tr><td colspan="6">No registered users found.</td></tr>`;

    tbody.querySelectorAll('[data-user-edit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-user-edit'));
        const u = this.users.find((x) => x.id === id);
        if (u) this.openUserEditModal(u);
      });
    });

    tbody.querySelectorAll('[data-user-action]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-user-id');
        const action = btn.getAttribute('data-user-action');
        const newStatus = action === 'approve' ? 'approved' : 'rejected';
        try {
          await this.api(`/api/users/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus }),
          });
          this.toast(`User status updated to ${newStatus}`);
          await this.loadUsers();
        } catch (err: any) {
          this.toast(err.message);
        }
      });
    });

    tbody.querySelectorAll('[data-change-role]').forEach((sel) => {
      sel.addEventListener('change', async (e) => {
        const id = sel.getAttribute('data-change-role');
        const role = (e.target as HTMLSelectElement).value;
        try {
          await this.api(`/api/users/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ role }),
          });
          this.toast(`User role changed to ${role}`);
          await this.loadUsers();
        } catch (err: any) {
          this.toast(err.message);
        }
      });
    });

    tbody.querySelectorAll('[data-user-del]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-user-del');
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
          await this.api(`/api/users/${id}`, { method: 'DELETE' });
          this.toast('User deleted');
          await this.loadUsers();
        } catch (err: any) {
          this.toast(err.message);
        }
      });
    });
  }

  private openUserEditModal(u?: UserRecord): void {
    const titleEl = document.getElementById('modal-user-title');
    const idInput = document.getElementById('edit-user-id') as HTMLInputElement | null;
    const userInput = document.getElementById('edit-user-username') as HTMLInputElement | null;
    const nameInput = document.getElementById('edit-user-fullname') as HTMLInputElement | null;
    const passInput = document.getElementById('edit-user-password') as HTMLInputElement | null;
    const roleInput = document.getElementById('edit-user-role') as HTMLSelectElement | null;
    const statusInput = document.getElementById('edit-user-status') as HTMLSelectElement | null;
    const passLabel = document.getElementById('lbl-edit-user-password');
    const passHint = document.getElementById('hint-edit-user-password');

    if (!idInput || !userInput || !passInput) return;
    passInput.value = '';

    if (u) {
      if (titleEl) titleEl.textContent = 'Edit User Credentials';
      idInput.value = String(u.id);
      userInput.value = u.username;
      if (nameInput) nameInput.value = u.fullName || '';
      if (roleInput) roleInput.value = u.role;
      if (statusInput) statusInput.value = u.status;
      passInput.required = false;
      passInput.placeholder = 'Leave blank to keep current password';
      if (passLabel) passLabel.textContent = 'New Password';
      if (passHint) passHint.textContent = 'Leave empty to keep current password (min 4 characters).';
    } else {
      if (titleEl) titleEl.textContent = 'Add New User';
      idInput.value = '';
      userInput.value = '';
      if (nameInput) nameInput.value = '';
      if (roleInput) roleInput.value = 'viewer';
      if (statusInput) statusInput.value = 'approved';
      passInput.required = true;
      passInput.placeholder = 'Enter user password';
      if (passLabel) passLabel.textContent = 'Password *';
      if (passHint) passHint.textContent = 'Minimum 4 characters required.';
    }

    this.openModal('modal-user');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new PulseHRApp();
});
