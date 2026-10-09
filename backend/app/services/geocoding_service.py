import re
import httpx
from app.core.config import settings

class GeocodingService:
    @staticmethod
    async def resolve_address(query: str):
        # Jika input sudah berupa koordinat "lat, lng" dari klik pinpoint peta
        coord_match = re.match(r'^\s*([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)\s*$', query)
        if coord_match:
            lat = float(coord_match.group(1))
            lng = float(coord_match.group(2))
            return {
                "lat": lat,
                "lng": lng,
                "display_name": f"Pinpoint Koordinat ({lat:.4f}, {lng:.4f})"
            }

        # Jika teks biasa, lanjutkan tokenisasi dan Nominatim search...
        headers = {"User-Agent": settings.USER_AGENT}
        # (sisa kode pencarian teks tetap sama seperti sebelumnya)