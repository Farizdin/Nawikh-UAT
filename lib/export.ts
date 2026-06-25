import { analyzeSubmission } from "./analysis";
import { allTasks, satisfactionStatements } from "./uat-data";
import type { UatSubmission } from "./types";

function csvEscape(value: string | number): string {
  const text = String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export function downloadCsv(submissions: UatSubmission[]): void {
  const header = [
    "Respondent",
    "Role",
    "Testing Date",
    "Device",
    "Browser",
    "Success Percentage",
    "Average Satisfaction",
    "Final Decision",
    "Acceptance Choice"
  ];

  const rows = submissions.map((submission) => {
    const analysis = analyzeSubmission(submission);
    return [
      submission.respondent.name,
      submission.respondent.role === "Other" ? submission.respondent.otherRole : submission.respondent.role,
      submission.respondent.testingDate,
      submission.respondent.device,
      submission.respondent.browser === "Other" ? submission.respondent.otherBrowser : submission.respondent.browser,
      analysis.successPercentage,
      analysis.averageSatisfaction,
      analysis.finalDecision,
      submission.feedback.acceptance
    ];
  });

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadTextFile(csv, "nawikh-eduhub-uat-results.csv", "text/csv;charset=utf-8");
}

function downloadTextFile(content: string, fileName: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function printSubmission(submission: UatSubmission): void {
  const analysis = analyzeSubmission(submission);
  const popup = window.open("", "_blank", "width=960,height=720");

  if (!popup) {
    window.print();
    return;
  }

  const taskRows = submission.tasks
    .map((task) => {
      const taskInfo = allTasks.find((item) => item.id === task.taskId);
      return `<tr><td>${task.taskId}</td><td>${taskInfo?.description ?? task.taskId}</td><td>${task.result}</td><td>${task.difficulty}</td><td>${task.comment}</td></tr>`;
    })
    .join("");

  const satisfactionRows = submission.satisfaction
    .map((item) => {
      const statement = satisfactionStatements.find((statementItem) => statementItem.id === item.statementId);
      return `<tr><td>${statement?.statement ?? item.statementId}</td><td>${item.score}</td></tr>`;
    })
    .join("");

  popup.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Nawikh EduHub UAT Report - ${submission.respondent.name}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #172554; margin: 32px; }
          h1, h2 { color: #1d4ed8; }
          table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          th, td { border: 1px solid #bfdbfe; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #eff6ff; }
          .metric { display: inline-block; margin: 8px 16px 8px 0; padding: 10px 12px; background: #eff6ff; border: 1px solid #bfdbfe; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <button onclick="window.print()">Print or Save as PDF</button>
        <h1>Nawikh EduHub UAT Report</h1>
        <p><strong>Respondent:</strong> ${submission.respondent.name}</p>
        <p><strong>Role:</strong> ${submission.respondent.role}</p>
        <p><strong>Date:</strong> ${submission.respondent.testingDate}</p>
        <div class="metric"><strong>Success:</strong> ${analysis.successPercentage}%</div>
        <div class="metric"><strong>Satisfaction:</strong> ${analysis.averageSatisfaction}</div>
        <div class="metric"><strong>Decision:</strong> ${analysis.finalDecision}</div>
        <h2>Task Checklist</h2>
        <table><thead><tr><th>ID</th><th>Task</th><th>Result</th><th>Difficulty</th><th>Comment</th></tr></thead><tbody>${taskRows}</tbody></table>
        <h2>Satisfaction Rating</h2>
        <table><thead><tr><th>Statement</th><th>Score</th></tr></thead><tbody>${satisfactionRows}</tbody></table>
        <h2>Analysis</h2>
        <p>${analysis.acceptanceStatusSummary}</p>
        <p><strong>Recommendations:</strong></p>
        <ul>${analysis.recommendedImprovements.map((item) => `<li>${item}</li>`).join("")}</ul>
      </body>
    </html>
  `);
  popup.document.close();
  popup.focus();
}
