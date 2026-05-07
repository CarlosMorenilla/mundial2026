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

## Live URLs
- **Backend API**: https://mundial2026-pxdz.onrender.com
- **GitHub**: https://github.com/CarlosMorenilla/mundial2026
- **Database**: Neon PostgreSQL (eu-central-1)
- **Mobile**: Use Expo Go on iPhone, connect via Safari to `http://10.0.1.252:8081`

## Current Status (2026-05-07)
✅ Backend deployed on Render (auto-deploys from GitHub)
✅ Database populated with 18 World Cup 2026 matches (Groups A, B, C)
✅ Mobile app connects to real backend
✅ Matches screen shows real data from Neon
✅ Predictions can be saved (auth disabled for testing)
✅ Leaderboard ready for real data
✅ Mock login working (Google OAuth pending)

## Key Commands
- **Mobile**: `cd mobile && npx expo start --host lan -c`
- **Backend**: Auto-deployed via GitHub push
- **Seed database**: `cd backend && node ../prisma/seed.js`
- **View data**: Visit https://mundial2026-pxdz.onrender.com/api/matches

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

## Deployment (No local PC required)
- **Backend**: Deploy to Render, Railway, or Heroku (free tiers available)
- **Database**: Use Neon (PostgreSQL serverless) or Supabase (free PostgreSQL)
- **Mobile**: Build with EAS (Expo Application Services) and publish to App Store/Play Store
- **Environment Variables**: Set all secrets in deployment platform, never commit .env
