from pydantic import BaseModel
from typing import List, Optional, Any, Dict

# --- Schema untuk Request ---

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


# --- Schema untuk Analytics Service & Response ---

class TransportOption(BaseModel):
    mode: str
    name: str
    total_time_min: float
    travel_time_min: float
    buffer_time_min: float
    parking_buffer_min: float
    distance_km: float
    cost_idr: int
    emission_co2_grams: float
    weather_impact_percent: float
    punctuality_prob_percent: float
    dss_score: float
    route_details: Optional[Dict[str, Any]] = None

class RouteSummary(BaseModel):
    origin: List[float]
    destination: List[float]
    departure_time: str
    target_arrival_time: str
    weather_condition: str
    rain_probability_percent: float

class OptimalTimeRecommendation(BaseModel):
    recommended_departure: str
    reason: str
    estimated_arrival: str
    time_saved_min: float

class CommuteOptionResponse(BaseModel):
    id: str
    mode: str
    name: str
    duration_min: float
    distance_km: float
    cost_rp: int
    emission_g: float
    rain_risk_percent: float
    score: float

class CommuteAnalysisResponse(BaseModel):
    summary: Dict[str, Any]
    options: List[CommuteOptionResponse]
    routes_preview: Optional[List[Dict[str, Any]]] = None