import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Matches route (simplified)
app.get('/api/matches', (req, res) => {
  res.json([
    { id: '1', homeTeam: 'Mexico', awayTeam: 'Canada', status: 'pending' },
    { id: '2', homeTeam: 'USA', awayTeam: 'Brazil', status: 'pending' }
  ]);
});

// Predictions route (simplified - NO DATABASE)
app.post('/api/predictions', (req, res) => {
  console.log('POST /api/predictions body:', req.body);
  res.json({ success: true, message: 'Prediction received (no DB)', data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
