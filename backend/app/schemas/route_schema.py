from pydantic import BaseModel
from typing import List, Optional, Any, Dict

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