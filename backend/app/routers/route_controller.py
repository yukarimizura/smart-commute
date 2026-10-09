from fastapi import APIRouter, HTTPException
from app.schemas.route_schema import TextRouteRequest, RouteResponse
from app.services.geocoding_service import GeocodingService
from app.services.weather_service import WeatherService
from app.services.routing_service import RoutingService
from app.services.analytics_service import AnalyticsService
from app.core.config import settings

router = APIRouter(prefix="", tags=["Route Analysis"])

@router.post("/analyze-route", response_model=RouteResponse)
async def analyze_route(req: TextRouteRequest):
    origin_geo = await GeocodingService.resolve_address(req.origin_text)
    if not origin_geo:
        raise HTTPException(
            status_code=400, 
            detail=f"Alamat asal '{req.origin_text}' tidak ditemukan. Coba masukkan nama jalan/daerah yang lebih umum."
        )

    dest_geo = await GeocodingService.resolve_address(req.destination_text)
    if not dest_geo:
        dest_geo = {
            "lat": settings.DEFAULT_DEST_LAT, 
            "lng": settings.DEFAULT_DEST_LNG, 
            "display_name": "BINUS Kemanggisan (Fallback Acuan Kampus)"
        }

    dist_km, base_min = await RoutingService.get_osrm_route(
        origin_geo["lat"], origin_geo["lng"], dest_geo["lat"], dest_geo["lng"]
    )
    weather = await WeatherService.get_live_weather(origin_geo["lat"], origin_geo["lng"])

    summary, options = AnalyticsService.evaluate_options(
        dist_km=dist_km,
        base_min=base_min,
        weather=weather,
        selected_mode=req.selected_mode,
        driver_skill=req.driver_skill,
        departure_time=req.departure_time,
        day_type=req.day_type,
        target_arrival_time=req.target_arrival_time,
        origin_display=origin_geo["display_name"],
        dest_display=dest_geo["display_name"]
    )

    return RouteResponse(summary=summary, options=options)