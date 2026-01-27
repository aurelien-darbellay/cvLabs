# My CV App

A React + Vite application for creating, managing, and exporting professional CVs. It uses Supabase for auth/data and supports multiple CV layouts, multilingual content, drag-and-drop ordering, and PDF export.

## Features
- Authenticated dashboard with profile editing.
- CV creation and management.
- Asset library for education, experience, profession, tech skills, soft skills, summaries, and language skills.
- Per-asset translations for multilingual CVs.
- Drag-and-drop ordering of CV sections/assets.
- Multiple CV layouts (Standard, Two Column, Impact/Academic).
- PDF export of the CV view (A4 with optional single-page scaling).
- Cloudinary image upload via Supabase Edge Function signature.

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth + DB + Edge Functions)
- @dnd-kit for drag-and-drop
- html2canvas + jsPDF for PDF export

## Project Structure
- `src/pages` - top-level routes/pages
- `src/components` - UI, CV layouts, dashboard components
- `src/services` - Supabase CRUD services and asset relations
- `src/domain` - domain models and serialization
- `src/hooks` - data fetching hooks
- `src/contexts` - shared React contexts
- `src/utils` - helpers (PDF export, scaling, normalization)
- `src/config` - API endpoints and configuration

## Routes
- `/` - Landing page (login or dashboard)
- `/cv/:cvId` - CV viewer with layout/language selectors and PDF export
- `/cv/:cvId/manage-assets` - add/remove and reorder assets inside a CV
- `/manage-assets/:assetType` - manage asset catalog by type
- `/test` - internal testing page

## Setup
1) Install dependencies:
```
npm install
```

2) Configure environment variables:
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3) Start the dev server:
```
npm run dev
```

## Supabase Notes
This app expects a Supabase project with the required tables and Edge Functions.

Edge Functions used (see `src/config/ApiEndpoints.ts`):
- `export-experience`
- `export-education`
- `export-summaries`
- `export-softskill`
- `export-professions`
- `export-language-skills`
- `sign-cloudinary`

If your Supabase project URL is different, update both:
- `.env` (`VITE_SUPABASE_URL`)
- `src/config/ApiEndpoints.ts` (`SUPABASE_BASE_URL`)

## Cloudinary Uploads
Image uploads are signed by the `sign-cloudinary` Edge Function. Ensure that:
- The function returns `cloudName`, `apiKey`, `timestamp`, `signature`, and `folder`.
- Your Cloudinary credentials are configured as Supabase secrets for the function.

## Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build

## Tips
- CV layouts and section labels live under `src/components/cv/layouts`.
- Translation support is driven by `src/domain/translations` and the language list from Supabase.
- PDF export is implemented in `src/utils/pdf.ts`.
