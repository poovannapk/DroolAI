# DroolAI — Build something AImazing! 🚀

DroolAI is a modern, full-stack AI-powered chat and analytics platform built with React, TypeScript, Tailwind CSS, and Node.js/Express for the backend. It features authentication, real-time chat, agent management, analytics, and a beautiful, responsive UI.

## Features
- Beautiful landing page with typewriter effect
- Login/Signup modal authentication
- JWT-based secure backend
- Real-time chat interface
- Agent management and analytics dashboard
- Responsive, mobile-friendly design
- Modular component structure


This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, React Router, React Query
- **Backend:** Node.js, Express, JWT, TypeScript

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd DroolAI
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the backend:**
   ```sh
   cd backend/ai-server-app
   npm install
   npm run dev
   ```
4. **Start the frontend:**
   ```sh
   cd ../..
   npm run dev
   ```

### Environment Variables
- Configure your backend `.env` for JWT secrets and any AI API keys as needed.

## Project Structure
```
DroolAI/
├── backend/
│   └── ai-server-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── ...
├── package.json
└── README.md
```

## Customization
- Update colors and branding in `tailwind.config.ts` and `LandingPage.tsx`.
- Add new routes and features in `src/pages` and `src/components`.

## License
MIT

---


