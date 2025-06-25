import jwt from 'jsonwebtoken';

class JwtService {
    private secretKey: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your secret key
    }

    generateToken(payload: object): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
    }

    validateToken(token: string): object | string {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            return 'Invalid token';
        }
    }
}

export default new JwtService();