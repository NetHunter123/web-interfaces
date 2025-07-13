// src/app/(auth)/login/actions.js
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData) {
  // 1. Зчитуємо email і password
  const {email} = formData;
  const {password} = formData;

  // 2. Виконуємо запит до API /api/login (POST JSON з email та password)
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  // 3. Якщо логін невдалий – повертаємо повідомлення про помилку
  if (!res.ok) {
    return { error: 'Неправильний email або пароль' };
  }

  // 4. Якщо успішно – отримуємо токен і встановлюємо його в cookie
  const data = await res.json();
  console.log("action data" , data);
  const token = data.authToken;  // припускаємо, що API повертає токен
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, { path: '/', httpOnly: true });  // встановлюємо auth-token cookie:contentReference[oaicite:2]{index=2}
  const user = JSON.stringify(data.user);  // припускаємо, що API повертає токен
  cookieStore.set('user', user, { path: '/', httpOnly: false });  // встановлюємо auth-token cookie:contentReference[oaicite:2]{index=2}

  //  5. Робимо редірект на головну сторінку після успішного входу
  redirect('/');  // виконує 303 Redirect на клієнті:contentReference[oaicite:3]{index=3}
}
