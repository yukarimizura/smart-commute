import os
from dotenv import load_dotenv

# Muat file .env dari root folder backend
load_dotenv()

class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "Smart Commute Real-Time Engine")
    TOMTOM_API_KEY: str = os.getenv("TOMTOM_API_KEY", "")
    
    DEFAULT_DEST_LAT: float = -6.2018
    DEFAULT_DEST_LNG: float = 106.7822
    NOMINATIM_URL: str = "https://nominatim.openstreetmap.org/search"
    OSRM_URL: str = "https://router.project-osrm.org/route/v1/driving"
    WEATHER_URL: str = "https://api.open-meteo.com/v1/forecast"
    USER_AGENT: str = "SmartCommuteAOL/1.0 (academic-project)"

settings = Settings()