from pydantic import BaseModel
from typing import List, Optional, Any, Dict

# --- Schema untuk Request dari Frontend ---

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
    selectedRoute: Optional[Dict[str, Any]] = None


# --- Schema yang Dipakai oleh AnalyticsService ---

class TransportOption(BaseModel):
    mode: str
    key: str
    duration_min: float
    p_late: float
    co2_grams: float
    aqi_risk: str
    detail: str
    is_selected: bool = False
    recommended: Optional[bool] = False

class OptimalTimeRecommendation(BaseModel):
    recommended_departure: str
    saved_minutes: int
    advice: str

class RouteSummary(BaseModel):
    origin_resolved: str
    destination_resolved: str
    distance_km: float
    base_duration_min: float
    weather_live: Dict[str, Any]
    planned_departure: str
    day_status: str
    traffic_status: str
    traffic_factor_desc: str
    optimal_window: OptimalTimeRecommendation