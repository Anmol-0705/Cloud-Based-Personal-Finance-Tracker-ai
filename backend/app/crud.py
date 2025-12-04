# app/crud.py
from sqlalchemy.orm import Session
from . import models
from .utils import hash_password
from datetime import datetime

def create_user(db: Session, email: str, name: str, password: str):
    hashed = hash_password(password)
    user = models.User(email=email, name=name, password_hash=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_family(db: Session, name: str, owner_user_id):
    family = models.Family(name=name, owner_user_id=owner_user_id)
    db.add(family)
    db.commit()
    db.refresh(family)
    # add owner as family_member
    member = models.FamilyMember(family_id=family.id, user_id=owner_user_id, role="owner")
    db.add(member)
    db.commit()
    return family

def add_transaction(db: Session, family_id, user_id, tx_in):
    tx = models.Transaction(
        family_id=family_id,
        user_id=user_id,
        amount=tx_in.amount,
        date=tx_in.date,
        description=tx_in.description,
        merchant=tx_in.merchant,
        category=tx_in.category
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

def list_transactions(db: Session, family_id, limit=100):
    return db.query(models.Transaction).filter(models.Transaction.family_id == family_id).order_by(models.Transaction.date.desc()).limit(limit).all()

def dashboard_summary(db: Session, family_id):
    # Simple summary: total last 30 days and per-category totals
    from sqlalchemy import func
    import datetime
    cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=30)
    total = db.query(func.coalesce(func.sum(models.Transaction.amount),0)).filter(models.Transaction.family_id==family_id, models.Transaction.date >= cutoff).scalar()
    per_cat = db.query(models.Transaction.category, func.coalesce(func.sum(models.Transaction.amount),0)).filter(models.Transaction.family_id==family_id, models.Transaction.date >= cutoff).group_by(models.Transaction.category).all()
    return {"total_last_30_days": float(total or 0), "by_category": [{ "category": c, "amount": float(a)} for c,a in per_cat]}
