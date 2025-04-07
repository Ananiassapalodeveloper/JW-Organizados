/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Não autenticado' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const user = await prisma.membro.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        nome: true,
        email: true,
        contacto: true,
        password: true,
        createdAt: true,
        // Inclua outros campos necessários
      },
    });

    if (!user) {
      cookies().delete('token');
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      user: { ...userWithoutPassword, requiresPasswordChange: password === '1234' },
      requiresPasswordChange: password === '1234',
    });
  } catch (error) {
    cookies().delete('token');
    return NextResponse.json(
      { message: 'Token inválido ou expirado' },
      { status: 401 }
    );
  }
}