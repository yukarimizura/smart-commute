from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any

from app.services.routing_service import get_route_possibilities
from app.services.weather_service import WeatherService
from app.services.analytics_service import AnalyticsService
from app.routers import route_controller, auth_controller

app = FastAPI(title="Smart Commute DSS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(route_controller.router)
app.include_router(auth_controller.router)

class RoutePreviewRequest(BaseModel):
    originCoords: List[float]
    destCoords: List[float]
    mode: Optional[str] = "car"

class AnalyzeCommuteRequest(BaseModel):
    originCoords: List[float]
    destCoords: List[float]
    selectedMode: str
    driverSkill: str
    departureTime: str
    dayType: str
    targetArrivalTime: str
    selectedRoute: Optional[Any] = None

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Smart Commute DSS Engine is active"}

@app.post("/api/routes-preview")
async def preview_routes(req: RoutePreviewRequest):
    """
    Mengambil opsi rute dinamis (mobil, motor, transit rel) dari OSRM & Overpass API.
    """
    try:
        routes = await get_route_possibilities(
            origin_coords=req.originCoords, 
            dest_coords=req.destCoords, 
            mode=req.mode
        )
        return {"routes": routes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze")
async def analyze_commute(req: AnalyzeCommuteRequest):
    """
    Menganalisis keputusan moda transportasi, probabilitas keterlambatan, dan cuaca.
    """
    try:
        # Ambil cuaca live
        weather_data = await WeatherService.get_live_weather(
            lat=req.originCoords[0],
            lng=req.originCoords[1]
        )

        # Ambil rute sesuai moda yang dipilih
        routes = await get_route_possibilities(
            origin_coords=req.originCoords, 
            dest_coords=req.destCoords, 
            mode=req.selectedMode
        )
        active_route = req.selectedRoute if req.selectedRoute else (routes[0] if routes else None)

        dist_km = active_route["distance_km"] if active_route else 15.0
        base_min = active_route["duration_minutes"] if active_route else 30.0

        # Evaluasi DSS
        summary, options = AnalyticsService.evaluate_options(
            dist_km=dist_km,
            base_min=base_min,
            weather=weather_data,
            selected_mode=req.selectedMode,
            driver_skill=req.driverSkill,
            departure_time=req.departureTime,
            day_type=req.dayType,
            target_arrival_time=req.targetArrivalTime,
            origin_display="Lokasi Asal",
            dest_display="Lokasi Tujuan"
        )

        return {
            "summary": summary,
            "options": options,
            "routes_preview": routes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))