import type { RespondentRole, SatisfactionResponse, TaskResponse, UatSubmission, UatTask } from "./types";

export const adminTasks: UatTask[] = [
  { id: "ADM-01", role: "Admin", description: "Login as admin" },
  { id: "ADM-02", role: "Admin", description: "View admin dashboard" },
  { id: "ADM-03", role: "Admin", description: "Add new student" },
  { id: "ADM-04", role: "Admin", description: "Update student information" },
  { id: "ADM-05", role: "Admin", description: "Add or view tutor information" },
  { id: "ADM-06", role: "Admin", description: "Change tutor status" },
  { id: "ADM-07", role: "Admin", description: "Create class schedule" },
  { id: "ADM-08", role: "Admin", description: "Generate invoice" },
  { id: "ADM-09", role: "Admin", description: "Record payment" },
  { id: "ADM-10", role: "Admin", description: "View report" },
  { id: "ADM-11", role: "Admin", description: "Logout" }
];

export const tutorTasks: UatTask[] = [
  { id: "TUT-01", role: "Tutor", description: "Login as tutor" },
  { id: "TUT-02", role: "Tutor", description: "View tutor dashboard" },
  { id: "TUT-03", role: "Tutor", description: "View assigned class schedule" },
  { id: "TUT-04", role: "Tutor", description: "Update availability" },
  { id: "TUT-05", role: "Tutor", description: "View student information" },
  { id: "TUT-06", role: "Tutor", description: "Upload learning resource" },
  { id: "TUT-07", role: "Tutor", description: "View income record" },
  { id: "TUT-08", role: "Tutor", description: "Logout" }
];

export const parentTasks: UatTask[] = [
  { id: "PAR-01", role: "Parent Representative", description: "Open public invoice link shared by admin" },
  { id: "PAR-02", role: "Parent Representative", description: "View invoice details and billing information" },
  { id: "PAR-03", role: "Parent Representative", description: "View invoice subjects or payment items and amount due" },
  { id: "PAR-04", role: "Parent Representative", description: "View bank details and QR code on invoice" },
  { id: "PAR-05", role: "Parent Representative", description: "Download or print invoice as PDF" },
  { id: "PAR-06", role: "Parent Representative", description: "Use Contact Us action from invoice page" },
  { id: "PAR-07", role: "Parent Representative", description: "Receive WhatsApp or email payment reminder with invoice link" },
  { id: "PAR-08", role: "Parent Representative", description: "Share payment receipt externally after payment" },
  { id: "PAR-09", role: "Parent Representative", description: "Open public receipt link after payment is recorded" },
  { id: "PAR-10", role: "Parent Representative", description: "Print or download payment receipt" },
  { id: "PAR-11", role: "Parent Representative", description: "Receive announcement broadcast by email" }
];

export const allTasks: UatTask[] = [...adminTasks, ...tutorTasks, ...parentTasks];

export const adminSatisfactionStatements = [
  { id: "ADM-SAT-01", statement: "The admin system is easy to use." },
  { id: "ADM-SAT-02", statement: "The admin navigation is clear and understandable." },
  { id: "ADM-SAT-03", statement: "The admin dashboard layout is organized." },
  { id: "ADM-SAT-04", statement: "The system response time is acceptable during administrative tasks." },
  { id: "ADM-SAT-05", statement: "The student management function is useful for administrative work." },
  { id: "ADM-SAT-06", statement: "The tutor management function is useful for managing tutor records." },
  { id: "ADM-SAT-07", statement: "The class scheduling function is easy to understand." },
  { id: "ADM-SAT-08", statement: "The invoice and payment function supports administrative work." },
  { id: "ADM-SAT-09", statement: "The report function provides useful information for management decisions." },
  { id: "ADM-SAT-10", statement: "Overall, the admin system is suitable for a private tutoring company." }
];

export const tutorSatisfactionStatements = [
  { id: "TUT-SAT-01", statement: "The tutor system is easy to use." },
  { id: "TUT-SAT-02", statement: "The tutor navigation is clear and understandable." },
  { id: "TUT-SAT-03", statement: "The tutor dashboard layout is organized." },
  { id: "TUT-SAT-04", statement: "The system response time is acceptable during tutor tasks." },
  { id: "TUT-SAT-05", statement: "The assigned class schedule is easy to view and understand." },
  { id: "TUT-SAT-06", statement: "The availability update function is useful for tutors." },
  { id: "TUT-SAT-07", statement: "The student information shown to tutors is useful for class preparation." },
  { id: "TUT-SAT-08", statement: "The learning resource upload function is easy to use." },
  { id: "TUT-SAT-09", statement: "The income record function provides useful information to tutors." },
  { id: "TUT-SAT-10", statement: "Overall, the tutor system supports tutor work effectively." }
];

export const parentSatisfactionStatements = [
  { id: "PAR-SAT-01", statement: "The public invoice link is easy for parents to open." },
  { id: "PAR-SAT-02", statement: "The invoice information is clear and understandable." },
  { id: "PAR-SAT-03", statement: "The invoice items and total amount due are easy to understand." },
  { id: "PAR-SAT-04", statement: "The bank details and QR code are useful for making payment." },
  { id: "PAR-SAT-05", statement: "The invoice download or print function is useful." },
  { id: "PAR-SAT-06", statement: "The Contact Us action helps parents communicate with the centre." },
  { id: "PAR-SAT-07", statement: "The WhatsApp or email payment reminder is helpful." },
  { id: "PAR-SAT-08", statement: "The receipt link is easy to open after payment is recorded." },
  { id: "PAR-SAT-09", statement: "The receipt information is clear and useful for parents." },
  { id: "PAR-SAT-10", statement: "The email announcement helps parents receive important updates." }
];

export const satisfactionStatements = [...adminSatisfactionStatements, ...tutorSatisfactionStatements, ...parentSatisfactionStatements];

export const likertLabels = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree"
};

export function createTaskResponses(tasks: UatTask[]): TaskResponse[] {
  return tasks.map((task) => ({
    taskId: task.id,
    result: "Not Tested",
    difficulty: 3,
    comment: ""
  }));
}

export function getTasksForRole(role: RespondentRole): UatTask[] {
  if (role === "Tutor") {
    return tutorTasks;
  }

  if (role === "Parent Representative") {
    return parentTasks;
  }

  return adminTasks;
}

export function getSatisfactionStatementsForRole(role: RespondentRole) {
  if (role === "Tutor") {
    return tutorSatisfactionStatements;
  }

  if (role === "Parent Representative") {
    return parentSatisfactionStatements;
  }

  return adminSatisfactionStatements;
}

export function createSatisfactionResponses(role: RespondentRole = "Admin"): SatisfactionResponse[] {
  return getSatisfactionStatementsForRole(role).map((statement) => ({
    statementId: statement.id,
    score: 3
  }));
}

export const sampleSubmission: UatSubmission = {
  id: "sample-uat-001",
  createdAt: "2026-06-21T08:00:00.000Z",
  respondent: {
    name: "Sample Admin Respondent",
    role: "Admin",
    otherRole: "",
    testingDate: "2026-06-21",
    device: "Laptop",
    browser: "Chrome",
    otherBrowser: ""
  },
  tasks: adminTasks.map((task, index) => ({
    taskId: task.id,
    result: index === 7 ? "Failed" : index === 9 ? "Not Tested" : "Successful",
    difficulty: index === 7 ? 5 : index === 6 ? 4 : 2,
    comment:
      index === 7
        ? "Invoice layout was clear, but the generated total should be checked before saving."
        : index === 9
          ? "Report testing was skipped because there was not enough sample data."
          : ""
  })),
  satisfaction: adminSatisfactionStatements.map((statement, index) => ({
    statementId: statement.id,
    score: index === 7 ? 3 : index === 8 ? 3 : 4
  })),
  feedback: {
    problemsFaced: "Some financial screens need clearer confirmation messages.",
    improvementPart: "Invoice, payment, and report sections.",
    additionalComments: "The overall flow is suitable for a tutoring company CRM.",
    acceptance: "Yes, with minor improvements"
  }
};

