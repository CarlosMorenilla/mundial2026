import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLeaderboard = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      predictions: true
    }
  });
  
  const leaderboard = users.map(user => ({
    username: user.username,
    totalPoints: user.predictions.reduce((sum, p) => sum + p.points, 0),
    avatarUrl: user.avatarUrl
  })).sort((a, b) => b.totalPoints - a.totalPoints);
  
  res.json(leaderboard);
};
