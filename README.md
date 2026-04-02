# Daily Task Tracker

A modern, feature-rich daily task tracking application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Create & Manage Tasks** — Add tasks with title, description, priority, category, due date, and tags
- **Task Status Tracking** — Track tasks as Todo, In Progress, or Completed
- **Priority Levels** — High, Medium, and Low priority with visual indicators
- **Categories** — Organize tasks by Work, Personal, Health, Learning, or Other
- **Filtering & Search** — Filter by status, priority, category, and search by text
- **Sorting** — Sort by newest, priority, status, due date, or alphabetically
- **Statistics** — View task completion rates and overdue counts
- **Persistent Storage** — Tasks saved to localStorage
- **Responsive Design** — Works on mobile and desktop
- **Keyboard Shortcuts** — Press Escape to close modals

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Docker

### Build the Docker Image

```bash
docker build -t daily-task-tracker .
```

### Run the Container

```bash
docker run -p 3000:3000 daily-task-tracker
```

### Using Docker Compose

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── StatsBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── TaskList.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskModal.tsx
│   │   ├── EmptyState.tsx
│   │   └── Icons.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── lib/
│   │   ├── storage.ts
│   │   └── taskUtils.ts
│   └── types/
│       └── task.ts
```

## Tech Stack

- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **date-fns** — Date manipulation
- **uuid** — Unique ID generation
- **localStorage** — Client-side persistence
