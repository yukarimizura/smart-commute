export async function geocodeSearch(query) {
    if (!query || query.trim().length === 0) return null;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&countrycodes=id&limit=1`;
    try {
    const res = await fetch(url, {
        headers: { 'User-Agent': 'SmartCommuteAOL/1.0 (academic-project)' }
    });
    const data = await res.json();
    if (data && data.length > 0) {
        return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
        };
    }
    } catch (err) {
    console.error("Geocoding gagal:", err);
    }
    return null;
    }

export async function analyzeRouteApi({ 
    originCoords, 
    destCoords, 
    selectedMode, 
    driverSkill,
    departureTime,
    dayType,
    targetArrivalTime
    }) {
    const res = await fetch('http://localhost:8000/analyze-route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        origin_text: `${originCoords[0]}, ${originCoords[1]}`,
        destination_text: `${destCoords[0]}, ${destCoords[1]}`,
        selected_mode: selectedMode,
        driver_skill: driverSkill,
        departure_time: departureTime,
        day_type: dayType,
        target_arrival_time: targetArrivalTime
    })
    });

    if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.detail || 'Gagal memproses analisis rute.');
    }

    return await res.json();
}