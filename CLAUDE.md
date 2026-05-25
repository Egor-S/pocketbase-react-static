# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend (PocketBase/Go)
```bash
cd pocketbase
go run . serve        # Serves on :8090, auto-applies migrations
```

### Frontend (React)
```bash
cd react
npm run dev           # Vite dev server (proxies /api and /_ to :8090)
npm run build         # TypeScript compile + Vite bundle
npm run lint          # ESLint
npm run typegen       # Regenerate pocketbase.gen.ts from live schema (requires PocketBase running)
```

### Storybook / Tests
```bash
cd react
npm run storybook          # Component explorer on :6006
npx vitest                 # Run Vitest tests (story-based via Playwright)
npx vitest run --coverage  # With coverage
```

### shadcn/ui components
```bash
cd react && npx shadcn@latest add <component>
```
Components install into `src/components/ui/`. Import via `@/components/ui/<name>`.

## Architecture

### Monorepo structure
- `pocketbase/` — Go backend (PocketBase framework)
- `react/` — Vite + React SPA

### Request flow
- **Dev**: Vite dev server proxies `/api` and `/_` to PocketBase on `:8090`
- **Production**: Go binary embeds `react/dist` as `pb_public` and serves everything on `:8090` (single binary)

### Backend (`/pocketbase`)
- `main.go` — embeds React dist, registers migrations and hooks, starts PocketBase
- `migrations/` — Go migration files, auto-run on startup
- `hooks/register.go` — PocketBase event hooks (add new hooks here)

### Frontend (`/react/src`)
- `main.tsx` — React root; wraps with TanStack Router + TanStack Query providers
- `routes/` — **File-based routing** (TanStack Router). Auto-generates `routeTree.gen.ts` — never edit that file manually. Guard groups: `_auth/` requires user session, `_admin/` requires admin session.
- `api/` — TanStack Query option factories (queryOptions/mutationOptions). Organized by domain.
- `lib/pocketbase.ts` — two PocketBase client instances: `pb` (user, localStorage auth) and `pbAdmin` (admin, separate localStorage key). Both typed as `TypedPocketBase`.
- `components/ui/` — shadcn/ui primitives (Radix UI + Tailwind)
- `types/pocketbase.gen.ts` — auto-generated from schema; regenerate with `npm run typegen` after any schema change

### Auth pattern
Auth state lives in TanStack Query (`UserQueryOptions`). Guard route groups check the cached query on load and redirect to login if missing — they do not re-fetch. Token auto-refreshes every 30 minutes. Guard groups are **UI-only**: JS bundles are publicly accessible, so always gate sensitive data server-side.

### Type generation workflow
1. Run PocketBase: `cd pocketbase && go run . serve`
2. Define/modify collections in the PocketBase admin UI
3. Regenerate types: `cd react && npm run typegen`

`postprocess-typegen.js` converts generated enums to `const` objects (required for TypeScript erasable syntax).

## Key Conventions

- **Routing**: add route files under `src/routes/`; never manually edit `routeTree.gen.ts`
- **Storybook**: stories live alongside components (`ComponentName.stories.tsx`); update the story whenever you change a component. `.storybook/tanstack.tsx` provides TanStack Router/Query decorators for stories.
- **Path aliases**: `@/` maps to `src/` in both Vite and TypeScript config
- **Dialog state reset**: use event handlers to reset form state, not `useEffect` (`react-hooks/set-state-in-effect` lint rule)
- **Uncontrolled inputs tracking a record**: use `<input key={record.id} defaultValue={...} />` to force re-mount when the record changes
- **`.tsx` files**: may only export React components; move utility functions to `.ts` files (`react-refresh/only-export-components`)
- **Story render functions**: use named uppercase functions (`render: function StoryName() { ... }`) to satisfy `rules-of-hooks`

## Gotchas

- **Route tree stale after adding route files**: `npm run build` (which runs `tsc -b`) will fail against the stale tree. Fix: run `npx vite build --mode development` once to regenerate `routeTree.gen.ts`, then re-run `npm run build`.
- **Splat route navigation**: `navigate({ to: '/$', params: { _splat } })` doesn't type-check. Use `navigate({ href: \`/${path}\` })` instead.
- **`npm run typegen` requires PocketBase running** on `:8090`. Start with `cd pocketbase && go run . serve` first.
