# AGENTS.md

This file contains information for AI agents working on this project.

## Commands

- **Development:** `npm run dev` or `docker compose up --build`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Typecheck:** `npm run typecheck`
- **Test:** `npm run test`
- **Pre-commit:** Automatically runs lint, typecheck, and test via Husky

## Project Structure

- `src/app/` - Next.js App Router pages, layouts, and global styles
- `src/components/` - Shadcn UI components and custom components
- `src/lib/` - Utility functions, API clients, and shared logic
- `public/` - Static assets
- `.github/workflows/` - CI/CD pipelines
- `.husky/` - Git hooks

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with Shadcn UI
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint + Prettier
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions

## Coding Conventions

- Use TypeScript for all code
- Follow Next.js and React best practices
- Use functional components with hooks
- Shadcn UI for consistent component design
- PascalCase for components, camelCase for variables/functions
- Import aliases: `@/components`, `@/lib`, etc.

## Git Workflow

- Feature branches from main
- Pull requests for code review
- Squash merges
- Pre-commit hooks enforce code quality

## Development Setup

- Use Docker for consistent environment
- Copy `.env.example` to `.env.local` for local config
- Run `npm install` after pulling changes
