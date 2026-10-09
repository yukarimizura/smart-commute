import httpx
from app.core.config import settings

class WeatherService:
    @staticmethod
    async def get_live_weather(lat: float, lng: float):
        url = f"{settings.WEATHER_URL}?latitude={lat}&longitude={lng}&current=temperature_2m,precipitation,weather_code&timezone=Asia%2FJakarta"
        async with httpx.AsyncClient() as client:
            try:
                res = await client.get(url, timeout=5.0)
                data = res.json()
                curr = data.get("current", {})
                precip = curr.get("precipitation", 0.0)
                return {
                    "temp": curr.get("temperature_2m", 28),
                    "precipitation": precip,
                    "is_raining": precip > 0.1,
                    "condition": "Hujan Lebat" if precip > 5.0 else ("Gerimis" if precip > 0.1 else "Cerah/Berawan")
                }
            except Exception:
                return {"temp": 28, "precipitation": 0.0, "is_raining": False, "condition": "Cerah (Default)"}