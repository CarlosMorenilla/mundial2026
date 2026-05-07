import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const googleAuth = async (req: Request, res: Response) => {
  // Implement Google OAuth verification here
  // For now, mock response
  const { googleId, email, username, avatarUrl } = req.body;
  
  let user = await prisma.user.findUnique({ where: { googleId } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, username, googleId, avatarUrl }
    });
  }
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  res.json({ user, token });
};

export const getProfile = async (req: Request, res: Response) => {
  // Todo: get user from token
  res.json({ message: 'Profile endpoint' });
};
