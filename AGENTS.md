# AGENTS.md - Mundial2026 Project Context

## Project Overview
Fantasy-style mobile app for the 2026 FIFA World Cup. Users predict match winners (1pt) and exact scores (2pts), compete with friends on a leaderboard.

## Tech Stack
- **Mobile**: React Native (Expo)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: Google OAuth (expo-auth-session)
- **State Management**: Zustand

## Directory Structure
```
mundial2026/
├── mobile/          # Expo React Native app
│   ├── app/         # Screens (Expo Router)
│   ├── components/  # Reusable UI components
│   ├── services/    # API calls to backend
│   └── assets/      # Images, fonts
├── backend/         # Node.js Express API
│   └── src/
│       ├── routes/  # API endpoints
│       ├── services/# Business logic
│       ├── middleware/# Auth, validation
│       └── prisma/  # Prisma client setup
├── prisma/          # Prisma schema and migrations
│   └── schema.prisma
├── AGENTS.md        # This file
├── .gitignore
├── .env.example
└── README.md
```

## Key Commands
- **Mobile**: `cd mobile && npx expo start`
- **Backend**: `cd backend && npm run dev`
- **Prisma**: `npx prisma migrate dev` (from backend)

## Security Notes
- All secrets in `.env` (never commit)
- Validate inputs with Zod
- Use HTTPS in production
- Sanitize user inputs
- Rate limit API endpoints

## Data Strategy
- Initial match calendar simulated manually
- Service layer prepared for future API integration (SportRadar, API-FOOTBALL)
- Results updated via backend (manual or automated)
