/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function PUT(req: Request) {
  try {
    // const { password, nome } = await request.json();
    // const { id } = params;
    const { password, id }  = await req.json();

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário no banco de dados
    const membro = await prisma.membro.update({ where: { id }, data: { password: hashedPassword} });

   


    // Geração do token JWT
    const token = jwt.sign(
      { id: membro.id, email: membro.email, name:membro.nome},
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // Retorna resposta com o token no cookie
    const response = NextResponse.json({
      message: "Membro atualizado com sucesso!",
      user: { id: membro.id, name: membro.nome, email: membro.email },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
    });

    return response;
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
