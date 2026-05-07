import { Router } from 'express';
import { googleAuth, getProfile } from '../services/authService';

const router = Router();

router.post('/google', googleAuth);
router.get('/profile', getProfile);

export { router as authRoutes };
