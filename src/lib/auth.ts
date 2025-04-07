import jwt from 'jsonwebtoken';
import { Membro } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRATION = '30d';

export const generateToken = (user: Membro) => {
  return jwt.sign(
    { id: user.id, email: user.email, nome: user.nome },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string; email: string; nome: string };
};