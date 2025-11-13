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

- Next.js (React framework)
- GitHub API (REST or GraphQL)
- CSS for timeline styling

## Development Plan

1. **Setup Next.js Project**
   - Initialize Next.js app
   - Configure basic structure
   - Set up development environment

2. **Implement GitHub API Integration**
   - Choose API (REST v3 or GraphQL v4)
   - Create API client (using Octokit)
   - Implement user validation
   - Fetch public repositories with metadata

3. **Build Timeline Component**
   - Design timeline layout (vertical timeline)
   - Style with CSS (responsive, professional)
   - Display repo name, creation date, description

4. **Add User Interface**
   - Username input field
   - Generate button
   - Error handling and warnings
   - Loading states

5. **Bonus Features**
   - Repository count by year summary
   - Additional visualizations

6. **Testing and Deployment**
   - Unit tests for components
   - Integration tests for API calls
   - Deploy to Vercel or similar

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## API Usage

Uses GitHub REST API v3 to fetch user repositories:
```
GET /users/{username}/repos
```

## Resources

- [GitHub REST API Documentation](https://developer.github.com/v3/)
- [Octokit REST.js](https://github.com/octokit/rest.js/)
- [Next.js Documentation](https://nextjs.org/docs)