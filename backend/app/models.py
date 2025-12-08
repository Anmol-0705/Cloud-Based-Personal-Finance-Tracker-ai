# app/models.py
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean, Numeric, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid, enum
from datetime import datetime
from .db import Base
from sqlalchemy.sql import func

class RoleEnum(str, enum.Enum):
    owner = "owner"
    member = "member"
    viewer = "viewer"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(255))
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    family_members = relationship("FamilyMember", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")

class Family(Base):
    __tablename__ = "families"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    owner_user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at = Column(DateTime, server_default=func.now())

    members = relationship("FamilyMember", back_populates="family")
    accounts = relationship("Account", back_populates="family")

class FamilyMember(Base):
    __tablename__ = "family_members"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    family_id = Column(UUID(as_uuid=True), ForeignKey("families.id"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.member)
    nickname = Column(String(100))

    family = relationship("Family", back_populates="members")
    user = relationship("User", back_populates="family_members")

class Account(Base):
    __tablename__ = "accounts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    family_id = Column(UUID(as_uuid=True), ForeignKey("families.id"), nullable=False)
    name = Column(String(255))
    type = Column(String(50))
    created_at = Column(DateTime, server_default=func.now())

    family = relationship("Family", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")

class Category(Base):
    __tablename__ = "categories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    family_id = Column(UUID(as_uuid=True), nullable=True)  # null=global
    name = Column(String(100), nullable=False)

class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    account_id = Column(UUID(as_uuid=True), ForeignKey("accounts.id"), nullable=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    family_id = Column(UUID(as_uuid=True), ForeignKey("families.id"), nullable=True)
    amount = Column(Numeric(10,2), nullable=False)
    currency = Column(String(10), default="USD")
    date = Column(DateTime, nullable=False)
    description = Column(Text)
    merchant = Column(String(255))
    category = Column(String(100))
    is_recurring = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())

    account = relationship("Account", back_populates="transactions")
    user = relationship("User", back_populates="transactions")

class Budget(Base):
    __tablename__ = "budgets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    family_id = Column(UUID(as_uuid=True), ForeignKey("families.id"), nullable=False)
    category = Column(String(100))
    limit_amount = Column(Numeric(12,2))
    period = Column(String(20), default="monthly")
    created_at = Column(DateTime, server_default=func.now())
