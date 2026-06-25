"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminAccess } from "@/components/AdminAccess";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { Dashboard } from "@/components/Dashboard";
import { UatForm } from "@/components/UatForm";
import { t, type Locale } from "@/lib/i18n";
import { addSubmission, getSubmissions, resetToSampleData } from "@/lib/storage";
import type { UatSubmission } from "@/lib/types";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [submissions, setSubmissions] = useState<UatSubmission[]>([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedSubmissions = getSubmissions();
      setSubmissions(storedSubmissions);
      setSelectedSubmissionId(storedSubmissions[0]?.id ?? null);
      setAdminUnlocked(window.sessionStorage.getItem("nawikh-uat-owner-unlocked") === "true");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedSubmission = useMemo(
    () => submissions.find((submission) => submission.id === selectedSubmissionId) ?? submissions[0],
    [selectedSubmissionId, submissions]
  );

  function handleSubmit(submission: UatSubmission) {
    const nextSubmissions = addSubmission(submission);
    setSubmissions(nextSubmissions);
    setSelectedSubmissionId(submission.id);
    setSubmittedName(submission.respondent.name);
    window.setTimeout(() => {
      document.getElementById("owner-access")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleUnlock() {
    window.sessionStorage.setItem("nawikh-uat-owner-unlocked", "true");
    setAdminUnlocked(true);
  }

  function handleLock() {
    window.sessionStorage.removeItem("nawikh-uat-owner-unlocked");
    setAdminUnlocked(false);
  }

  function handleResetSample() {
    const sample = resetToSampleData();
    setSubmissions(sample);
    setSelectedSubmissionId(sample[0]?.id ?? null);
  }

  return (
    <main>
      <header className="border-b border-cyan-400/30 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{t(locale, "finalYearProjectUat")}</p>
            <h1 className="mt-1 text-3xl font-bold text-white">{t(locale, "appTitle")}</h1>
            <p className="mt-2 max-w-3xl text-sm text-cyan-50/80">{t(locale, "appDescription")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex flex-wrap gap-2 text-sm font-semibold">
              <a className="rounded border border-cyan-300/50 bg-white/10 px-3 py-2 text-cyan-50 hover:bg-white/20" href="#uat-form">
                {t(locale, "uatForm")}
              </a>
              <a className="rounded border border-cyan-300/50 bg-white/10 px-3 py-2 text-cyan-50 hover:bg-white/20" href="#owner-access">
                {locale === "en" ? "Owner Access" : "Akses Pemilik"}
              </a>
              {adminUnlocked ? (
                <a className="rounded border border-cyan-300/50 bg-white/10 px-3 py-2 text-cyan-50 hover:bg-white/20" href="#dashboard">
                  {t(locale, "dashboard")}
                </a>
              ) : null}
            </nav>
            <label className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
              {t(locale, "language")}
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="rounded border border-cyan-300/60 bg-slate-900 px-3 py-2 text-cyan-50 outline-none focus:border-brand-600 focus:ring-2 focus:ring-cyan-400/40"
              >
                <option value="en">{t(locale, "english")}</option>
                <option value="ms">{t(locale, "bahasaMalaysia")}</option>
              </select>
            </label>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-5 rounded-lg border border-cyan-300/30 bg-slate-900/75 p-5 shadow-soft backdrop-blur lg:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-cyan-200">{t(locale, "systemContext")}</p>
            <p className="mt-2 text-sm text-cyan-50/85">{t(locale, "systemContextText")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-cyan-200">{t(locale, "testingMethod")}</p>
            <p className="mt-2 text-sm text-cyan-50/85">{t(locale, "testingMethodText")}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-cyan-200">{t(locale, "storage")}</p>
            <p className="mt-2 text-sm text-cyan-50/85">{t(locale, "storageText")}</p>
          </div>
        </section>

        <section id="uat-form">
          <UatForm locale={locale} onSubmit={handleSubmit} />
        </section>

        {submittedName && !adminUnlocked ? (
          <section className="rounded-lg border border-emerald-300/40 bg-slate-900/80 p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              {locale === "en" ? "Submission Received" : "Penyerahan Diterima"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-brand-900">
              {locale === "en" ? `Thank you, ${submittedName}` : `Terima kasih, ${submittedName}`}
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              {locale === "en"
                ? "Your UAT response has been saved. The analysis and admin dashboard are only visible to the project owner."
                : "Respons UAT anda telah disimpan. Analisis dan papan pemuka admin hanya boleh dilihat oleh pemilik projek."}
            </p>
          </section>
        ) : null}

        <section id="owner-access" className="scroll-mt-6">
          <AdminAccess locale={locale} unlocked={adminUnlocked} onUnlock={handleUnlock} onLock={handleLock} />
        </section>

        {adminUnlocked ? (
          <>
            <section id="latest-analysis" className="scroll-mt-6">
              {selectedSubmission ? <AnalysisPanel locale={locale} submission={selectedSubmission} /> : null}
            </section>

            <section id="dashboard" className="scroll-mt-6">
              <Dashboard
                locale={locale}
                submissions={submissions}
                selectedSubmissionId={selectedSubmission?.id ?? null}
                onSelectSubmission={setSelectedSubmissionId}
                onResetSample={handleResetSample}
              />
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}


