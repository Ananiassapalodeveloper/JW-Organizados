/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/auth/login', '/auth/change-password'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Verificar rotas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      return NextResponse.redirect(url);
    }

    try {
      verifyToken(token);
    } catch (error) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      const response = NextResponse.redirect(url);
      response.cookies.delete('token');
      return response;
    }
  }

  // Verificar rotas de autenticação
  if (authRoutes.includes(pathname)) {
    if (token) {
      try {
        verifyToken(token);
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
      } catch (error) {
        // Token inválido, pode continuar para a página de login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};