export type RespondentRole = "Admin" | "Tutor" | "Parent Representative" | "Other";
export type DeviceUsed = "Laptop" | "Smartphone" | "Tablet";
export type BrowserUsed = "Chrome" | "Edge" | "Safari" | "Firefox" | "Other";
export type TaskResult = "Successful" | "Failed" | "Not Tested";
export type AcceptanceChoice = "Yes" | "Yes, with minor improvements" | "No";
export type FinalDecision = "Accepted" | "Accepted with minor improvements" | "Not accepted / Needs improvement";

export interface RespondentInfo {
  name: string;
  role: RespondentRole;
  otherRole: string;
  testingDate: string;
  device: DeviceUsed;
  browser: BrowserUsed;
  otherBrowser: string;
}

export interface UatTask {
  id: string;
  role: "Admin" | "Tutor" | "Parent Representative";
  description: string;
}

export interface TaskResponse {
  taskId: string;
  result: TaskResult;
  difficulty: number;
  comment: string;
}

export interface SatisfactionResponse {
  statementId: string;
  score: number;
}

export interface OpenFeedback {
  problemsFaced: string;
  improvementPart: string;
  additionalComments: string;
  acceptance: AcceptanceChoice;
}

export interface UatSubmission {
  id: string;
  createdAt: string;
  respondent: RespondentInfo;
  tasks: TaskResponse[];
  satisfaction: SatisfactionResponse[];
  feedback: OpenFeedback;
}

export interface AnalysisSummary {
  totalTasks: number;
  successfulTasks: number;
  failedTasks: number;
  notTestedTasks: number;
  successPercentage: number;
  averageDifficulty: number;
  averageSatisfaction: number;
  successInterpretation: string;
  satisfactionInterpretation: string;
  acceptanceStatusSummary: string;
  finalDecision: FinalDecision;
  failedTaskDescriptions: string[];
  notTestedTaskDescriptions: string[];
  userCommentsSummary: string[];
  recommendedImprovements: string[];
}

export interface DashboardSummary {
  totalRespondents: number;
  averageSuccessPercentage: number;
  averageSatisfactionScore: number;
  acceptedCount: number;
  acceptedWithMinorImprovementsCount: number;
  notAcceptedCount: number;
}

