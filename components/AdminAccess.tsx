"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

const ADMIN_PIN = "4902";

interface AdminAccessProps {
  locale: Locale;
  unlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
}

export function AdminAccess({ locale, unlocked, onUnlock, onLock }: AdminAccessProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pin === ADMIN_PIN) {
      setError("");
      setPin("");
      onUnlock();
      return;
    }

    setError(locale === "en" ? "Incorrect PIN. Please try again." : "PIN tidak betul. Sila cuba lagi.");
  }

  if (unlocked) {
    return (
      <div className="rounded-lg border border-emerald-300/40 bg-slate-900/80 p-5 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
              {locale === "en" ? "Owner Access Enabled" : "Akses Pemilik Diaktifkan"}
            </p>
            <p className="mt-1 text-sm text-cyan-50/85">
              {locale === "en"
                ? "Automatic analysis and admin dashboard are visible only while this access is unlocked."
                : "Analisis automatik dan papan pemuka admin hanya dipaparkan apabila akses ini dibuka."}
            </p>
          </div>
          <button
            type="button"
            onClick={onLock}
            className="rounded border border-emerald-300/50 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 hover:bg-white/20"
          >
            {locale === "en" ? "Lock Owner View" : "Kunci Paparan Pemilik"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-cyan-300/30 bg-slate-900/80 p-5 shadow-soft">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-200">
            {locale === "en" ? "Owner Access" : "Akses Pemilik"}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            {locale === "en" ? "Analysis and dashboard are hidden" : "Analisis dan papan pemuka disembunyikan"}
          </h2>
          <p className="mt-2 text-sm text-cyan-50/85">
            {locale === "en"
              ? "Respondents can submit the UAT form, but only the project owner can view automatic analysis and all submissions."
              : "Responden boleh menghantar borang UAT, tetapi hanya pemilik projek boleh melihat analisis automatik dan semua penyerahan."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-cyan-300/30 bg-white/10 p-4">
          <label className="block">
            <span className="text-sm font-semibold text-cyan-50/85">{locale === "en" ? "Owner PIN" : "PIN Pemilik"}</span>
            <input
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              type="password"
              inputMode="numeric"
              className="mt-1 w-full rounded border border-cyan-300/40 bg-slate-950/80 px-3 py-2 text-cyan-50 outline-none focus:border-brand-600 focus:ring-2 focus:ring-cyan-400/40"
              placeholder={locale === "en" ? "Enter PIN" : "Masukkan PIN"}
            />
          </label>
          {error ? <p className="mt-2 text-sm font-medium text-red-700">{error}</p> : null}
          <button type="submit" className="mt-4 w-full rounded bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700">
            {locale === "en" ? "Unlock Analysis" : "Buka Analisis"}
          </button>
        </form>
      </div>
    </section>
  );
}


