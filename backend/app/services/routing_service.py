import httpx
import math

OSRM_BASE_URL = "http://router.project-osrm.org/route/v1"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

async def fetch_osrm_route(coords_str: str, profile: str = "driving", alternatives: str = "false"):
    url = f"{OSRM_BASE_URL}/{profile}/{coords_str}?overview=full&geometries=geojson&alternatives={alternatives}"
    async with httpx.AsyncClient(timeout=12.0) as client:
        resp = await client.get(url)
        return resp.json()

async def find_nearest_transit_station_osm(coords, radius_meters=8000):
    """
    Mencari stasiun transit / kereta api terdekat di negara mana pun menggunakan OpenStreetMap.
    """
    lat, lng = coords[0], coords[1]
    query = f"""
    [out:json][timeout:15];
    (
      node["railway"="station"](around:{radius_meters},{lat},{lng});
      node["railway"="halt"](around:{radius_meters},{lat},{lng});
      node["station"="subway"](around:{radius_meters},{lat},{lng});
    );
    out body 10;
    """
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(OVERPASS_URL, data={"data": query})
            data = resp.json()

        elements = data.get("elements", [])
        if not elements:
            return None

        def distance_fn(node):
            return math.hypot(node["lat"] - lat, node["lon"] - lng)

        nearest = min(elements, key=distance_fn)
        name = nearest.get("tags", {}).get("name") or nearest.get("tags", {}).get("int_name") or "Transit Station"
        return {
            "name": name,
            "lat": nearest["lat"],
            "lng": nearest["lon"]
        }
    except Exception as e:
        print(f"Error finding station via Overpass: {e}")
        return None

async def get_transit_track_osm(st_a, st_b):
    """
    Menarik geometri rel kereta api nyata antara stasiun A dan B dari OpenStreetMap.
    Jika overpass sibuk, fallback ke OSRM driving profile sebagai jalur penghubung.
    """
    min_lat, max_lat = min(st_a["lat"], st_b["lat"]) - 0.02, max(st_a["lat"], st_b["lat"]) + 0.02
    min_lng, max_lng = min(st_a["lng"], st_b["lng"]) - 0.02, max(st_a["lng"], st_b["lng"]) + 0.02
    
    query = f"""
    [out:json][timeout:15];
    (
      way["railway"~"rail|light_rail|subway"]({min_lat},{min_lng},{max_lat},{max_lng});
    );
    out geom 50;
    """
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(OVERPASS_URL, data={"data": query})
            data = resp.json()

        elements = data.get("elements", [])
        track_coords = []
        for el in elements:
            geom = el.get("geometry", [])
            for pt in geom:
                track_coords.append([pt["lat"], pt["lon"]])
        
        if len(track_coords) >= 4:
            # Sortir / sampel koordinat rel
            step = max(1, len(track_coords) // 40)
            sampled = track_coords[::step]
            return [[st_a["lat"], st_a["lng"]]] + sampled + [[st_b["lat"], st_b["lng"]]]
    except Exception as e:
        print(f"Error fetching railway geometry: {e}")

    # Fallback jika jaringan rel belum termuat penuh: sambungkan stasiun langsung
    return [[st_a["lat"], st_a["lng"]], [st_b["lat"], st_b["lng"]]]

async def get_route_possibilities(origin_coords, dest_coords, mode="car"):
    """
    Menghasilkan alternatif rute dinamis global sesuai topologi jalan & moda.
    """
    try:
        # ==========================================
        # 1. KRL / KERETA / SUBWAY (MULTIMODA TRANSIT)
        # ==========================================
        if mode == "krl":
            st_origin = await find_nearest_transit_station_osm(origin_coords)
            st_dest = await find_nearest_transit_station_osm(dest_coords)

            # Jika stasiun tidak ditemukan dalam jangkauan, fallback rute darat
            if not st_origin or not st_dest or (st_origin["lat"] == st_dest["lat"] and st_origin["lng"] == st_dest["lng"]):
                coords_str = f"{origin_coords[1]},{origin_coords[0]};{dest_coords[1]},{dest_coords[0]}"
                data = await fetch_osrm_route(coords_str, profile="driving")
                if data.get("code") == "Ok" and data.get("routes"):
                    r = data["routes"][0]
                    coords = [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]]
                    return [{
                        "id": 0,
                        "label": "Rute Transit (Jalur Darat Terusan)",
                        "distance_km": round(r["distance"] / 1000, 2),
                        "duration_minutes": round(r["duration"] / 60),
                        "color": "#ef4444",
                        "coordinates": coords,
                        "mode_type": "krl"
                    }]
                return []

            # Segmen 1: First-mile (jalan kaki / berkendara ke stasiun asal)
            seg1_coords = f"{origin_coords[1]},{origin_coords[0]};{st_origin['lng']},{st_origin['lat']}"
            data_seg1 = await fetch_osrm_route(seg1_coords, profile="walking")

            # Segmen 3: Last-mile (jalan kaki dari stasiun tujuan ke titik akhir)
            seg2_coords = f"{st_dest['lng']},{st_dest['lat']};{dest_coords[1]},{dest_coords[0]}"
            data_seg2 = await fetch_osrm_route(seg2_coords, profile="walking")

            first_mile_coords = []
            d1_km = 0.0
            dur1_min = 0.0
            if data_seg1.get("code") == "Ok" and data_seg1.get("routes"):
                r1 = data_seg1["routes"][0]
                first_mile_coords = [[pt[1], pt[0]] for pt in r1["geometry"]["coordinates"]]
                d1_km = r1["distance"] / 1000
                dur1_min = r1["duration"] / 60

            last_mile_coords = []
            d2_km = 0.0
            dur2_min = 0.0
            if data_seg2.get("code") == "Ok" and data_seg2.get("routes"):
                r2 = data_seg2["routes"][0]
                last_mile_coords = [[pt[1], pt[0]] for pt in r2["geometry"]["coordinates"]]
                d2_km = r2["distance"] / 1000
                dur2_min = r2["duration"] / 60

            # Segmen 2: Garis rel kereta api nyata
            rail_coords = await get_transit_track_osm(st_origin, st_dest)
            rail_dist_km = math.hypot(st_dest["lat"] - st_origin["lat"], st_dest["lng"] - st_origin["lng"]) * 111.0
            rail_dur_min = (rail_dist_km / 45.0) * 60.0  # Asumsi rata-rata kecepatan rel perkotaan 45 km/jam

            all_coords = first_mile_coords + rail_coords + last_mile_coords
            total_dist_km = round(d1_km + rail_dist_km + d2_km, 2)
            total_dur_min = round(dur1_min + rail_dur_min + dur2_min + 7.0)  # +7 mnt waktu tunggu stasiun

            return [{
                "id": 0,
                "label": f"Transit: {st_origin['name']} → {st_dest['name']}",
                "distance_km": total_dist_km,
                "duration_minutes": total_dur_min,
                "color": "#ef4444",
                "coordinates": all_coords,
                "mode_type": "krl"
            }]

        # ==========================================
        # 2. MOBIL PRIBADI (DRIVING ALTERNATIVES)
        # ==========================================
        elif mode == "car":
            coords_str = f"{origin_coords[1]},{origin_coords[0]};{dest_coords[1]},{dest_coords[0]}"
            data = await fetch_osrm_route(coords_str, profile="driving", alternatives="true")

            if data.get("code") != "Ok" or not data.get("routes"):
                return []

            results = []
            colors = ["#38bdf8", "#818cf8", "#38bdf8"]
            for idx, r in enumerate(data["routes"][:3]):
                coords = [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]]
                dist_km = round(r["distance"] / 1000, 2)
                dur_min = round(r["duration"] / 60)
                label = f"Mobil: Rute Utama ({dist_km} km)" if idx == 0 else f"Mobil: Alternatif {idx} ({dist_km} km)"

                results.append({
                    "id": idx,
                    "label": label,
                    "distance_km": dist_km,
                    "duration_minutes": dur_min,
                    "color": colors[idx % len(colors)],
                    "coordinates": coords,
                    "mode_type": "car"
                })
            return results

        # ==========================================
        # 3. SEPEDA MOTOR (MOTORCYCLE / TWO-WHEELER)
        # ==========================================
        else:
            coords_str = f"{origin_coords[1]},{origin_coords[0]};{dest_coords[1]},{dest_coords[0]}"
            data = await fetch_osrm_route(coords_str, profile="driving", alternatives="true")

            if data.get("code") != "Ok" or not data.get("routes"):
                return []

            results = []
            colors = ["#f59e0b", "#d97706", "#f97316"]
            for idx, r in enumerate(data["routes"][:3]):
                coords = [[pt[1], pt[0]] for pt in r["geometry"]["coordinates"]]
                dist_km = round(r["distance"] / 1000, 2)
                # Durasi motor sedikit lebih cepat di lalu lintas urban
                dur_min = max(5, round((r["duration"] / 60) * 0.85))
                label = f"Motor: Rute Utama ({dist_km} km)" if idx == 0 else f"Motor: Alternatif {idx} ({dist_km} km)"

                results.append({
                    "id": idx,
                    "label": label,
                    "distance_km": dist_km,
                    "duration_minutes": dur_min,
                    "color": colors[idx % len(colors)],
                    "coordinates": coords,
                    "mode_type": "motorcycle"
                })
            return results

    except Exception as e:
        print(f"Global routing error: {e}")
        return []