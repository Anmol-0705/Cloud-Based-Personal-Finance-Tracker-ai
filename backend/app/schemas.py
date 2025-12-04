# app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    name: Optional[str]
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    name: Optional[str]

    class Config:
        orm_mode = True

class FamilyCreate(BaseModel):
    name: str

class FamilyOut(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True

class TransactionCreate(BaseModel):
    amount: float
    date: datetime
    description: Optional[str] = None
    merchant: Optional[str] = None
    category: Optional[str] = None

class TransactionOut(BaseModel):
    id: UUID
    amount: float
    date: datetime
    description: Optional[str]
    merchant: Optional[str]
    category: Optional[str]

    class Config:
        orm_mode = True
