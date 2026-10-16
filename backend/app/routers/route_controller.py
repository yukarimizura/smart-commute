from fastapi import APIRouter, HTTPException
from app.schemas.route_schema import RoutePreviewRequest, AnalyzeCommuteRequest
from app.services.routing_service import get_route_possibilities
from app.services.analytics_service import AnalyticsService
from app.services.weather_service import WeatherService

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
        # 1. Ekstrak jarak dan durasi dasar dari active_route yang dikirim frontend
        active_route = req.selectedRoute or {}
        dist_km = float(active_route.get("distance_km") or 15.0)
        base_min = float(active_route.get("duration_min") or 35.0)

        # 2. Ambil data kondisi cuaca terkini`
        weather = await WeatherService.get_live_weather(*req.originCoords)

        # 3. Panggil method static evaluate_options dengan 10 argumen yang dibutuhkan
        summary, options = AnalyticsService.evaluate_options(
            dist_km=dist_km,
            base_min=base_min,
            weather=weather,
            selected_mode=req.selectedMode,
            driver_skill=req.driverSkill,
            departure_time=req.departureTime,
            day_type=req.dayType,
            target_arrival_time=req.targetArrivalTime,
            origin_display=active_route.get("origin_name", "Titik Asal"),
            dest_display=active_route.get("dest_name", "Titik Tujuan")
        )

        def to_dict(obj):
            if hasattr(obj, "model_dump"):
                return obj.model_dump()
            if hasattr(obj, "dict"):
                return obj.dict()
            return obj

        return {
            "summary": to_dict(summary),
            "options": [to_dict(opt) for opt in options]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))