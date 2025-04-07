/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nome, password } = await request.json();

    if (!nome || !password) {
      return NextResponse.json(
        { message: "nome e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Busca o usuário pelo email
    const user = await prisma.membro.findUnique({
      where: { nome },
    });

    if (!user) {
      return NextResponse.json({ message: "Nome inválido" }, { status: 401 });
    }

    // Compara a senha informada com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Senha inválida" }, { status: 401 });
    }

    // Cria o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Configura o cookie httpOnly para o token
    const response = NextResponse.json({
      message: "Login realizado com sucesso",
      data: { ...user, password: "Não será mostrado intruso" },
      token:token
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno de servidor" },
      { status: 500 }
    );
  }
}
