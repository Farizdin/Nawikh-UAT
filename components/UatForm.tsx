"use client";

import { useMemo, useState } from "react";
import { createSatisfactionResponses, createTaskResponses, getSatisfactionStatementsForRole, getTasksForRole } from "@/lib/uat-data";
import {
  acceptanceLabels,
  browserLabels,
  deviceLabels,
  likertText,
  resultLabels,
  roleLabels,
  satisfactionText,
  t,
  taskText,
  type Locale
} from "@/lib/i18n";
import type {
  AcceptanceChoice,
  BrowserUsed,
  DeviceUsed,
  RespondentInfo,
  RespondentRole,
  SatisfactionResponse,
  TaskResponse,
  TaskResult,
  UatSubmission
} from "@/lib/types";

interface UatFormProps {
  locale: Locale;
  onSubmit: (submission: UatSubmission) => void;
}

const today = new Date().toISOString().slice(0, 10);

const initialRespondent: RespondentInfo = {
  name: "",
  role: "Admin",
  otherRole: "",
  testingDate: today,
  device: "Laptop",
  browser: "Chrome",
  otherBrowser: ""
};

const roleOptions: RespondentRole[] = ["Admin", "Tutor", "Parent Representative", "Other"];
const deviceOptions: DeviceUsed[] = ["Laptop", "Smartphone", "Tablet"];
const browserOptions: BrowserUsed[] = ["Chrome", "Edge", "Safari", "Firefox", "Other"];
const resultOptions: TaskResult[] = ["Successful", "Failed", "Not Tested"];
const acceptanceOptions: AcceptanceChoice[] = ["Yes", "Yes, with minor improvements", "No"];

export function UatForm({ locale, onSubmit }: UatFormProps) {
  const [respondent, setRespondent] = useState<RespondentInfo>(initialRespondent);
  const roleTasks = getTasksForRole(respondent.role);
  const [tasks, setTasks] = useState<TaskResponse[]>(createTaskResponses(roleTasks));
  const [satisfaction, setSatisfaction] = useState<SatisfactionResponse[]>(createSatisfactionResponses());
  const [feedback, setFeedback] = useState({
    problemsFaced: "",
    improvementPart: "",
    additionalComments: "",
    acceptance: "Yes, with minor improvements" as AcceptanceChoice
  });

  const visibleTasks = useMemo(() => getTasksForRole(respondent.role), [respondent.role]);

  const visibleSatisfactionStatements = useMemo(() => getSatisfactionStatementsForRole(respondent.role), [respondent.role]);

  function updateRespondent<K extends keyof RespondentInfo>(key: K, value: RespondentInfo[K]) {
    setRespondent((current) => {
      const next = { ...current, [key]: value };

      if (key === "role") {
        const nextRole = value as RespondentRole;
        const nextTasks = getTasksForRole(nextRole);
        setTasks(createTaskResponses(nextTasks));
        setSatisfaction(createSatisfactionResponses(nextRole));
      }

      return next;
    });
  }

  function updateTask(taskId: string, changes: Partial<TaskResponse>) {
    setTasks((current) => current.map((task) => (task.taskId === taskId ? { ...task, ...changes } : task)));
  }

  function updateSatisfaction(statementId: string, score: number) {
    setSatisfaction((current) => current.map((item) => (item.statementId === statementId ? { ...item, score } : item)));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submission: UatSubmission = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      respondent,
      tasks,
      satisfaction,
      feedback
    };

    onSubmit(submission);
    window.setTimeout(() => {
      document.getElementById("latest-analysis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-lg border border-emerald-200 bg-emerald-50/90 p-5 shadow-soft">
        <SectionHeader eyebrow={t(locale, "section1")} title={t(locale, "respondentInformation")} />
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TextInput label={t(locale, "respondentName")} value={respondent.name} onChange={(value) => updateRespondent("name", value)} required />
          <SelectInput
            label={t(locale, "role")}
            value={respondent.role}
            options={roleOptions.map((value) => ({ value, label: roleLabels[locale][value] }))}
            onChange={(value) => updateRespondent("role", value as RespondentRole)}
          />
          {respondent.role === "Other" ? (
            <TextInput label={t(locale, "otherRole")} value={respondent.otherRole} onChange={(value) => updateRespondent("otherRole", value)} required />
          ) : null}
          <TextInput label={t(locale, "dateOfTesting")} type="date" value={respondent.testingDate} onChange={(value) => updateRespondent("testingDate", value)} required />
          <SelectInput
            label={t(locale, "deviceUsed")}
            value={respondent.device}
            options={deviceOptions.map((value) => ({ value, label: deviceLabels[locale][value] }))}
            onChange={(value) => updateRespondent("device", value as DeviceUsed)}
          />
          <SelectInput
            label={t(locale, "browserUsed")}
            value={respondent.browser}
            options={browserOptions.map((value) => ({ value, label: browserLabels[locale][value] }))}
            onChange={(value) => updateRespondent("browser", value as BrowserUsed)}
          />
          {respondent.browser === "Other" ? (
            <TextInput label={t(locale, "otherBrowser")} value={respondent.otherBrowser} onChange={(value) => updateRespondent("otherBrowser", value)} required />
          ) : null}
        </div>
      </section>

      <section className="rounded-lg border border-sky-200 bg-sky-50/90 p-5 shadow-soft">
        <SectionHeader eyebrow={t(locale, "section2")} title={t(locale, "taskChecklist")} />
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="border-b border-slate-200 px-3 py-3">{t(locale, "taskId")}</th>
                <th className="border-b border-slate-200 px-3 py-3">{t(locale, "taskDescription")}</th>
                <th className="border-b border-slate-200 px-3 py-3">{t(locale, "result")}</th>
                <th className="border-b border-slate-200 px-3 py-3">{t(locale, "difficulty")}</th>
                <th className="border-b border-slate-200 px-3 py-3">{t(locale, "comment")}</th>
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map((task) => {
                const response = tasks.find((item) => item.taskId === task.id);
                return (
                  <tr key={task.id} className="align-top">
                    <td className="border-b border-slate-100 px-3 py-3 font-semibold text-brand-700">{task.id}</td>
                    <td className="border-b border-slate-100 px-3 py-3 text-slate-700">{taskText[locale][task.id]}</td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <select
                        value={response?.result ?? "Not Tested"}
                        onChange={(event) => updateTask(task.id, { result: event.target.value as TaskResult })}
                        className="w-36 rounded border border-slate-300 bg-white/85 px-2 py-2"
                      >
                        {resultOptions.map((option) => (
                          <option key={option} value={option}>
                            {resultLabels[locale][option]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <select
                        value={response?.difficulty ?? 3}
                        onChange={(event) => updateTask(task.id, { difficulty: Number(event.target.value) })}
                        className="w-20 rounded border border-slate-300 bg-white/85 px-2 py-2"
                      >
                        {[1, 2, 3, 4, 5].map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <textarea
                        value={response?.comment ?? ""}
                        onChange={(event) => updateTask(task.id, { comment: event.target.value })}
                        className="min-h-20 w-64 rounded border border-slate-300 bg-white/85 px-3 py-2"
                        placeholder={t(locale, "optionalComment")}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-violet-200 bg-violet-50/90 p-5 shadow-soft">
        <SectionHeader eyebrow={t(locale, "section3")} title={t(locale, "satisfactionRating")} />
        <div className="mt-5 space-y-4">
          {visibleSatisfactionStatements.map((statement) => {
            const currentScore = satisfaction.find((item) => item.statementId === statement.id)?.score ?? 3;
            return (
              <div key={statement.id} className="grid gap-3 rounded border border-violet-200 bg-white/55 p-4 lg:grid-cols-[1fr_260px]">
                <div>
                  <p className="font-medium text-slate-800">{satisfactionText[locale][statement.id]}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {t(locale, "currentScore")}: {likertText[locale][currentScore]}
                  </p>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => updateSatisfaction(statement.id, score)}
                      className={`h-10 rounded border text-sm font-semibold ${
                        currentScore === score
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-violet-200 bg-white/75 text-slate-700 hover:border-brand-500"
                      }`}
                      title={likertText[locale][score]}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-orange-200 bg-orange-50/90 p-5 shadow-soft">
        <SectionHeader eyebrow={t(locale, "section4")} title={t(locale, "openFeedback")} />
        <div className="mt-5 grid gap-4">
          <TextareaInput
            label={t(locale, "problemsQuestion")}
            value={feedback.problemsFaced}
            onChange={(value) => setFeedback((current) => ({ ...current, problemsFaced: value }))}
          />
          <TextareaInput
            label={t(locale, "improvementQuestion")}
            value={feedback.improvementPart}
            onChange={(value) => setFeedback((current) => ({ ...current, improvementPart: value }))}
          />
          <TextareaInput
            label={t(locale, "additionalQuestion")}
            value={feedback.additionalComments}
            onChange={(value) => setFeedback((current) => ({ ...current, additionalComments: value }))}
          />
          <SelectInput
            label={t(locale, "acceptanceQuestion")}
            value={feedback.acceptance}
            options={acceptanceOptions.map((value) => ({ value, label: acceptanceLabels[locale][value] }))}
            onChange={(value) => setFeedback((current) => ({ ...current, acceptance: value as AcceptanceChoice }))}
          />
        </div>
      </section>

      <section className="rounded-lg border border-cyan-200 bg-cyan-50/90 p-5 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{t(locale, "confirmationTitle")}</p>
        <label className="mt-3 flex gap-3 rounded border border-cyan-200 bg-white/65 p-4 text-sm font-medium text-slate-700">
          <input required type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
          <span>{t(locale, "confirmationStatement")}</span>
        </label>
      </section>

      <div className="flex justify-end">
        <button type="submit" className="rounded bg-brand-600 px-5 py-3 font-semibold text-white shadow-soft hover:bg-brand-700">
          {t(locale, "submitResponse")}
        </button>
      </div>
    </form>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>
      <h2 className="mt-1 text-xl font-bold text-brand-900">{title}</h2>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded border border-slate-300 bg-white/85 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded border border-slate-300 bg-white/85 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-cyan-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 min-h-24 w-full rounded border border-slate-300 bg-white/85 px-3 py-2 outline-none focus:border-brand-600 focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  );
}






