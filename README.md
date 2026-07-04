# Athenaeum — Library Management System

![CI](https://github.com/tarekul42/minimal-library-management-system/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/tarekul42/minimal-library-management-system/actions/workflows/cd.yml/badge.svg)

A modern, full-featured library management system built with React and TypeScript. Browse books, manage borrows, track fines, and administer your library catalog — all from a responsive, accessible interface.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Language | [TypeScript 6](https://www.typescriptlang.org/) |
| Routing | [React Router 8](https://reactrouter.com/) |
| State / Data | [Redux Toolkit](https://redux-toolkit.js.org/) (RTK Query) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Icons | [Lucide React](https://lucide.dev/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Charts | [Recharts](https://recharts.org/) |
| Testing (unit) | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Testing (e2e) | [Playwright](https://playwright.dev/) |
| PWA | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) |
| Deployment | [Vercel](https://vercel.com/) / Docker |

## Quick Start

```sh
git clone https://github.com/tarekul42/minimal-library-management-system.git
cd minimal-library-management-system
pnpm install
pnpm dev
```

The app starts at `http://localhost:5173`. The backend API is expected at `http://localhost:5000` (configurable via `VITE_API_URL`).

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api    # Backend API base URL
VITE_ANALYTICS_ID=                        # (optional) Analytics ID
VITE_SENTRY_DSN=                          # (optional) Sentry error tracking
VITE_GOOGLE_CLIENT_ID=                    # (optional) Google OAuth
VITE_FACEBOOK_APP_ID=                     # (optional) Facebook OAuth
```

Copy `.env.example` to `.env` and adjust the values for your environment.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |
| `pnpm lint:css` | Run Stylelint on CSS files |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm test` | Run Vitest unit/integration tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm audit:styles` | Check for hardcoded color tokens |

## Project Structure

```
src/
├── app/routes/          # Route definitions (lazy-loaded)
├── components/          # Reusable UI components
│   ├── cards/           # BookCard, StatCard, AuthorCard, etc.
│   ├── feedback/        # ErrorState, EmptyState, Loader, ConfirmationDialog
│   ├── forms/           # FormRoot, TextField, SelectField, etc.
│   ├── layout/          # Navbar, Footer, DashboardShell, Container, etc.
│   ├── tables/          # DataTable with sort/filter/pagination
│   └── ui/              # shadcn/ui primitives (button, dialog, etc.)
├── config/              # Site config, nav items, constants
├── features/            # Feature modules (auth, books, dashboard, home, etc.)
├── hooks/               # useAuth, useDebounce, useMediaQuery, etc.
├── lib/                 # Utilities (cn, chart-utils, styles)
├── redux/               # Redux store, API definitions (RTK Query), slices
├── schema/              # Zod validation schemas
├── test/                # Test setup and utilities
└── types/               # TypeScript type definitions
```

## Testing

### Unit & Integration Tests

```sh
pnpm test
```

Runs Vitest with jsdom environment. Tests cover:
- Shared components (BookCard, StatCard, ErrorState, EmptyState, etc.)
- Form components (TextField, SubmitButton, etc.)
- Layout components (Container, Breadcrumb)
- Custom hooks (useDebounce)
- Feature integration (Hero, Login, Books, MyBorrows)

### E2E Tests

```sh
pnpm test:e2e
```

Runs Playwright across Chromium, WebKit, and Mobile Chrome. Covers:
- Home page (sections, CTAs, FAQ accordion)
- Book explore (search, filter, sort, pagination)
- Book detail (hero, tabs, related books)
- Auth (login, register, logout)
- Dashboard (member sidebar, admin sidebar, role-based access)
- Theme toggle (light/dark persistence)
- Responsive layout (mobile, tablet, desktop)

## Deployment

### Vercel (recommended)

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/).
3. Set the framework preset to **Vite**.
4. Add environment variables in the Vercel dashboard.
5. Deploy — the `vercel.json` in the root handles SPA rewrites and security headers.

### Docker

```sh
docker build -t athenaeum .
docker run -p 8080:80 -e VITE_API_URL=http://your-api:5000/api athenaeum
```

The Dockerfile uses a multi-stage build: Node 22 builds the app, then nginx serves it with the bundled `nginx.conf` (includes API proxy and SPA fallback).

## CI/CD

The project includes GitHub Actions workflows:

- **CI** (`.github/workflows/ci.yml`): Runs on every push/PR — typecheck, lint, audit styles, unit tests, E2E tests.
- **CD** (`.github/workflows/cd.yml`): Deploys to Vercel on push to `main`.

## Contributing

1. Branch from `upgrade`: `git checkout upgrade && git checkout -b feat/your-feature`.
2. Follow the existing code conventions (TypeScript strict, Tailwind v4, feature-based structure).
3. Ensure `pnpm typecheck`, `pnpm lint`, and `pnpm test` all pass.
4. Open a pull request against `upgrade`.

## License

MIT
