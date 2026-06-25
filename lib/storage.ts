"use client";

import { sampleSubmission } from "./uat-data";
import type { UatSubmission } from "./types";

const STORAGE_KEY = "nawikh-eduhub-uat-submissions";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getSubmissions(): UatSubmission[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    saveSubmissions([sampleSubmission]);
    return [sampleSubmission];
  }

  try {
    const parsed = JSON.parse(raw) as UatSubmission[];
    return Array.isArray(parsed) ? parsed : [sampleSubmission];
  } catch {
    saveSubmissions([sampleSubmission]);
    return [sampleSubmission];
  }
}

export function saveSubmissions(submissions: UatSubmission[]): void {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export function addSubmission(submission: UatSubmission): UatSubmission[] {
  const submissions = [submission, ...getSubmissions()];
  saveSubmissions(submissions);
  return submissions;
}

export function resetToSampleData(): UatSubmission[] {
  saveSubmissions([sampleSubmission]);
  return [sampleSubmission];
}
