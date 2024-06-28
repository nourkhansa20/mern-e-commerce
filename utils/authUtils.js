// authUtils.js
import jwt from 'jsonwebtoken';

const secretKey = 'your_jwt_secret_key'; // Use a strong secret key in production

export function validateToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (err) {
        return { valid: false, error: err.message };
    }
}
