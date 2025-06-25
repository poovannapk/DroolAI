import { Request, Response } from 'express';
import { AiService } from '../services/aiService';

export class AiController {
    private aiService: AiService;

    constructor() {
        this.aiService = new AiService();
    }

    public async processAIRequest(req: Request, res: Response): Promise<void> {
        try {
            const inputData = req.body;
            const result = await this.aiService.executeModel(inputData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while processing the AI request.' });
        }
    }
}