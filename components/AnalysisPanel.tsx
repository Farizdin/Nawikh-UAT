"use client";

import { analyzeSubmission } from "@/lib/analysis";
import { printSubmission } from "@/lib/export";
import {
  acceptanceLabels,
  decisionLabels,
  satisfactionInterpretationLabels,
  successInterpretationLabels,
  t,
  taskText,
  type Locale
} from "@/lib/i18n";
import type { TaskResponse, UatSubmission } from "@/lib/types";
import { Badge } from "./Badge";
import { MetricCard } from "./MetricCard";
import { ProgressBar } from "./ProgressBar";

interface AnalysisPanelProps {
  locale: Locale;
  submission: UatSubmission;
}

function decisionTone(decision: string) {
  if (decision === "Accepted") {
    return "green" as const;
  }

  if (decision === "Accepted with minor improvements") {
    return "amber" as const;
  }

  return "red" as const;
}

export function AnalysisPanel({ locale, submission }: AnalysisPanelProps) {
  const analysis = analyzeSubmission(submission);
  const failedTasks = submission.tasks.filter((task) => task.result === "Failed");
  const notTestedTasks = submission.tasks.filter((task) => task.result === "Not Tested");
  const localizedComments = buildComments(locale, submission);
  const localizedRecommendations = buildRecommendations(locale, submission, failedTasks, notTestedTasks, analysis.averageSatisfaction);
  const successInterpretation = successInterpretationLabels[locale][analysis.successInterpretation] ?? analysis.successInterpretation;
  const satisfactionInterpretation = satisfactionInterpretationLabels[locale][analysis.satisfactionInterpretation] ?? analysis.satisfactionInterpretation;
  const decision = decisionLabels[locale][analysis.finalDecision];

  return (
    <section className="rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 p-5 shadow-soft">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{t(locale, "automaticAnalysis")}</p>
          <h2 className="mt-1 text-xl font-bold text-brand-900">{submission.respondent.name}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {locale === "en"
              ? `Respondent selected "${acceptanceLabels[locale][submission.feedback.acceptance]}". System result is ${successInterpretation} with ${satisfactionInterpretation.toLowerCase()} satisfaction.`
              : `Responden memilih "${acceptanceLabels[locale][submission.feedback.acceptance]}". Keputusan sistem ialah ${successInterpretation} dengan tahap kepuasan ${satisfactionInterpretation.toLowerCase()}.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={decisionTone(analysis.finalDecision)}>{decision}</Badge>
          <button
            type="button"
            onClick={() => printSubmission(submission)}
            className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t(locale, "exportPdfPrint")}
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label={t(locale, "totalUatTasks")} value={analysis.totalTasks} />
        <MetricCard label={t(locale, "successfulTasks")} value={analysis.successfulTasks} />
        <MetricCard label={t(locale, "failedTasks")} value={analysis.failedTasks} />
        <MetricCard label={t(locale, "notTested")} value={analysis.notTestedTasks} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-cyan-200 bg-white/55 p-4">
          <ProgressBar label={`${t(locale, "successPercentage")} (${successInterpretation})`} value={analysis.successPercentage} />
          <div className="grid gap-3 sm:grid-cols-2">
            <MetricCard label={t(locale, "averageDifficulty")} value={analysis.averageDifficulty} subtext={t(locale, "difficultyHelp")} />
            <MetricCard label={t(locale, "averageSatisfaction")} value={analysis.averageSatisfaction} subtext={satisfactionInterpretation} />
          </div>
        </div>

        <div className="rounded-lg border border-cyan-200 bg-white/55 p-4">
          <h3 className="text-base font-bold text-brand-900">{t(locale, "finalUatDecision")}</h3>
          <p className="mt-2 text-sm text-slate-600">{t(locale, "decisionExplanation")}</p>
          <div className="mt-4">
            <Badge tone={decisionTone(analysis.finalDecision)}>{decision}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ListBlock title={t(locale, "failedTaskList")} items={formatTasks(locale, failedTasks)} emptyText={t(locale, "noFailedTasks")} tone="red" />
        <ListBlock title={t(locale, "notTestedTaskList")} items={formatTasks(locale, notTestedTasks)} emptyText={t(locale, "noNotTestedTasks")} tone="amber" />
        <ListBlock title={t(locale, "commentsSummary")} items={localizedComments} emptyText={t(locale, "noComments")} tone="blue" />
        <ListBlock title={t(locale, "recommendedImprovements")} items={localizedRecommendations} emptyText={t(locale, "noImprovements")} tone="green" />
      </div>
    </section>
  );
}

function formatTasks(locale: Locale, tasks: TaskResponse[]) {
  return tasks.map((task) => `${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId}`);
}

function buildComments(locale: Locale, submission: UatSubmission): string[] {
  const labels =
    locale === "en"
      ? {
          problems: "Problems faced",
          improvement: "Suggested improvement area",
          additional: "Additional comments"
        }
      : {
          problems: "Masalah dihadapi",
          improvement: "Bahagian dicadangkan untuk ditambah baik",
          additional: "Komen tambahan"
        };

  return [
    ...submission.tasks
      .filter((task) => task.comment.trim().length > 0)
      .map((task) => `${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId} - ${task.comment.trim()}`),
    submission.feedback.problemsFaced ? `${labels.problems}: ${submission.feedback.problemsFaced}` : "",
    submission.feedback.improvementPart ? `${labels.improvement}: ${submission.feedback.improvementPart}` : "",
    submission.feedback.additionalComments ? `${labels.additional}: ${submission.feedback.additionalComments}` : ""
  ].filter(Boolean);
}

function buildRecommendations(
  locale: Locale,
  submission: UatSubmission,
  failedTasks: TaskResponse[],
  notTestedTasks: TaskResponse[],
  averageSatisfaction: number
): string[] {
  const recommendations: string[] = [];

  failedTasks.forEach((task) => {
    recommendations.push(
      locale === "en"
        ? `Review and retest ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId} because it was marked as failed.`
        : `Semak dan uji semula ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId} kerana tugasan ini ditanda sebagai gagal.`
    );
  });

  notTestedTasks.forEach((task) => {
    recommendations.push(
      locale === "en"
        ? `Prepare test data and complete testing for ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId}.`
        : `Sediakan data ujian dan lengkapkan ujian untuk ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId}.`
    );
  });

  submission.tasks
    .filter((task) => task.difficulty >= 4)
    .forEach((task) => {
      recommendations.push(
        locale === "en"
          ? `Simplify the workflow or add clearer guidance for ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId}.`
          : `Permudahkan aliran kerja atau tambah panduan yang lebih jelas untuk ${task.taskId}: ${taskText[locale][task.taskId] ?? task.taskId}.`
      );
    });

  if (averageSatisfaction < 3.5) {
    recommendations.push(
      locale === "en"
        ? "Improve usability, navigation, and interface clarity before the next UAT cycle."
        : "Tambah baik kebolehgunaan, navigasi, dan kejelasan antara muka sebelum kitaran UAT seterusnya."
    );
  }

  if (submission.feedback.improvementPart.trim()) {
    recommendations.push(
      locale === "en"
        ? `Prioritize improvements for: ${submission.feedback.improvementPart.trim()}.`
        : `Utamakan penambahbaikan untuk: ${submission.feedback.improvementPart.trim()}.`
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      locale === "en"
        ? "Maintain the current implementation and perform one final verification round before deployment."
        : "Kekalkan pelaksanaan semasa dan lakukan satu pusingan pengesahan akhir sebelum pelaksanaan."
    );
  }

  return Array.from(new Set(recommendations));
}

interface ListBlockProps {
  title: string;
  items: string[];
  emptyText: string;
  tone: "blue" | "green" | "amber" | "red";
}

function ListBlock({ title, items, emptyText, tone }: ListBlockProps) {
  return (
    <div className="rounded-lg border border-cyan-200 bg-white/55 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-bold text-brand-900">{title}</h3>
        <Badge tone={tone}>{items.length}</Badge>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-2 text-sm text-slate-700">
          {items.map((item) => (
            <li key={item} className="rounded border border-cyan-100 bg-white/65 p-2">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">{emptyText}</p>
      )}
    </div>
  );
}


