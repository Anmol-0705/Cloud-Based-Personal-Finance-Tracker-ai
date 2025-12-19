from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, transactions, dashboard, family
from app.db import Base, engine

from app.models.transaction import Transaction

Base.metadata.create_all(bind=engine)


# Ensure DB tables exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Family Finance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(transactions.router, prefix="/transactions")
app.include_router(dashboard.router, prefix="/dashboard")
app.include_router(family.router, prefix="/family")
