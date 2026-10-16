import { BACKEND_BASE_URL, handleResponse } from './client'

export async function loginApi(email, password) {
  const res = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return await handleResponse(res, 'Gagal masuk akun.')
}

export async function registerApi(fullName, email, password) {
  const res = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name: fullName, email, password })
  })
  return await handleResponse(res, 'Gagal mendaftar akun.')
}