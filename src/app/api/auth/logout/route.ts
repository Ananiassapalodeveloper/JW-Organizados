// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Limpa o cookie "token" definindo maxAge 0
  const response = NextResponse.json({ message: "Logout realizado com sucesso" });
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
