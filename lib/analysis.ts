import { allTasks } from "./uat-data";
import type { AnalysisSummary, DashboardSummary, TaskResponse, UatSubmission, UatTask } from "./types";

function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function taskLabel(response: TaskResponse, tasks: UatTask[]): string {
  const task = tasks.find((item) => item.id === response.taskId);
  return task ? `${task.id}: ${task.description}` : response.taskId;
}

export function getSuccessInterpretation(successPercentage: number): string {
  if (successPercentage >= 90) {
    return "Excellent";
  }

  if (successPercentage >= 75) {
    return "Good";
  }

  if (successPercentage >= 60) {
    return "Acceptable with improvements";
  }

  return "Needs major improvement";
}

export function getSatisfactionInterpretation(score: number): string {
  if (score >= 4.5) {
    return "Very satisfied";
  }

  if (score >= 3.5) {
    return "Satisfied";
  }

  if (score >= 2.5) {
    return "Neutral";
  }

  if (score >= 1.5) {
    return "Unsatisfied";
  }

  return "Very unsatisfied";
}

export function analyzeSubmission(submission: UatSubmission, taskBank: UatTask[] = allTasks): AnalysisSummary {
  const totalTasks = submission.tasks.length;
  const successfulTasks = submission.tasks.filter((task) => task.result === "Successful").length;
  const failedTasks = submission.tasks.filter((task) => task.result === "Failed");
  const notTestedTasks = submission.tasks.filter((task) => task.result === "Not Tested");
  const successPercentage = totalTasks > 0 ? round((successfulTasks / totalTasks) * 100) : 0;
  const averageDifficulty = round(average(submission.tasks.map((task) => task.difficulty)));
  const averageSatisfaction = round(average(submission.satisfaction.map((item) => item.score)));
  const successInterpretation = getSuccessInterpretation(successPercentage);
  const satisfactionInterpretation = getSatisfactionInterpretation(averageSatisfaction);

  const userCommentsSummary = [
    ...submission.tasks
      .filter((task) => task.comment.trim().length > 0)
      .map((task) => `${taskLabel(task, taskBank)} - ${task.comment.trim()}`),
    submission.feedback.problemsFaced ? `Problems faced: ${submission.feedback.problemsFaced}` : "",
    submission.feedback.improvementPart ? `Suggested improvement area: ${submission.feedback.improvementPart}` : "",
    submission.feedback.additionalComments ? `Additional comments: ${submission.feedback.additionalComments}` : ""
  ].filter(Boolean);

  const recommendedImprovements = buildRecommendations(submission, failedTasks, notTestedTasks, averageSatisfaction, taskBank);
  const finalDecision = getFinalDecision(
    successPercentage,
    averageSatisfaction,
    submission.feedback.acceptance,
    failedTasks.length,
    notTestedTasks.length,
    totalTasks
  );

  return {
    totalTasks,
    successfulTasks,
    failedTasks: failedTasks.length,
    notTestedTasks: notTestedTasks.length,
    successPercentage,
    averageDifficulty,
    averageSatisfaction,
    successInterpretation,
    satisfactionInterpretation,
    acceptanceStatusSummary: `Respondent selected "${submission.feedback.acceptance}". System result is ${successInterpretation} with ${satisfactionInterpretation.toLowerCase()} satisfaction.`,
    finalDecision,
    failedTaskDescriptions: failedTasks.map((task) => taskLabel(task, taskBank)),
    notTestedTaskDescriptions: notTestedTasks.map((task) => taskLabel(task, taskBank)),
    userCommentsSummary,
    recommendedImprovements
  };
}

function getFinalDecision(
  successPercentage: number,
  averageSatisfaction: number,
  acceptance: string,
  failedTaskCount: number,
  notTestedTaskCount: number,
  totalTaskCount: number
) {
  const failedPercentage = totalTaskCount > 0 ? (failedTaskCount / totalTaskCount) * 100 : 100;
  const meetsAcceptanceChoice = acceptance === "Yes" || acceptance === "Yes, with minor improvements";
  const meetsDecisionCriteria =
    successPercentage >= 90 &&
    averageSatisfaction >= 3.8 &&
    meetsAcceptanceChoice &&
    failedPercentage <= 10 &&
    notTestedTaskCount === 0;

  if (!meetsDecisionCriteria) {
    return "Not accepted / Needs improvement" as const;
  }

  if (acceptance === "Yes") {
    return "Accepted" as const;
  }

  return "Accepted with minor improvements" as const;
}

function buildRecommendations(
  submission: UatSubmission,
  failedTasks: TaskResponse[],
  notTestedTasks: TaskResponse[],
  averageSatisfaction: number,
  taskBank: UatTask[]
): string[] {
  const recommendations: string[] = [];

  failedTasks.forEach((task) => {
    recommendations.push(`Review and retest ${taskLabel(task, taskBank)} because it was marked as failed.`);
  });

  notTestedTasks.forEach((task) => {
    recommendations.push(`Prepare test data and complete testing for ${taskLabel(task, taskBank)}.`);
  });

  submission.tasks
    .filter((task) => task.difficulty >= 4)
    .forEach((task) => {
      recommendations.push(`Simplify the workflow or add clearer guidance for ${taskLabel(task, taskBank)}.`);
    });

  if (averageSatisfaction < 3.5) {
    recommendations.push("Improve usability, navigation, and interface clarity before the next UAT cycle.");
  }

  if (submission.feedback.improvementPart.trim()) {
    recommendations.push(`Prioritize improvements for: ${submission.feedback.improvementPart.trim()}.`);
  }

  if (recommendations.length === 0) {
    recommendations.push("Maintain the current implementation and perform one final verification round before deployment.");
  }

  return Array.from(new Set(recommendations));
}

export function summarizeDashboard(submissions: UatSubmission[]): DashboardSummary {
  const analyses = submissions.map((submission) => analyzeSubmission(submission));

  return {
    totalRespondents: submissions.length,
    averageSuccessPercentage: round(average(analyses.map((analysis) => analysis.successPercentage))),
    averageSatisfactionScore: round(average(analyses.map((analysis) => analysis.averageSatisfaction))),
    acceptedCount: analyses.filter((analysis) => analysis.finalDecision === "Accepted").length,
    acceptedWithMinorImprovementsCount: analyses.filter((analysis) => analysis.finalDecision === "Accepted with minor improvements").length,
    notAcceptedCount: analyses.filter((analysis) => analysis.finalDecision === "Not accepted / Needs improvement").length
  };
}


