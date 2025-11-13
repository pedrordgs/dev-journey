# GitHub Timeline

A Next.js web application that visualizes a GitHub user's public repository timeline.

## Project Overview

This project creates a shareable timeline of a GitHub user's public repositories, displaying repository names, creation dates, and descriptions in an easy-to-read format suitable for prospective employers.

## Features

- Input field for GitHub username
- Generate button to fetch and display repository timeline
- Warning for invalid usernames
- Bonus: Summary of repositories by creation year

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn UI
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint + Prettier
- **Containerization:** Docker

## Development

### Prerequisites

- Node.js 20+
- Docker (optional)

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local` (optional)
4. Run development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

### Docker Development

1. Build and run with Docker Compose: `docker compose up --build`
2. Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests

## Project Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and API clients
- `public/` - Static assets

## API Usage

Uses GitHub REST API v3 to fetch user repositories:
```
GET /users/{username}/repos
```

## Resources

- [GitHub REST API Documentation](https://developer.github.com/v3/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
