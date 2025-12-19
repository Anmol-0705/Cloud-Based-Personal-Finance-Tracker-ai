# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.api.deps import get_db
# from app.models.transaction import Transaction

# router = APIRouter()

# @router.get("/")
# def get_transactions(db: Session = Depends(get_db)):
#     return db.query(Transaction).order_by(Transaction.created_at.desc()).all()

# @router.post("/")
# def create_transaction(payload: dict, db: Session = Depends(get_db)):
#     if not all(k in payload for k in ("amount", "category", "merchant")):
#         raise HTTPException(status_code=400, detail="Invalid payload")

#     tx = Transaction(
#         amount=payload["amount"],
#         category=payload["category"],
#         merchant=payload["merchant"]
#     )
#     db.add(tx)
#     db.commit()
#     db.refresh(tx)
#     return tx

# @router.delete("/{tx_id}")
# def delete_transaction(tx_id: int, db: Session = Depends(get_db)):
#     tx = db.query(Transaction).filter(Transaction.id == tx_id).first()
#     if not tx:
#         raise HTTPException(status_code=404, detail="Transaction not found")

#     db.delete(tx)
#     db.commit()
#     return {"success": True}



from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.transaction import Transaction

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_transactions(db: Session = Depends(get_db)):
    return db.query(Transaction).order_by(Transaction.created_at.desc()).all()

@router.post("/")
def create_transaction(payload: dict, db: Session = Depends(get_db)):
    if not all(k in payload for k in ("amount", "category", "merchant")):
        raise HTTPException(status_code=400, detail="Invalid payload")

    tx = Transaction(
        amount=float(payload["amount"]),
        category=payload["category"],
        merchant=payload["merchant"],
    )

    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

@router.delete("/{tx_id}")
def delete_transaction(tx_id: int, db: Session = Depends(get_db)):
    tx = db.query(Transaction).filter(Transaction.id == tx_id).first()
    if not tx:
        raise HTTPException(status_code=404, detail="Transaction not found")

    db.delete(tx)
    db.commit()
    return {"success": True}
