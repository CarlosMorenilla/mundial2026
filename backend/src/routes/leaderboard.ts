import { Router } from 'express';
import { getLeaderboard } from '../services/leaderboardService';

const router = Router();

router.get('/', getLeaderboard);

export { router as leaderboardRoutes };
