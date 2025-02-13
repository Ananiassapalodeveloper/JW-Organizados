/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Import correto para acessar os cookies

export async function GET(request: Request) {
  const token = cookies().get("token")?.value; // Usa cookies() corretamente

  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ message: "Acesso autorizado", user: decoded });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
