/**
 * Mencari latitude dan longitude dari teks alamat via OpenStreetMap Nominatim
 */
export async function geocodeSearch(queryText) {
  if (!queryText || !queryText.trim()) return null

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      queryText.trim()
    )}&limit=1`

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "id,en",
        "User-Agent": "SmartCommuteDSS/2.0"
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