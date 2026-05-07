import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMatches = async (req: Request, res: Response) => {
  const { matchday } = req.params;
  const where = matchday ? { matchday: parseInt(matchday) } : {};
  const matches = await prisma.match.findMany({ where });
  res.json(matches);
};

export const updateMatchResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeScore, awayScore } = req.body;
  
  const match = await prisma.match.update({
    where: { id },
    data: { homeScore, awayScore, status: 'finished' }
  });
  
  // Calculate points for predictions
  const predictions = await prisma.prediction.findMany({ where: { matchId: id } });
  for (const pred of predictions) {
    let points = 0;
    if (pred.predictedWinner === getWinner(homeScore, awayScore)) points += 1;
    if (pred.predictedHomeScore === homeScore && pred.predictedAwayScore === awayScore) points += 2;
    await prisma.prediction.update({
      where: { id: pred.id },
      data: { points }
    });
  }
  
  res.json(match);
};

const getWinner = (home: number, away: number) => {
  if (home > away) return 'home';
  if (away > home) return 'away';
  return 'draw';
};
