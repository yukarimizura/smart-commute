from fastapi import FastAPI
from fastapi.responses import Response
from app.core.config import settings
from app.middlewares.cors import setup_cors
from app.routers.route_controller import router as route_router

app = FastAPI(title=settings.PROJECT_NAME)

setup_cors(app)

app.include_router(route_router)

@app.get("/")
def health_check():
    return {"status": "Backend running", "project": settings.PROJECT_NAME}

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)