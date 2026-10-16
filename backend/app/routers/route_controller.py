from fastapi import APIRouter, HTTPException
from app.schemas.route_schema import RoutePreviewRequest, AnalyzeCommuteRequest
from app.services.routing_service import get_route_possibilities
from app.services.analytics_service import AnalyticsService
from app.services.weather_service import WeatherService
from app.services.geocoding_service import GeocodingService

router = APIRouter(prefix="/api", tags=["Commute Routing & DSS"])

@router.post("/preview")
async def preview_routes(req: RoutePreviewRequest):
    try:
        routes = await get_route_possibilities(req.originCoords, req.destCoords, req.mode)
        return {"routes": routes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/analyze")
async def analyze_commute(req: AnalyzeCommuteRequest):
    try:
        active_route = req.selectedRoute or {}
        dist_km = float(active_route.get("distance_km") or 15.0)
        base_min = float(active_route.get("duration_min") or 35.0)

        # 1. Ambil cuaca live (async)
        weather = await WeatherService.get_live_weather(req.originCoords[0], req.originCoords[1])

        # 2. Ambil nama jalan jika tersedia, atau gunakan fallback koordinat
        origin_name = active_route.get("origin_name") or f"{req.originCoords[0]:.4f}, {req.originCoords[1]:.4f}"
        dest_name = active_route.get("dest_name") or f"{req.destCoords[0]:.4f}, {req.destCoords[1]:.4f}"

        # 3. Evaluasi opsi via AnalyticsService
        summary, options = AnalyticsService.evaluate_options(
            dist_km=dist_km,
            base_min=base_min,
            weather=weather,
            selected_mode=req.selectedMode,
            driver_skill=req.driverSkill,
            departure_time=req.departureTime,
            day_type=req.dayType,
            target_arrival_time=req.targetArrivalTime,
            origin_display=origin_name,
            dest_display=dest_name
        )

        return {
            "summary": summary,
            "options": options
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))