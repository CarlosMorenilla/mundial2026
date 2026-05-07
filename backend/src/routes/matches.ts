import { Router } from 'express';
import { getMatches, updateMatchResult } from '../services/matchService';

const router = Router();

router.get('/', getMatches);
router.get('/:matchday', getMatches);
router.post('/:id/result', updateMatchResult);

export { router as matchRoutes };
