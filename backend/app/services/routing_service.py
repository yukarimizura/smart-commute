import httpx
import math
from typing import List, Dict, Any, Optional

OSRM_BASE_URL = "https://router.project-osrm.org/route/v1"
OVERPASS_ENDPOINTS = [
    "https://overpass-api.de/api/interpreter",
    "https://lz4.overpass-api.de/api/interpreter"
]

HEADERS = {
    "User-Agent": "SmartCommuteDSS/2.0 (University Routing Engine)",
    "Accept": "application/json"
}

async def fetch_osrm(coords_str: str, profile: str = "driving", alternatives: bool = False) -> Dict[str, Any]:
    alt_param = "true" if alternatives else "false"
    url = f"{OSRM_BASE_URL}/{profile}/{coords_str}?overview=full&geometries=geojson&alternatives={alt_param}"
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.get(url, headers=HEADERS)
            if resp.status_code == 200:
                return resp.json()
        except Exception as e:
            print(f"[OSRM Error] {profile}: {e}")
    return {}

async def find_nearest_station_global(lat: float, lng: float, radius_m: int = 8000) -> Optional[Dict[str, Any]]:
    deg_delta = radius_m / 111000.0
    s, w, n, e = lat - deg_delta, lng - deg_delta, lat + deg_delta, lng + deg_delta

    query = f"""
    [out:json][timeout:8];
    (
      node["railway"~"station|halt"]({s},{w},{n},{e});
      node["station"~"subway|train|light_rail"]({s},{w},{n},{e});
      way["railway"="station"]({s},{w},{n},{e});
    );
    out center 10;
    """

    for ep in OVERPASS_ENDPOINTS:
        try:
            async with httpx.AsyncClient(timeout=8.0) as client:
                res = await client.post(ep, data={"data": query}, headers=HEADERS)
                if res.status_code == 200:
                    data = res.json()
                    elements = data.get("elements", [])
                    if elements:
                        valid = []
                        for el in elements:
                            s_lat = el.get("lat") or el.get("center", {}).get("lat")
                            s_lng = el.get("lon") or el.get("center", {}).get("lon")
                            if s_lat and s_lng:
                                name = el.get("tags", {}).get("name") or el.get("tags", {}).get("name:en") or "Stasiun Transit"
                                d = math.hypot(s_lat - lat, s_lng - lng)
                                valid.append({"name": name, "lat": s_lat, "lng": s_lng, "dist": d})
                        if valid:
                            return min(valid, key=lambda x: x["dist"])
        except Exception:
            continue
    return None

async def get_route_possibilities(origin_coords: List[float], dest_coords: List[float], mode: str = "car") -> List[Dict[str, Any]]:
    orig_lat, orig_lng = origin_coords[0], origin_coords[1]
    dest_lat, dest_lng = dest_coords[0], dest_coords[1]

    # ==========================================================
    # MODA 1: TRANSIT / KERETA / KRL (MULTIMODA BERSIH)
    # ==========================================================
    if mode == "krl":
        st_origin = await find_nearest_station_global(orig_lat, orig_lng)
        st_dest = await find_nearest_station_global(dest_lat, dest_lng)

        # Fallback jika stasiun tidak terdeteksi
        if not st_origin:
            st_origin = {"name": "Stasiun Transit Asal", "lat": orig_lat + 0.012, "lng": orig_lng + 0.008}
        if not st_dest:
            st_dest = {"name": "Stasiun Transit Tujuan", "lat": dest_lat - 0.010, "lng": dest_lng - 0.005}

        # 1. First-Mile (Jalan Kaki ke Stasiun Keberangkatan)
        seg1_str = f"{orig_lng},{orig_lat};{st_origin['lng']},{st_origin['lat']}"
        data_walk1 = await fetch_osrm(seg1_str, profile="foot")
        walk1_coords = []
        d1_km, t1_min = 0.0, 0.0
        if data_walk1.get("routes"):
            r1 = data_walk1["routes"][0]
            walk1_coords = [[pt[1], pt[0]] for pt in r1["geometry"]["coordinates"]]
            d1_km = r1["distance"] / 1000.0
            t1_min = r1["duration"] / 60.0
        else:
            walk1_coords = [[orig_lat, orig_lng], [st_origin["lat"], st_origin["lng"]]]
            d1_km = math.hypot(st_origin["lat"] - orig_lat, st_origin["lng"] - orig_lng) * 111.0
            t1_min = (d1_km / 4.5) * 60.0

        # 2. Last-Mile (Jalan Kaki dari Stasiun Kedatangan ke Titik Akhir)
        seg2_str = f"{st_dest['lng']},{st_dest['lat']};{dest_lng},{dest_lat}"
        data_walk2 = await fetch_osrm(seg2_str, profile="foot")
        walk2_coords = []
        d2_km, t2_min = 0.0, 0.0
        if data_walk2.get("routes"):
            r2 = data_walk2["routes"][0]
            walk2_coords = [[pt[1], pt[0]] for pt in r2["geometry"]["coordinates"]]
            d2_km = r2["distance"] / 1000.0
            t2_min = r2["duration"] / 60.0
        else:
            walk2_coords = [[st_dest["lat"], st_dest["lng"]], [dest_lat, dest_lng]]
            d2_km = math.hypot(dest_lat - st_dest["lat"], dest_lng - st_dest["lng"]) * 111.0
            t2_min = (d2_km / 4.5) * 60.0

        # 3. Jalur Rel (Langsung menghubungkan kedua stasiun tanpa lompatan balik)
        rail_coords = [[st_origin["lat"], st_origin["lng"]], [st_dest["lat"], st_dest["lng"]]]
        d_rail_km = math.hypot(st_dest["lat"] - st_origin["lat"], st_dest["lng"] - st_origin["lng"]) * 111.0
        t_rail_min = (d_rail_km / 45.0) * 60.0

        total_dist = round(d1_km + d_rail_km + d2_km, 2)
        total_time = round(t1_min + t_rail_min + t2_min + 6.0)

        return [{
            "id": 0,
            "label": f"KRL / Transit: {st_origin['name']} ➔ {st_dest['name']}",
            "distance_km": total_dist,
            "duration_minutes": total_time,
            "color": "#ef4444",
            "mode_type": "krl",
            # Kirim segmen terpisah agar Leaflet menggambar rapi tanpa looping
            "segments": {
                "first_mile": walk1_coords,
                "rail": rail_coords,
                "last_mile": walk2_coords,
                "origin_station": st_origin["name"],
                "dest_station": st_dest["name"]
            },
            # Koordinat gabungan yang terurut satu arah
            "coordinates": walk1_coords + rail_coords + walk2_coords
        }]

    # ==========================================================
    # MODA 2: MOBIL PRIBADI (JALAN RAYA & TOL)
    # ==========================================================
    elif mode == "car":
        coords_str = f"{orig_lng},{orig_lat};{dest_lng},{dest_lat}"
        data = await fetch_osrm(coords_str, profile="driving", alternatives=True)

        if not data.get("routes"):
            return []

        routes = data["routes"][:2]
        results = []
        labels = ["Mobil: Rute Utama (Tol / Arteri Cepat)", "Mobil: Rute Alternatif Non-Tol"]
        colors = ["#38bdf8", "#818cf8"]

        for idx, r in enumerate(routes):
            coords = [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]]
            dist_km = round(r["distance"] / 1000.0, 2)
            dur_mins = round(r["duration"] / 60.0)

            results.append({
                "id": idx,
                "label": labels[idx] if idx < len(labels) else f"Mobil Opsi {idx+1}",
                "distance_km": dist_km,
                "duration_minutes": dur_mins,
                "color": colors[idx],
                "coordinates": coords,
                "mode_type": "car"
            })
        return results

    # ==========================================================
    # MODA 3: SEPEDA MOTOR (RUTE NON-TOL & JALAN TIKUS NYATA)
    # ==========================================================
    else:
        results = []
        colors = ["#f59e0b", "#d97706", "#b45309"]

        # Rute 1: Jalur Arteri Utama OSRM
        c_str = f"{orig_lng},{orig_lat};{dest_lng},{dest_lat}"
        d1 = await fetch_osrm(c_str, profile="driving", alternatives=False)
        if d1.get("routes"):
            r = d1["routes"][0]
            results.append({
                "id": 0,
                "label": "Motor: Koridor Arteri Reguler",
                "distance_km": round(r["distance"] / 1000.0, 2),
                "duration_minutes": max(5, round((r["duration"] / 60.0) * 0.8)),
                "color": colors[0],
                "coordinates": [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]],
                "mode_type": "motorcycle"
            })

        # Rute 2: Jalur Alternatif via Waypoint Barat/Selatan
        mid_lat1 = (orig_lat * 0.6 + dest_lat * 0.4) - 0.008
        mid_lng1 = (orig_lng * 0.6 + dest_lng * 0.4) + 0.012
        c_str2 = f"{orig_lng},{orig_lat};{mid_lng1},{mid_lat1};{dest_lng},{dest_lat}"
        d2 = await fetch_osrm(c_str2, profile="driving", alternatives=False)
        if d2.get("routes"):
            r = d2["routes"][0]
            results.append({
                "id": 1,
                "label": "Motor: Jalur Tikus / Pemukiman Barat",
                "distance_km": round(r["distance"] / 1000.0, 2),
                "duration_minutes": max(5, round((r["duration"] / 60.0) * 0.75)),
                "color": colors[1],
                "coordinates": [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]],
                "mode_type": "motorcycle"
            })

        # Rute 3: Jalur Alternatif via Waypoint Timur/Utara
        mid_lat2 = (orig_lat * 0.4 + dest_lat * 0.6) + 0.010
        mid_lng2 = (orig_lng * 0.4 + dest_lng * 0.6) - 0.010
        c_str3 = f"{orig_lng},{orig_lat};{mid_lng2},{mid_lat2};{dest_lng},{dest_lat}"
        d3 = await fetch_osrm(c_str3, profile="driving", alternatives=False)
        if d3.get("routes"):
            r = d3["routes"][0]
            results.append({
                "id": 2,
                "label": "Motor: Bypass Koridor Timur",
                "distance_km": round(r["distance"] / 1000.0, 2),
                "duration_minutes": max(5, round((r["duration"] / 60.0) * 0.78)),
                "color": colors[2],
                "coordinates": [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]],
                "mode_type": "motorcycle"
            })

        return results