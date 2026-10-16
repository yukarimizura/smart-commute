from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import route_controller, auth_controller

app = FastAPI(
    title="Smart Commute DSS API",
    description="Decision Support System API for Urban Mobility",
    version="2.0.0"
)

# Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router Endpoints
app.include_router(route_controller.router)
app.include_router(auth_controller.router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "engine": "Smart Commute DSS Core v2.0",
        "services": ["routing", "weather", "analytics", "auth"]
    }