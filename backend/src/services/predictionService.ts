import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPrediction = async (req: Request, res: Response) => {
  try {
    const { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore } = req.body;
    
    if (!userId || !matchId) {
      return res.status(400).json({ error: 'Missing userId or matchId' });
    }
    
    console.log('Creating/updating prediction:', { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore });
    
    const prediction = await prisma.prediction.upsert({
      where: { userId_matchId: { userId, matchId } },
      update: { predictedWinner, predictedHomeScore, predictedAwayScore },
      create: { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore }
    });
    
    console.log('Prediction saved:', prediction);
    res.json(prediction);
  } catch (error) {
    console.error('Error in createPrediction:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

export const getUserPredictions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const predictions = await prisma.prediction.findMany({ where: { userId } });
    res.json(predictions);
  } catch (error) {
    console.error('Error in getUserPredictions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
