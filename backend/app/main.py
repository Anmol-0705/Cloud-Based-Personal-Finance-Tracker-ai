# app/main.py
from fastapi import FastAPI
from . import models
from .db import engine, Base
from .routes import router
import os

# Create tables if they don't exist (dev convenience)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Family Finance Tracker - Backend")
app.include_router(router)
