import axios from 'axios';

export class AiService {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async fetchAIModel(modelId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/models/${modelId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching AI model: ${error.message}`);
        }
    }

    public async executeModel(modelId: string, inputData: any): Promise<any> {
        try {
            const response = await axios.post(`${this.apiUrl}/models/${modelId}/execute`, inputData);
            return response.data;
        } catch (error) {
            throw new Error(`Error executing AI model: ${error.message}`);
        }
    }
}