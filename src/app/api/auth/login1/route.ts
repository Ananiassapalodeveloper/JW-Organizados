/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { nome, password } = await request.json();

    if (!nome || !password) {
      return NextResponse.json(
        { message: 'Nome e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await prisma.membro.findUnique({
      where: { nome },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    const requiresPasswordChange = user.password === '1234';

    const response = NextResponse.json({
      user: { ...userWithoutPassword, requiresPasswordChange },
      requiresPasswordChange,
      token, // ← Adicione esta linha
    });

    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}