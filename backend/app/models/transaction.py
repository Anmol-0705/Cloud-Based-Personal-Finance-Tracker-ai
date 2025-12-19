# from sqlalchemy import Column, Integer, Float, String, DateTime
# from sqlalchemy.sql import func
# from app.db import Base

# class Transaction(Base):
#     __tablename__ = "transactions"

#     id = Column(Integer, primary_key=True, index=True)
#     amount = Column(Float, nullable=False)
#     category = Column(String, nullable=False)
#     merchant = Column(String, nullable=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())



from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    merchant = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
