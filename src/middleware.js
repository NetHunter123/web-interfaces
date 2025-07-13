"use server"
import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

export function middleware(request = NextRequest) {
  const token = request.cookies.get('auth-token');  // отримуємо токен з cookie (якщо є)
  const currentPath = request.nextUrl.pathname;

  // 1. Дозволити публічні маршрути без перевірки токена:
  if (
    currentPath.startsWith('/login') ||       // сторінка логіну
    currentPath.startsWith('/api/login') ||   // API логіну
    currentPath.startsWith('/_next') ||       // файли Next.js (статичні, chunks)
    currentPath.startsWith('/favicon')        // favicon або інші публічні ресурси
  ) {
    return NextResponse.next();  // пропустити далі без редиректу
  }

  // 2. Якщо токена немає, перенаправити на /login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);  // редирект на сторінку логіну:contentReference[oaicite:3]{index=3}
  }

  // 3. Якщо токен є, користувач авторизований – продовжуємо обробку запиту
  return NextResponse.next();
}
