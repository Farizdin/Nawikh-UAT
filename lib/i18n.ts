import type { AcceptanceChoice, BrowserUsed, DeviceUsed, FinalDecision, RespondentRole, TaskResult } from "./types";

export type Locale = "en" | "ms";

type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    language: "Language",
    english: "English",
    bahasaMalaysia: "Bahasa Malaysia",
    finalYearProjectUat: "Final Year Project UAT",
    appTitle: "Nawikh EduHub UAT System",
    appDescription: "Task-based user acceptance testing for the Nawikh EduHub CRM system, with automatic analysis and reporting.",
    uatForm: "UAT Form",
    dashboard: "Dashboard",
    analysis: "Analysis",
    systemContext: "System Context",
    systemContextText:
      "Nawikh EduHub is a CRM system for a private tutoring company covering students, tutors, schedules, invoices, payments, resources, announcements, reports, tutor schedules, tutor income, and tutor availability.",
    testingMethod: "Testing Method",
    testingMethodText:
      "Respondents complete role-based tasks, rate difficulty, answer satisfaction statements, and submit acceptance feedback for academic documentation.",
    storage: "Storage",
    storageText: "Responses are saved in browser localStorage. The storage module is separated so it can be upgraded to Supabase later.",
    section1: "Section 1",
    section2: "Section 2",
    section3: "Section 3",
    section4: "Section 4",
    respondentInformation: "Respondent Information",
    respondentName: "Respondent name",
    role: "Role",
    otherRole: "Other role",
    dateOfTesting: "Date of testing",
    deviceUsed: "Device used",
    browserUsed: "Browser used",
    otherBrowser: "Other browser",
    taskChecklist: "UAT Task Checklist",
    taskId: "Task ID",
    taskDescription: "Task Description",
    result: "Result",
    difficulty: "Difficulty",
    comment: "Comment",
    optionalComment: "Optional comment",
    satisfactionRating: "User Satisfaction Rating",
    currentScore: "Current score",
    openFeedback: "Open-ended Feedback",
    problemsQuestion: "What problems did you face while using the system?",
    improvementQuestion: "Which part of the system should be improved?",
    additionalQuestion: "Any additional comments or suggestions?",
    acceptanceQuestion: "Do you accept this system for use?",
    confirmationTitle: "Testing Confirmation",
    confirmationStatement: "I confirm that I have tested the Nawikh EduHub system and the responses given in this UAT form are based on my testing experience.",
    submitResponse: "Submit UAT Response",
    automaticAnalysis: "Automatic Analysis",
    exportPdfPrint: "Export PDF / Print",
    totalUatTasks: "Total UAT Tasks",
    successfulTasks: "Successful Tasks",
    failedTasks: "Failed Tasks",
    notTested: "Not Tested",
    successPercentage: "Success Percentage",
    averageDifficulty: "Average Difficulty",
    difficultyHelp: "1 is easiest, 5 is hardest",
    averageSatisfaction: "Average Satisfaction",
    finalUatDecision: "Final UAT Decision",
    decisionExplanation: "Decision is generated from task success, average satisfaction, and the respondent acceptance choice.",
    failedTaskList: "Failed Tasks",
    noFailedTasks: "No failed tasks were reported.",
    notTestedTaskList: "Not Tested Tasks",
    noNotTestedTasks: "All selected tasks were tested.",
    commentsSummary: "Summary of User Comments",
    noComments: "No comments were submitted.",
    recommendedImprovements: "Recommended Improvements",
    noImprovements: "No improvements required.",
    adminDashboard: "Admin Dashboard",
    allSubmissions: "All UAT Submissions",
    dashboardDescription: "Review respondent results, export records, and open detailed analysis.",
    exportAllCsv: "Export All CSV",
    resetSampleData: "Reset Sample Data",
    totalRespondents: "Total Respondents",
    avgSuccess: "Avg Success",
    avgSatisfaction: "Avg Satisfaction",
    accepted: "Accepted",
    minorImprovements: "Minor Improvements",
    notAccepted: "Not Accepted",
    respondent: "Respondent",
    date: "Date",
    success: "Success",
    satisfaction: "Satisfaction",
    decision: "Decision",
    action: "Action",
    viewAnalysis: "View Analysis",
    print: "Print"
  },
  ms: {
    language: "Bahasa",
    english: "English",
    bahasaMalaysia: "Bahasa Malaysia",
    finalYearProjectUat: "UAT Projek Tahun Akhir",
    appTitle: "Sistem UAT Nawikh EduHub",
    appDescription: "Ujian penerimaan pengguna berasaskan tugasan untuk sistem CRM Nawikh EduHub, lengkap dengan analisis dan laporan automatik.",
    uatForm: "Borang UAT",
    dashboard: "Papan Pemuka",
    analysis: "Analisis",
    systemContext: "Konteks Sistem",
    systemContextText:
      "Nawikh EduHub ialah sistem CRM untuk syarikat tuisyen persendirian yang merangkumi pelajar, tutor, jadual, invois, bayaran, bahan pembelajaran, pengumuman, laporan, jadual tutor, pendapatan tutor, dan ketersediaan tutor.",
    testingMethod: "Kaedah Ujian",
    testingMethodText:
      "Responden melengkapkan tugasan mengikut peranan, menilai tahap kesukaran, menjawab penyataan kepuasan, dan menghantar maklum balas penerimaan untuk dokumentasi akademik.",
    storage: "Storan",
    storageText: "Respons disimpan dalam localStorage pelayar. Modul storan diasingkan supaya boleh dinaik taraf kepada Supabase kemudian.",
    section1: "Bahagian 1",
    section2: "Bahagian 2",
    section3: "Bahagian 3",
    section4: "Bahagian 4",
    respondentInformation: "Maklumat Responden",
    respondentName: "Nama responden",
    role: "Peranan",
    otherRole: "Peranan lain",
    dateOfTesting: "Tarikh ujian",
    deviceUsed: "Peranti digunakan",
    browserUsed: "Pelayar digunakan",
    otherBrowser: "Pelayar lain",
    taskChecklist: "Senarai Semak Tugasan UAT",
    taskId: "ID Tugasan",
    taskDescription: "Penerangan Tugasan",
    result: "Keputusan",
    difficulty: "Kesukaran",
    comment: "Komen",
    optionalComment: "Komen pilihan",
    satisfactionRating: "Penilaian Kepuasan Pengguna",
    currentScore: "Skor semasa",
    openFeedback: "Maklum Balas Terbuka",
    problemsQuestion: "Apakah masalah yang anda hadapi semasa menggunakan sistem?",
    improvementQuestion: "Bahagian manakah dalam sistem yang perlu ditambah baik?",
    additionalQuestion: "Sebarang komen atau cadangan tambahan?",
    acceptanceQuestion: "Adakah anda menerima sistem ini untuk digunakan?",
    confirmationTitle: "Pengesahan Ujian",
    confirmationStatement: "Saya mengesahkan bahawa saya telah menguji sistem Nawikh EduHub dan respons yang diberikan dalam borang UAT ini adalah berdasarkan pengalaman ujian saya.",
    submitResponse: "Hantar Respons UAT",
    automaticAnalysis: "Analisis Automatik",
    exportPdfPrint: "Eksport PDF / Cetak",
    totalUatTasks: "Jumlah Tugasan UAT",
    successfulTasks: "Tugasan Berjaya",
    failedTasks: "Tugasan Gagal",
    notTested: "Tidak Diuji",
    successPercentage: "Peratus Kejayaan",
    averageDifficulty: "Purata Kesukaran",
    difficultyHelp: "1 paling mudah, 5 paling sukar",
    averageSatisfaction: "Purata Kepuasan",
    finalUatDecision: "Keputusan Akhir UAT",
    decisionExplanation: "Keputusan dijana berdasarkan kejayaan tugasan, purata kepuasan, dan pilihan penerimaan responden.",
    failedTaskList: "Tugasan Gagal",
    noFailedTasks: "Tiada tugasan gagal dilaporkan.",
    notTestedTaskList: "Tugasan Tidak Diuji",
    noNotTestedTasks: "Semua tugasan yang dipilih telah diuji.",
    commentsSummary: "Ringkasan Komen Pengguna",
    noComments: "Tiada komen dihantar.",
    recommendedImprovements: "Cadangan Penambahbaikan",
    noImprovements: "Tiada penambahbaikan diperlukan.",
    adminDashboard: "Papan Pemuka Admin",
    allSubmissions: "Semua Penyerahan UAT",
    dashboardDescription: "Semak keputusan responden, eksport rekod, dan buka analisis terperinci.",
    exportAllCsv: "Eksport Semua CSV",
    resetSampleData: "Set Semula Data Sampel",
    totalRespondents: "Jumlah Responden",
    avgSuccess: "Purata Kejayaan",
    avgSatisfaction: "Purata Kepuasan",
    accepted: "Diterima",
    minorImprovements: "Penambahbaikan Kecil",
    notAccepted: "Tidak Diterima",
    respondent: "Responden",
    date: "Tarikh",
    success: "Kejayaan",
    satisfaction: "Kepuasan",
    decision: "Keputusan",
    action: "Tindakan",
    viewAnalysis: "Lihat Analisis",
    print: "Cetak"
  }
} as const;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

export const roleLabels: Record<Locale, Record<RespondentRole, string>> = {
  en: {
    Admin: "Admin",
    Tutor: "Tutor",
    "Parent Representative": "Parent Representative",
    Other: "Other"
  },
  ms: {
    Admin: "Admin",
    Tutor: "Tutor",
    "Parent Representative": "Wakil Ibu Bapa",
    Other: "Lain-lain"
  }
};

export const deviceLabels: Record<Locale, Record<DeviceUsed, string>> = {
  en: { Laptop: "Laptop", Smartphone: "Smartphone", Tablet: "Tablet" },
  ms: { Laptop: "Komputer riba", Smartphone: "Telefon pintar", Tablet: "Tablet" }
};

export const browserLabels: Record<Locale, Record<BrowserUsed, string>> = {
  en: { Chrome: "Chrome", Edge: "Edge", Safari: "Safari", Firefox: "Firefox", Other: "Other" },
  ms: { Chrome: "Chrome", Edge: "Edge", Safari: "Safari", Firefox: "Firefox", Other: "Lain-lain" }
};

export const resultLabels: Record<Locale, Record<TaskResult, string>> = {
  en: { Successful: "Successful", Failed: "Failed", "Not Tested": "Not Tested" },
  ms: { Successful: "Berjaya", Failed: "Gagal", "Not Tested": "Tidak Diuji" }
};

export const acceptanceLabels: Record<Locale, Record<AcceptanceChoice, string>> = {
  en: { Yes: "Yes", "Yes, with minor improvements": "Yes, with minor improvements", No: "No" },
  ms: { Yes: "Ya", "Yes, with minor improvements": "Ya, dengan penambahbaikan kecil", No: "Tidak" }
};

export const decisionLabels: Record<Locale, Record<FinalDecision, string>> = {
  en: {
    Accepted: "Accepted",
    "Accepted with minor improvements": "Accepted with minor improvements",
    "Not accepted / Needs improvement": "Not accepted / Needs improvement"
  },
  ms: {
    Accepted: "Diterima",
    "Accepted with minor improvements": "Diterima dengan penambahbaikan kecil",
    "Not accepted / Needs improvement": "Tidak diterima / Perlu penambahbaikan"
  }
};

export const likertText: Record<Locale, Record<number, string>> = {
  en: {
    1: "Strongly Disagree",
    2: "Disagree",
    3: "Neutral",
    4: "Agree",
    5: "Strongly Agree"
  },
  ms: {
    1: "Sangat Tidak Setuju",
    2: "Tidak Setuju",
    3: "Neutral",
    4: "Setuju",
    5: "Sangat Setuju"
  }
};

export const taskText: Record<Locale, Record<string, string>> = {
  en: {
    "ADM-01": "Login as admin",
    "ADM-02": "View admin dashboard",
    "ADM-03": "Add new student",
    "ADM-04": "Update student information",
    "ADM-05": "Add or view tutor information",
    "ADM-06": "Change tutor status",
    "ADM-07": "Create class schedule",
    "ADM-08": "Generate invoice",
    "ADM-09": "Record payment",
    "ADM-10": "View report",
    "ADM-11": "Logout",
    "TUT-01": "Login as tutor",
    "TUT-02": "View tutor dashboard",
    "TUT-03": "View assigned class schedule",
    "TUT-04": "Update availability",
    "TUT-05": "View student information",
    "TUT-06": "Upload learning resource",
    "TUT-07": "View income record",
    "TUT-08": "Logout",
    "PAR-01": "Open public invoice link shared by admin",
    "PAR-02": "View invoice details and billing information",
    "PAR-03": "View invoice subjects or payment items and amount due",
    "PAR-04": "View bank details and QR code on invoice",
    "PAR-05": "Download or print invoice as PDF",
    "PAR-06": "Use Contact Us action from invoice page",
    "PAR-07": "Receive WhatsApp or email payment reminder with invoice link",
    "PAR-08": "Share payment receipt externally after payment",
    "PAR-09": "Open public receipt link after payment is recorded",
    "PAR-10": "Print or download payment receipt",
    "PAR-11": "Receive announcement broadcast by email"
  },
  ms: {
    "ADM-01": "Log masuk sebagai admin",
    "ADM-02": "Lihat papan pemuka admin",
    "ADM-03": "Tambah pelajar baharu",
    "ADM-04": "Kemas kini maklumat pelajar",
    "ADM-05": "Tambah atau lihat maklumat tutor",
    "ADM-06": "Tukar status tutor",
    "ADM-07": "Cipta jadual kelas",
    "ADM-08": "Jana invois",
    "ADM-09": "Rekod bayaran",
    "ADM-10": "Lihat laporan",
    "ADM-11": "Log keluar",
    "TUT-01": "Log masuk sebagai tutor",
    "TUT-02": "Lihat papan pemuka tutor",
    "TUT-03": "Lihat jadual kelas yang ditugaskan",
    "TUT-04": "Kemas kini ketersediaan",
    "TUT-05": "Lihat maklumat pelajar",
    "TUT-06": "Muat naik bahan pembelajaran",
    "TUT-07": "Lihat rekod pendapatan",
    "TUT-08": "Log keluar",
    "PAR-01": "Buka pautan invois awam yang dikongsi oleh admin",
    "PAR-02": "Lihat butiran invois dan maklumat bil",
    "PAR-03": "Lihat subjek atau item bayaran dan jumlah perlu dibayar",
    "PAR-04": "Lihat butiran bank dan kod QR pada invois",
    "PAR-05": "Muat turun atau cetak invois sebagai PDF",
    "PAR-06": "Gunakan tindakan Hubungi Kami daripada halaman invois",
    "PAR-07": "Terima peringatan bayaran WhatsApp atau e-mel bersama pautan invois",
    "PAR-08": "Kongsi resit bayaran secara luaran selepas membuat bayaran",
    "PAR-09": "Buka pautan resit awam selepas bayaran direkodkan",
    "PAR-10": "Cetak atau muat turun resit bayaran",
    "PAR-11": "Terima pengumuman melalui siaran e-mel"
  }
};

export const satisfactionText: Record<Locale, Record<string, string>> = {
  en: {
    "ADM-SAT-01": "The admin system is easy to use.",
    "ADM-SAT-02": "The admin navigation is clear and understandable.",
    "ADM-SAT-03": "The admin dashboard layout is organized.",
    "ADM-SAT-04": "The system response time is acceptable during administrative tasks.",
    "ADM-SAT-05": "The student management function is useful for administrative work.",
    "ADM-SAT-06": "The tutor management function is useful for managing tutor records.",
    "ADM-SAT-07": "The class scheduling function is easy to understand.",
    "ADM-SAT-08": "The invoice and payment function supports administrative work.",
    "ADM-SAT-09": "The report function provides useful information for management decisions.",
    "ADM-SAT-10": "Overall, the admin system is suitable for a private tutoring company.",
    "TUT-SAT-01": "The tutor system is easy to use.",
    "TUT-SAT-02": "The tutor navigation is clear and understandable.",
    "TUT-SAT-03": "The tutor dashboard layout is organized.",
    "TUT-SAT-04": "The system response time is acceptable during tutor tasks.",
    "TUT-SAT-05": "The assigned class schedule is easy to view and understand.",
    "TUT-SAT-06": "The availability update function is useful for tutors.",
    "TUT-SAT-07": "The student information shown to tutors is useful for class preparation.",
    "TUT-SAT-08": "The learning resource upload function is easy to use.",
    "TUT-SAT-09": "The income record function provides useful information to tutors.",
    "TUT-SAT-10": "Overall, the tutor system supports tutor work effectively.",
    "PAR-SAT-01": "The public invoice link is easy for parents to open.",
    "PAR-SAT-02": "The invoice information is clear and understandable.",
    "PAR-SAT-03": "The invoice items and total amount due are easy to understand.",
    "PAR-SAT-04": "The bank details and QR code are useful for making payment.",
    "PAR-SAT-05": "The invoice download or print function is useful.",
    "PAR-SAT-06": "The Contact Us action helps parents communicate with the centre.",
    "PAR-SAT-07": "The WhatsApp or email payment reminder is helpful.",
    "PAR-SAT-08": "The receipt link is easy to open after payment is recorded.",
    "PAR-SAT-09": "The receipt information is clear and useful for parents.",
    "PAR-SAT-10": "The email announcement helps parents receive important updates."
  },
  ms: {
    "ADM-SAT-01": "Sistem admin ini mudah digunakan.",
    "ADM-SAT-02": "Navigasi admin jelas dan mudah difahami.",
    "ADM-SAT-03": "Susun atur papan pemuka admin adalah teratur.",
    "ADM-SAT-04": "Masa respons sistem adalah boleh diterima semasa tugasan pentadbiran.",
    "ADM-SAT-05": "Fungsi pengurusan pelajar berguna untuk kerja pentadbiran.",
    "ADM-SAT-06": "Fungsi pengurusan tutor berguna untuk mengurus rekod tutor.",
    "ADM-SAT-07": "Fungsi penjadualan kelas mudah difahami.",
    "ADM-SAT-08": "Fungsi invois dan bayaran menyokong kerja pentadbiran.",
    "ADM-SAT-09": "Fungsi laporan menyediakan maklumat berguna untuk keputusan pengurusan.",
    "ADM-SAT-10": "Secara keseluruhan, sistem admin ini sesuai untuk syarikat tuisyen persendirian.",
    "TUT-SAT-01": "Sistem tutor ini mudah digunakan.",
    "TUT-SAT-02": "Navigasi tutor jelas dan mudah difahami.",
    "TUT-SAT-03": "Susun atur papan pemuka tutor adalah teratur.",
    "TUT-SAT-04": "Masa respons sistem adalah boleh diterima semasa tugasan tutor.",
    "TUT-SAT-05": "Jadual kelas yang ditugaskan mudah dilihat dan difahami.",
    "TUT-SAT-06": "Fungsi kemas kini ketersediaan berguna untuk tutor.",
    "TUT-SAT-07": "Maklumat pelajar yang dipaparkan kepada tutor berguna untuk persediaan kelas.",
    "TUT-SAT-08": "Fungsi muat naik bahan pembelajaran mudah digunakan.",
    "TUT-SAT-09": "Fungsi rekod pendapatan menyediakan maklumat berguna kepada tutor.",
    "TUT-SAT-10": "Secara keseluruhan, sistem tutor ini menyokong kerja tutor dengan berkesan.",
    "PAR-SAT-01": "Pautan invois awam mudah dibuka oleh ibu bapa.",
    "PAR-SAT-02": "Maklumat invois jelas dan mudah difahami.",
    "PAR-SAT-03": "Item invois dan jumlah perlu dibayar mudah difahami.",
    "PAR-SAT-04": "Butiran bank dan kod QR berguna untuk membuat bayaran.",
    "PAR-SAT-05": "Fungsi muat turun atau cetak invois adalah berguna.",
    "PAR-SAT-06": "Tindakan Hubungi Kami membantu ibu bapa berkomunikasi dengan pusat.",
    "PAR-SAT-07": "Peringatan bayaran melalui WhatsApp atau e-mel adalah membantu.",
    "PAR-SAT-08": "Pautan resit mudah dibuka selepas bayaran direkodkan.",
    "PAR-SAT-09": "Maklumat resit jelas dan berguna untuk ibu bapa.",
    "PAR-SAT-10": "Pengumuman e-mel membantu ibu bapa menerima maklumat penting."
  }
};
export const successInterpretationLabels: Record<Locale, Record<string, string>> = {
  en: {
    Excellent: "Excellent",
    Good: "Good",
    "Acceptable with improvements": "Acceptable with improvements",
    "Needs major improvement": "Needs major improvement"
  },
  ms: {
    Excellent: "Cemerlang",
    Good: "Baik",
    "Acceptable with improvements": "Boleh diterima dengan penambahbaikan",
    "Needs major improvement": "Memerlukan penambahbaikan besar"
  }
};

export const satisfactionInterpretationLabels: Record<Locale, Record<string, string>> = {
  en: {
    "Very satisfied": "Very satisfied",
    Satisfied: "Satisfied",
    Neutral: "Neutral",
    Unsatisfied: "Unsatisfied",
    "Very unsatisfied": "Very unsatisfied"
  },
  ms: {
    "Very satisfied": "Sangat berpuas hati",
    Satisfied: "Berpuas hati",
    Neutral: "Neutral",
    Unsatisfied: "Tidak berpuas hati",
    "Very unsatisfied": "Sangat tidak berpuas hati"
  }
};




