import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { oldPassword, newPassword } = await request.json();

    const decoded = verifyToken(token);
    if (decoded.id !== id) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 403 }
      );
    }

    const user = await prisma.membro.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      );
    }

    if (user.password !== '1234') {
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Senha atual incorreta' },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.membro.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}