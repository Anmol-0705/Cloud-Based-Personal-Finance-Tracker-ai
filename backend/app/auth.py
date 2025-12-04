# app/auth.py
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from .utils import SECRET_KEY, ALGORITHM
from .db import SessionLocal
from .crud import get_user_by_email
from . import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub = payload.get("sub")
        if sub is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.id==sub).first()
    db.close()
    if user is None:
        raise credentials_exception
    return user
