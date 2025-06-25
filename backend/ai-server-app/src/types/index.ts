export interface RequestPayload {
    userId: string;
    data: any;
}

export interface AuthToken {
    userId: string;
    iat: number;
    exp: number;
}