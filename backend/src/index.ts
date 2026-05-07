import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Matches
app.get('/api/matches', async (req, res) => {
  try {
    const matchday = req.query.matchday;
    const where = matchday ? { matchday: parseInt(matchday as string) } : {};
    const matches = await prisma.match.findMany({ where });
    res.json(matches);
  } catch (error: any) {
    console.error('Error in GET /api/matches:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Predictions
app.post('/api/predictions', async (req, res) => {
  try {
    console.log('POST /api/predictions body:', req.body);
    const { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore } = req.body;
    
    if (!userId || !matchId) {
      return res.status(400).json({ error: 'Missing userId or matchId' });
    }
    
    const prediction = await prisma.prediction.upsert({
      where: { userId_matchId: { userId, matchId } },
      update: { predictedWinner, predictedHomeScore, predictedAwayScore },
      create: { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore }
    });
    
    console.log('Prediction saved:', prediction);
    res.json(prediction);
  } catch (error: any) {
    console.error('Error in POST /api/predictions:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { predictions: true }
    });
    
    const leaderboard = users.map(user => ({
      username: user.username,
      totalPoints: user.predictions.reduce((sum, p) => sum + p.points, 0),
      avatarUrl: user.avatarUrl
    })).sort((a, b) => b.totalPoints - a.totalPoints);
    
    res.json(leaderboard);
  } catch (error: any) {
    console.error('Error in GET /api/leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth (mock for testing)
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    console.log('Mock auth, idToken:', idToken);
    
    // Mock user
    const user = {
      id: 'test-user-id',
      email: 'test@mundial2026.com',
      username: 'testuser',
      avatarUrl: null
    };
    const token = 'mock-jwt-token';
    
    res.json({ user, token });
  } catch (error: any) {
    console.error('Error in POST /api/auth/google:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
