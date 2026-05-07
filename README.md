# Mundial2026
Fantasy World Cup 2026 prediction app. Compete with friends by predicting match winners and scores.

## Setup
1. Clone repo
2. Copy `.env.example` to `.env` and fill variables
3. Install dependencies: `cd mobile && npm install`, `cd backend && npm install`
4. Run Prisma migrations: `npx prisma migrate dev`
5. Start backend: `cd backend && npm run dev`
6. Start mobile: `cd mobile && npx expo start`

## Features
- Google Authentication
- Match calendar by matchday
- Predictions (winner: 1pt, exact score: 2pts)
- Real-time leaderboard
- User profiles with custom usernames
