from pydantic import BaseModel

class TransactionCreate(BaseModel):
    amount: float
    category: str
    merchant: str | None = None

class TransactionOut(TransactionCreate):
    id: int

    class Config:
        orm_mode = True
