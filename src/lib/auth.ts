/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticateUser(nome: string, password: string) {
  const user = await prisma.membro.findUnique({
    where: { nome },
    include: {
      grupo: {
        include: {
          ajudante: true
        }
      },
      servicos: true
    }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error('Senha incorreta');
  }

  // Remove a senha antes de retornar
  const { password: _, ...userWithoutPassword } = user;

  return user;
}

export function generateToken(user: any) {
  return jwt.sign(
    { id: user.id, nome: user.nome, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function updateUserPassword(userId: string, newPassword: string) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  return await prisma.membro.update({
    where: { id: userId },
    data: { 
      password: hashedPassword,
      // mustChangePassword: false 
    },
  });
}

export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}