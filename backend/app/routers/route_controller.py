from fastapi import APIRouter, HTTPException
from app.schemas.route_schema import RoutePreviewRequest, AnalyzeCommuteRequest
from app.services.routing_service import get_route_possibilities
from app.services.weather_service import WeatherService
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix="/api/commute", tags=["Commute Routing & DSS"])

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
        analytics = AnalyticsService()
        result = analytics.evaluate(
            origin=req.originCoords,
            destination=req.destCoords,
            mode=req.selectedMode,
            skill=req.driverSkill,
            departure_time=req.departureTime,
            day_type=req.dayType,
            target_time=req.targetArrivalTime,
            active_route=req.selectedRoute
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))