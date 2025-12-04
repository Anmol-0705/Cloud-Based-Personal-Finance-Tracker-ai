# app/data_loader.py
import pandas as pd
import os
from datetime import datetime
from .db import SessionLocal
from . import models
from sqlalchemy.orm import Session

CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "synthetic_transactions.csv")

def load_csv_to_db():
    df = pd.read_csv(CSV_PATH, parse_dates=["date"])
    db: Session = SessionLocal()
    try:
        # Create a default "demo" user and family if not exist
        user = db.query(models.User).filter(models.User.email=="demo@local").first()
        if not user:
            user = models.User(email="demo@local", name="Demo User", password_hash="demo")
            db.add(user); db.commit(); db.refresh(user)
        family = db.query(models.Family).filter(models.Family.name=="Demo Family").first()
        if not family:
            family = models.Family(name="Demo Family", owner_user_id=user.id)
            db.add(family); db.commit(); db.refresh(family)
            member = models.FamilyMember(family_id=family.id, user_id=user.id, role="owner")
            db.add(member); db.commit()
        for _, row in df.iterrows():
            tx = models.Transaction(
                family_id=family.id,
                user_id=user.id,
                amount=row["amount"],
                date=row["date"],
                description=row.get("description"),
                merchant=row.get("merchant"),
                category=row.get("category")
            )
            db.add(tx)
        db.commit()
        print("Loaded CSV rows:", len(df))
    finally:
        db.close()

if __name__ == "__main__":
    load_csv_to_db()
