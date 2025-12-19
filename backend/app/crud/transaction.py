from sqlalchemy.orm import Session
from app.models.transaction import Transaction

def get_all(db: Session):
    return db.query(Transaction).all()

def create(db: Session, data):
    tx = Transaction(
        amount=data.amount,
        category=data.category,
        merchant=data.merchant
    )
    db.add(tx)
    db.commit()
    db.refresh(tx)
    return tx

def delete(db: Session, tx_id: int):
    tx = db.query(Transaction).filter(Transaction.id == tx_id).first()
    if not tx:
        return None
    db.delete(tx)
    db.commit()
    return tx
