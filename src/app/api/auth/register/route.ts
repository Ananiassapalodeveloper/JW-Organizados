/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/auth';
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

    const user = await authenticateUser(nome, password);
    const token = generateToken(user);

    // Configura o cookie HTTP-only
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
      sameSite: 'strict',
    });

    return NextResponse.json({
      user,
      token,
      mustChangePassword: user.password === '1234', // Verifica se é senha padrão
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro no login' },
      { status: 401 }
    );
  }
}