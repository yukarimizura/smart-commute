export const BACKEND_BASE_URL = "http://127.0.0.1:8000"

export async function handleResponse(res, defaultErrorMsg) {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || defaultErrorMsg)
  }
  return await res.json()
}