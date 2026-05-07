import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Test endpoint
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Predictions route working' });
});

router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('POST /api/predictions body:', req.body);
    
    const { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore } = req.body;
    
    if (!userId || !matchId) {
      return res.status(400).json({ error: 'Missing required fields' });
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

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const predictions = await prisma.prediction.findMany({ where: { userId } });
    res.json(predictions);
  } catch (error: any) {
    console.error('Error in GET /api/predictions/user/:userId:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as predictionRoutes };
