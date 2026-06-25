"use client";

import { supabase, isSupabaseConfigured } from "./supabase";
import { sampleSubmission } from "./uat-data";
import type { UatSubmission } from "./types";

const STORAGE_KEY = "nawikh-eduhub-uat-submissions";
const TABLE_NAME = "uat_submissions";

interface SupabaseSubmissionRow {
  id: string;
  created_at: string;
  submission: UatSubmission;
}

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getLocalSubmissions(): UatSubmission[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    saveLocalSubmissions([sampleSubmission]);
    return [sampleSubmission];
  }

  try {
    const parsed = JSON.parse(raw) as UatSubmission[];
    return Array.isArray(parsed) ? parsed : [sampleSubmission];
  } catch {
    saveLocalSubmissions([sampleSubmission]);
    return [sampleSubmission];
  }
}

function saveLocalSubmissions(submissions: UatSubmission[]): void {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }
}

export function usingSupabase(): boolean {
  return isSupabaseConfigured && supabase !== null;
}

function getSupabaseClient() {
  return usingSupabase() ? supabase : null;
}

export async function getSubmissions(): Promise<UatSubmission[]> {
  const client = getSupabaseClient();

  if (!client) {
    return getLocalSubmissions();
  }

  const { data, error } = await client
    .from(TABLE_NAME)
    .select("id, created_at, submission")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load Supabase submissions", error);
    return getLocalSubmissions();
  }

  const rows = (data ?? []) as SupabaseSubmissionRow[];
  return rows.map((row) => row.submission);
}

export async function addSubmission(submission: UatSubmission): Promise<UatSubmission[]> {
  const client = getSupabaseClient();

  if (!client) {
    const submissions = [submission, ...getLocalSubmissions()];
    saveLocalSubmissions(submissions);
    return submissions;
  }

  const { error } = await client.from(TABLE_NAME).insert({
    id: submission.id,
    created_at: submission.createdAt,
    submission
  });

  if (error) {
    console.error("Unable to save Supabase submission", error);
    const submissions = [submission, ...getLocalSubmissions()];
    saveLocalSubmissions(submissions);
    return submissions;
  }

  return getSubmissions();
}

export async function resetToSampleData(): Promise<UatSubmission[]> {
  const client = getSupabaseClient();

  if (!client) {
    saveLocalSubmissions([sampleSubmission]);
    return [sampleSubmission];
  }

  const { error: deleteError } = await client.from(TABLE_NAME).delete().neq("id", "");

  if (deleteError) {
    console.error("Unable to reset Supabase submissions", deleteError);
    return getSubmissions();
  }

  const { error: insertError } = await client.from(TABLE_NAME).insert({
    id: sampleSubmission.id,
    created_at: sampleSubmission.createdAt,
    submission: sampleSubmission
  });

  if (insertError) {
    console.error("Unable to insert sample Supabase submission", insertError);
  }

  return getSubmissions();
}

