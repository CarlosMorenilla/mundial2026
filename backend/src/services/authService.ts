import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const prisma = new PrismaClient();

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    
    // Verify Google token
    const googleResponse = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );
    
    const { email, sub: googleId, name, picture } = googleResponse.data;
    
    if (!email) {
      return res.status(400).json({ error: 'Invalid Google token' });
    }
    
    // Find or create user
    let user = await prisma.user.findUnique({ where: { googleId } });
    
    if (!user) {
      // Generate username from email
      const baseUsername = email.split('@')[0];
      let username = baseUsername;
      let counter = 1;
      
      // Ensure unique username
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter}`;
        counter++;
      }
      
      user = await prisma.user.create({
        data: {
          email,
          username,
          googleId,
          avatarUrl: picture
        }
      });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.json({ user, token });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  res.json(user);
};
