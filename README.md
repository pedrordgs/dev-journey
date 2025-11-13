# GitHub Timeline

[![CI](https://github.com/pmr/github-timeline/actions/workflows/ci.yml/badge.svg)](https://github.com/pmr/github-timeline/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, responsive web application that visualizes a GitHub user's public repository timeline. Perfect for showcasing your development journey to prospective employers or sharing your coding history.

## ✨ Features

- 🔍 **Username Input**: Enter any GitHub username to generate their timeline
- 📅 **Timeline Visualization**: Interactive timeline showing repository creation dates
- 📊 **Repository Summary**: Breakdown of repositories by year
- ⚠️ **Error Handling**: Clear warnings for invalid usernames or API errors
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Built with Shadcn UI and Tailwind CSS for a polished look

## 🚀 Demo

![GitHub Timeline Demo](https://via.placeholder.com/800x400?text=Demo+Screenshot)

_Enter a GitHub username and click "Generate Timeline" to see the magic happen!_

## 📦 Installation

### Prerequisites

- Node.js 20+
- Docker (optional, for containerized development)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/pmr/github-timeline.git
   cd github-timeline
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Docker Development

For a containerized setup:

```bash
docker compose up --build
```

## 🛠 Usage

1. Enter a GitHub username in the input field
2. Click "Generate Timeline"
3. View the interactive timeline of repositories
4. Explore the yearly summary statistics

## 🏗 Tech Stack

| Technology            | Purpose                         |
| --------------------- | ------------------------------- |
| **Next.js 16**        | React framework with App Router |
| **TypeScript**        | Type-safe JavaScript            |
| **Tailwind CSS 4**    | Utility-first CSS framework     |
| **Shadcn UI**         | Modern component library        |
| **Jest + RTL**        | Testing framework               |
| **ESLint + Prettier** | Code quality and formatting     |
| **Docker**            | Containerization                |

## 📋 Project Roadmap

### Phase 1: Core Features ✅

- Basic timeline generation
- Repository fetching from GitHub API
- Responsive design

### Phase 2: Enhancements 🚧

- [ ] Add repository language statistics
- [ ] Implement timeline filtering options
- [ ] Add export functionality (PDF/Image)
- [ ] Dark mode support
- [ ] Add repo detail page with title, description, tags, etc.
- [ ] Inside repo page, add commit timeline for specific branch (show all users or allow to filter per user). Allow to filter per branch.
- [ ] Redirect to commit detail when clicking on commit timeline
- [ ] Allow to filter repos by language
- [ ] Add statistics for user and for repo

### Phase 3: Advanced Features 📅

- [ ] User authentication for private repos
- [ ] Collaborative timelines
- [ ] Integration with GitHub Actions
- [ ] Custom timeline themes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub REST API for repository data
- Shadcn UI for beautiful components
- Next.js community for excellent documentation

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.
