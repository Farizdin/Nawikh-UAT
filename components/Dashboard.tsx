"use client";

import { analyzeSubmission, summarizeDashboard } from "@/lib/analysis";
import { downloadCsv, printSubmission } from "@/lib/export";
import { decisionLabels, roleLabels, t, type Locale } from "@/lib/i18n";
import type { UatSubmission } from "@/lib/types";
import { Badge } from "./Badge";
import { MetricCard } from "./MetricCard";

interface DashboardProps {
  locale: Locale;
  submissions: UatSubmission[];
  selectedSubmissionId: string | null;
  onSelectSubmission: (id: string) => void;
  onResetSample: () => void;
}

export function Dashboard({ locale, submissions, selectedSubmissionId, onSelectSubmission, onResetSample }: DashboardProps) {
  const summary = summarizeDashboard(submissions);

  return (
    <section className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 via-cyan-50 to-orange-50 p-5 shadow-soft">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{t(locale, "adminDashboard")}</p>
          <h2 className="mt-1 text-xl font-bold text-brand-900">{t(locale, "allSubmissions")}</h2>
          <p className="mt-1 text-sm text-slate-600">{t(locale, "dashboardDescription")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadCsv(submissions)}
            className="rounded border border-brand-600 px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-cyan-50"
          >
            {t(locale, "exportAllCsv")}
          </button>
          <button
            type="button"
            onClick={onResetSample}
            className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {t(locale, "resetSampleData")}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard label={t(locale, "totalRespondents")} value={summary.totalRespondents} />
        <MetricCard label={t(locale, "avgSuccess")} value={`${summary.averageSuccessPercentage}%`} />
        <MetricCard label={t(locale, "avgSatisfaction")} value={summary.averageSatisfactionScore} />
        <MetricCard label={t(locale, "accepted")} value={summary.acceptedCount} />
        <MetricCard label={t(locale, "minorImprovements")} value={summary.acceptedWithMinorImprovementsCount} />
        <MetricCard label={t(locale, "notAccepted")} value={summary.notAcceptedCount} />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "respondent")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "role")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "date")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "success")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "satisfaction")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "decision")}</th>
              <th className="border-b border-slate-200 px-3 py-3">{t(locale, "action")}</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const analysis = analyzeSubmission(submission);
              const selected = selectedSubmissionId === submission.id;
              return (
                <tr key={submission.id} className={selected ? "bg-amber-100/70" : "bg-white/35"}>
                  <td className="border-b border-slate-100 px-3 py-3 font-semibold text-brand-900">{submission.respondent.name}</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-700">{displayRole(locale, submission)}</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-700">{submission.respondent.testingDate}</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-700">{analysis.successPercentage}%</td>
                  <td className="border-b border-slate-100 px-3 py-3 text-slate-700">{analysis.averageSatisfaction}</td>
                  <td className="border-b border-slate-100 px-3 py-3">
                    <Badge tone={badgeTone(analysis.finalDecision)}>{decisionLabels[locale][analysis.finalDecision]}</Badge>
                  </td>
                  <td className="border-b border-slate-100 px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectSubmission(submission.id)}
                        className="rounded bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                      >
                        {t(locale, "viewAnalysis")}
                      </button>
                      <button
                        type="button"
                        onClick={() => printSubmission(submission)}
                        className="rounded border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        {t(locale, "print")}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function displayRole(locale: Locale, submission: UatSubmission): string {
  return submission.respondent.role === "Other" ? submission.respondent.otherRole : roleLabels[locale][submission.respondent.role];
}

function badgeTone(decision: string) {
  if (decision === "Accepted") {
    return "green" as const;
  }

  if (decision === "Accepted with minor improvements") {
    return "amber" as const;
  }

  return "red" as const;
}


