"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('auth-token', '', { path: '/', maxAge: 0 }) // видаляємо cookie
  cookieStore.set('user', '', { path: '/', maxAge: 0 }) // видаляємо cookie
  redirect('/login') // редірект після логауту
}
