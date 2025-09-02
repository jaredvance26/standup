# Standup

## Overview
Standup is a modern web application built with React and TypeScript that helps teams manage their daily standup meetings. The application features a user-friendly interface built with Material-UI (MUI) components and integrates with Jira to pull sprint information and goals.

## Tech Stack
- FE
	- React 18
	- TypeScript
	- Material-UI (MUI)
	- Material Icons
	- React Sweet State (for state management)
	- Axios (for API requests)
- BE
	- Node.js
	- TypeScript
	- Express.js (REST API)
	- MongoDB with Mongoose (ODM)
	- JSON Web Tokens (jsonwebtoken) for auth
	- bcryptjs for password hashing
	- Helmet and CORS for security
	- dotenv for environment configuration
	- Axios for outbound HTTP (Jira integration)

## Production
- Site: https://standup-silk.vercel.app/
- FE: Vercel
- BE: Render

## Security
- Jira API token encrypted and never sent to the client
- Password hashed and never sent to the client

## Features
- Modern, responsive UI with Material-UI components
- Theme customization
- TypeScript for enhanced type safety and developer experience
- Jira integration for fetching user stories and sprint goals
- Team member management (adding, removing, and updating)

## Local Setup
### Frontend Local Setup
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

### Backend Local Setup
1. Navigate to the server directory
```bash
cd ../server
```

2. Install dependencies
```bash
npm install
```

4. Start the backend server
```bash
npm start
```

The backend server will be available at `http://localhost:3001`

