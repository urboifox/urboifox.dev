import { TOKEN_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export function createSession(payload: Record<string, string>): string {
    return jwt.sign(payload, TOKEN_SECRET, {
        expiresIn: '5h'
    });
}

export function validateSession(token: string): boolean {
    try {
        return !!jwt.verify(token, TOKEN_SECRET);
    } catch {
        return false;   
    }
}
