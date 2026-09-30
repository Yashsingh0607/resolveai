from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routes import auth_routes, ticket_routes, knowledge_routes

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ResolveAI API",
    description="Enterprise Support Intelligence System API",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_routes.router, prefix="/api/v1")
app.include_router(ticket_routes.router, prefix="/api/v1")
app.include_router(knowledge_routes.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "ResolveAI API is running smoothly"}