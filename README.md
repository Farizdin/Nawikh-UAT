# Nawikh EduHub UAT System

A web-based User Acceptance Testing system for the Nawikh EduHub final year project. It lets respondents complete role-based UAT tasks, provide satisfaction ratings, submit feedback, and view an automatic analysis summary.

## Features

- Respondent information form
- Admin and tutor task checklists
- Result selection for each task: Successful, Failed, or Not Tested
- Difficulty rating from 1 to 5
- 10 user satisfaction Likert-scale statements
- Open-ended feedback and acceptance choice
- Automatic analysis after submission
- Final UAT decision generation
- Admin dashboard for all submissions
- Individual print / save as PDF report
- Export all UAT results as CSV
- Sample submission loaded automatically on first use
- Local storage persistence, structured for future Supabase migration

## Folder Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  AnalysisPanel.tsx
  Badge.tsx
  Dashboard.tsx
  MetricCard.tsx
  ProgressBar.tsx
  UatForm.tsx
lib/
  analysis.ts
  export.ts
  storage.ts
  types.ts
  uat-data.ts
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
npm run start
```

## Notes

- Data is saved in browser localStorage under `nawikh-eduhub-uat-submissions`.
- Use the dashboard's `Reset Sample Data` button to restore the included sample result.
- The `Export PDF / Print` button opens a printable report. Select `Save as PDF` in the browser print dialog to export a PDF.
- To upgrade to Supabase later, replace the implementation in `lib/storage.ts` while keeping the same submission type from `lib/types.ts`.
