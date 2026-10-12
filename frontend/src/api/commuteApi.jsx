const BACKEND_BASE_URL = "http://127.0.0.1:8000"

/**
 * Mencari koordinat latitude & longitude dari teks alamat via OpenStreetMap Nominatim
 */
export async function geocodeSearch(queryText) {
  if (!queryText || queryText.trim() === "") return null

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      queryText
    )}&limit=1`

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "id,en",
        "User-Agent": "SmartCommuteDSS/1.0"
      }
    })

    const data = await res.json()
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      }
    }
    return null
  } catch (err) {
    console.error("Geocoding fetch error:", err)
    return null
  }
}

/**
 * Mengambil kemungkinan rute dari backend berdasarkan koordinat dan moda kendaraan
 */
export async function getRoutePreviewApi(originCoords, destCoords, mode = "car") {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/api/routes-preview`, {
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

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.detail || "Gagal mengambil preview kemungkinan rute.")
    }

    return await res.json()
  } catch (err) {
    console.error("Route preview fetch error:", err)
    throw err
  }
}

/**
 * Menjalankan analisis komprehensif DSS ke engine backend FastAPI
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

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.detail || "Terjadi kesalahan saat memproses data analisis.")
    }

    return await res.json()
  } catch (err) {
    console.error("Analyze route API error:", err)
    throw err
  }
}