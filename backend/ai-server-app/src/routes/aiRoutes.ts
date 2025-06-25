import { Router } from 'express';
import { AiController } from '../controllers/aiController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();
const aiController = new AiController();

export function setRoutes() {
    router.post('/ai/process', authenticateJWT, aiController.processAIRequest.bind(aiController));
    return router;
}