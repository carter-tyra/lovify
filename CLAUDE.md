# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lovify (forked from Angular Spotify) is a Valentine's Day themed Spotify web client built with Angular 17, Nx 18, NgRx, TailwindCSS, and ng-zorro (Ant Design). It connects to the real Spotify API via PKCE auth flow.

## Common Commands

```bash
npm start                              # Dev server at http://localhost:4200
npx nx build angular-spotify           # Build the app
npx nx test angular-spotify            # Run app tests
npx nx test <project-name>             # Run tests for a specific lib (e.g., web-home-feature)
npx nx lint angular-spotify            # Lint the app
npx nx affected:test --base=main       # Test only affected projects
npx nx affected:lint --base=main       # Lint only affected projects
npm run format:write                   # Prettier format all files
npx nx dep-graph                       # Visualize dependency graph
```

Note: `npm install` requires `--legacy-peer-deps` due to a @sentry/angular peer dependency conflict with Angular 17.

## Architecture

### Nx Monorepo Structure

- **`apps/angular-spotify/`** - Single Angular app (bootstrap, global styles, environments)
- **`libs/web/`** - Feature libraries organized by domain

### Library Organization Pattern

Each domain follows a consistent structure under `libs/web/<domain>/`:
- **`feature/`** - Routed page components with NgModule
- **`data-access/`** - NgRx state (actions, reducers, selectors, effects) or ComponentStore
- **`ui/`** - Presentational components following SCAM pattern (Single Component Angular Module)

Key domains: `home`, `playlist`, `album`, `artist`, `browse`, `search`, `tracks`, `auth`, `shell`, `visualizer`, `valentine`, `settings`

### Shared Libraries (`libs/web/shared/`)

- **`data-access/store/`** - Global NgRx store and UI state (UIStore is a ComponentStore)
- **`data-access/spotify-api/`** - HTTP services for Spotify API calls
- **`data-access/models/`** - TypeScript interfaces and types
- **`ui/`** - Reusable SCAM components (icon, spinner, media cards, play-button, etc.)
- **`utils/`** - Guards, interceptors, validators
- **`app-config/`** - Environment injection tokens

### Routing

All routes are lazy-loaded via `loadChildren` in `libs/web/shell/feature/src/lib/web-shell.routes.ts`. The `LayoutComponent` wraps all routes with nav-bar, top-bar, main-view, and now-playing-bar.

### State Management

Dual approach:
- **NgRx Store** - Global state for playlists, tracks, albums, featured content (actions → reducers → selectors + effects)
- **NgRx ComponentStore** - Local state for auth (`AuthStore`), playback (`PlaybackStore`), UI (`UIStore`)

### Styling

Layered system:
- **CSS custom properties** in `:root` (styles.scss) define the color palette as RGB triplets
- **TailwindCSS** references those variables via `rgb(var(--name) / <alpha-value>)` in `tailwind.config.js`
- **SCSS** for component-level styles
- **ng-zorro** component overrides in `apps/angular-spotify/src/custom/ant/`
- Custom Tailwind utilities/components in `apps/angular-spotify/src/custom/tailwind/`

### Authentication

PKCE flow implemented in `libs/web/auth/data-access/store/auth.store.ts`. Client ID is hardcoded (public Spotify app). Tokens stored in localStorage, auto-refreshed on expiry.

## Nx Module Boundary Rules

Enforced via `@nx/enforce-module-boundaries` in `.eslintrc.json`:
- **`type:app`** can depend on: feature, util, data-access, ui
- **`type:feature`** can depend on: feature, util, data-access, ui
- **`type:ui`** can depend on: util, ui, data-access
- **`type:data-access`** can depend on: util, data-access
- **`type:util`** can depend on: util only

All libs are tagged `scope:web`. The app is tagged `scope:angular-spotify` and can only depend on `scope:web`.

## Code Conventions

- All components use `ChangeDetectionStrategy.OnPush`
- SCAM pattern for UI components (one component per NgModule)
- Path aliases defined in `tsconfig.base.json` as `@angular-spotify/web/<domain>/<type>`
- Prettier: single quotes, no trailing commas, 100 char width, 2-space indent
- Conventional commits enforced via commitlint
