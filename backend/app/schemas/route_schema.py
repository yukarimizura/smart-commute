from pydantic import BaseModel
from typing import List, Optional

class TextRouteRequest(BaseModel):
    origin_text: str
    destination_text: str
    selected_mode: str
    driver_skill: str = "normal"      # "pro", "normal", "beginner"
    departure_time: str = "07:30"     # Format "HH:MM"
    day_type: str = "weekday"         # "weekday", "weekend", "holiday"
    target_arrival_time: str = "09:00"# Jam masuk kelas / meeting

class OptimalTimeRecommendation(BaseModel):
    recommended_departure: str
    saved_minutes: int
    advice: str

class TransportOption(BaseModel):
    mode: str
    key: str
    duration_min: float
    p_late: float
    co2_grams: float
    aqi_risk: str
    detail: str
    is_selected: bool
    recommended: bool = False

class RouteSummary(BaseModel):
    origin_resolved: str
    destination_resolved: str
    distance_km: float
    base_duration_min: float
    weather_live: dict
    planned_departure: str
    day_status: str
    traffic_status: str
    traffic_factor_desc: str
    optimal_window: OptimalTimeRecommendation

class RouteResponse(BaseModel):
    summary: RouteSummary
    options: List[TransportOption]