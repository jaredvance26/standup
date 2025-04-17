# Standup

## Overview
Standup is a modern web application built with React and TypeScript that helps teams manage their daily standup meetings. The application features a user-friendly interface built with Material-UI (MUI) components and integrates with Jira to pull sprint information and goals.

## Tech Stack
- React 18
- TypeScript
- Material-UI (MUI)
- Emotion (for styled components)
- React Sweet State (for state management)
- Axios (for API requests)
- Jira API integration

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm
- Jira account with API token

### Installation

#### Frontend Setup
1. Clone the repository
```bash
git clone https://github.com/jaredvance26/standup.git
cd standup/my-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The frontend application will be available at `http://localhost:3000`

#### Backend Setup
1. Navigate to the server directory
```bash
cd ../server
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Copy the `.env.example` file to create a new `.env` file
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your Jira credentials:
     - `JIRA_URL`: Your Jira instance URL (e.g., https://your-domain.atlassian.net)
     - `JIRA_EMAIL`: Your Jira account email
     - `JIRA_API_TOKEN`: Your Jira API token (can be created in Atlassian account settings)

4. Start the backend server
```bash
npm start
```

The backend server will be available at `http://localhost:3001`

### Building for Production

#### Frontend
```bash
cd ../my-app
npm run build
```

#### Backend
```bash
cd ../server
npm run build
```

## Features
- Modern, responsive UI with Material-UI components
- Theme customization
- TypeScript for enhanced type safety and developer experience
- State management with React Sweet State
- Jira integration for fetching user stories and tasks
- Sprint goals retrieval and display
- Comprehensive user issue tracking for standup meetings
- RESTful backend API for Jira data integration

## Standup tool web app