# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from app.api.deps import get_db
# from app.models.transaction import Transaction

# router = APIRouter()

# @router.get("/summary")
# def dashboard_summary(db: Session = Depends(get_db)):
#     txs = db.query(Transaction).all()

#     total = sum(t.amount for t in txs)
#     credit = sum(t.amount for t in txs if t.amount > 0)
#     debit = sum(t.amount for t in txs if t.amount < 0)

#     recent = (
#         db.query(Transaction)
#         .order_by(Transaction.created_at.desc())
#         .limit(10)
#         .all()
#     )

#     return {
#         "total": total,
#         "credit": credit,
#         "debit": abs(debit),
#         "recent": recent,
#     }



from fastapi import APIRouter, Depends
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

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    txs = db.query(Transaction).all()

    total = sum(t.amount for t in txs)
    credit = sum(t.amount for t in txs if t.amount > 0)
    debit = abs(sum(t.amount for t in txs if t.amount < 0))

    recent = (
        db.query(Transaction)
        .order_by(Transaction.created_at.desc())
        .limit(10)
        .all()
    )

    return {
        "total": total,
        "credit": credit,
        "debit": debit,
        "recent": recent,
    }
