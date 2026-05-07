import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPrediction = async (req: Request, res: Response) => {
  const { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore } = req.body;
  
  const prediction = await prisma.prediction.upsert({
    where: { userId_matchId: { userId, matchId } },
    update: { predictedWinner, predictedHomeScore, predictedAwayScore },
    create: { userId, matchId, predictedWinner, predictedHomeScore, predictedAwayScore }
  });
  
  res.json(prediction);
};

export const getUserPredictions = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const predictions = await prisma.prediction.findMany({ where: { userId } });
  res.json(predictions);
};
