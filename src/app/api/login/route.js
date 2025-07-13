import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();  // Ініціалізація Prisma

export async function POST(request) {
  try {
    const { email, password } = await request.json();   // 1. Отримати email і пароль з запиту

    // 2. Знайти користувача в базі за email
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user || user.password !== password) {
      // Невірний email або пароль
      return NextResponse.json({ error: 'Невірний email або пароль' }, { status: 401 });
    }

    // 3. Згенерувати простий auth-token (наприклад, user.id або випадковий рядок)
    const authToken = `token-${user.id}`;  // Спрощено: токен на основі ID користувача

    // 4. Створити відповідь та встановити cookie з токеном (доступний для JS на клієнті)
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', authToken, {
      httpOnly: false,           // не httpOnly, щоб був доступний на клієнті
      path: '/',                 // шлях / – cookie буде доступний на всіх сторінках:contentReference[oaicite:0]{index=0}
      sameSite: 'lax',           // захист від CSRF (lax за замовчуванням підходить для авторизації)
      secure: true               // вимагає HTTPS у продакшн (безпечніше використовувати secure)
    });
    return response;  // 5. Відправити відповідь з встановленим cookie
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
