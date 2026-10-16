import { BACKEND_BASE_URL, handleResponse } from './client'

/**
 * Mengambil opsi rute (motor, mobil, transit kereta) dari backend FastAPI
 */
export async function getRoutePreviewApi(originCoords, destCoords, mode = "car") {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        originCoords,
        destCoords,
        mode
      })
    })

    return await handleResponse(res, "Gagal mengambil pratinjau rute.")
  } catch (err) {
    console.error("Route preview fetch error:", err)
    throw err
  }
}

/**
 * Menjalankan kalkulasi DSS, evaluasi keterlambatan, dan emisi ke backend
 */
export async function analyzeRouteApi(payload) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    return await handleResponse(res, "Gagal memproses kalkulasi analisis rute.")
  } catch (err) {
    console.error("Analyze route API error:", err)
    throw err
  }
}