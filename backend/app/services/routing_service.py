import httpx
from app.core.config import settings

class RoutingService:
    @staticmethod
    async def get_live_route_data(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float, use_toll: bool = True):
        # 1. Coba panggil TomTom API jika API Key sudah ada di .env
        if settings.TOMTOM_API_KEY and len(settings.TOMTOM_API_KEY.strip()) > 5:
            locations = f"{origin_lat},{origin_lng}:{dest_lat},{dest_lng}"
            url = f"https://api.tomtom.com/routing/1/calculateRoute/{locations}/json"
            params = {
                "key": settings.TOMTOM_API_KEY.strip(),
                "traffic": "true",
                "departAt": "now",
                "travelMode": "car",
                "routeType": "fastest"
            }
            if not use_toll:
                params["avoid"] = "tollRoads"

            async with httpx.AsyncClient() as client:
                try:
                    res = await client.get(url, params=params, timeout=7.0)
                    if res.status_code == 200:
                        data = res.json()
                        summary = data["routes"][0]["summary"]
                        dist_km = summary["lengthInMeters"] / 1000.0
                        duration_min = summary["travelTimeInSeconds"] / 60.0
                        return round(dist_km, 2), round(duration_min, 1)
                except Exception:
                    pass

        # 2. Fallback otomatis ke OSRM jika key kosong/offline
        return await RoutingService.get_osrm_route(origin_lat, origin_lng, dest_lat, dest_lng)

    @staticmethod
    async def get_osrm_route(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float):
        url = f"{settings.OSRM_URL}/{origin_lng},{origin_lat};{dest_lng},{dest_lat}?overview=false&steps=false"
        async with httpx.AsyncClient() as client:
            try:
                res = await client.get(url, timeout=6.0)
                data = res.json()
                if data.get("code") == "Ok" and len(data.get("routes", [])) > 0:
                    route = data["routes"][0]
                    dist_km = route["distance"] / 1000.0
                    base_duration_min = route["duration"] / 60.0
                    return round(dist_km, 2), round(base_duration_min, 1)
            except Exception:
                pass
        return 17.6, 25.0