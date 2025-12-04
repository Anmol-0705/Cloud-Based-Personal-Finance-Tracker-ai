# app/routes.py
from fastapi import APIRouter, Depends, HTTPException
from . import schemas, crud
from .auth import get_db, get_current_user
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .utils import verify_password, create_access_token
from .crud import create_user, get_user_by_email, create_family, add_transaction, list_transactions, dashboard_summary

router = APIRouter()

@router.post("/auth/signup", response_model=schemas.UserOut)
def signup(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = create_user(db, payload.email, payload.name or "", payload.password)
    return user

@router.post("/auth/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer"}

@router.post("/families", response_model=schemas.FamilyOut)
def create_new_family(payload: schemas.FamilyCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    family = create_family(db, payload.name, current_user.id)
    return family

@router.post("/families/{family_id}/transactions", response_model=schemas.TransactionOut)
def create_transaction(family_id: str, payload: schemas.TransactionCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    tx = add_transaction(db, family_id, current_user.id, payload)
    return tx

@router.get("/families/{family_id}/transactions", response_model=list[schemas.TransactionOut])
def get_transactions(family_id: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_transactions(db, family_id)

@router.get("/families/{family_id}/dashboard")
def get_dashboard(family_id: str, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return dashboard_summary(db, family_id)
