import { Router } from 'express';
import { createPrediction, getUserPredictions } from '../services/predictionService';

const router = Router();

router.post('/', createPrediction);
router.get('/user/:userId', getUserPredictions);

export { router as predictionRoutes };
