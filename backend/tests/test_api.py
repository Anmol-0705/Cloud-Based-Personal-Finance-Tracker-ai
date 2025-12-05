# backend/tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db import engine, Base, SessionLocal
from app import models

@pytest.fixture(scope="module", autouse=True)
def prepare_db():
    # Create tables in the actual DB (Postgres) used by app.db.engine
    Base.metadata.create_all(bind=engine)
    yield
    # Optionally drop the tables after tests to keep DB clean:
    # Base.metadata.drop_all(bind=engine)

def test_signup_and_token_and_family_and_transaction():
    client = TestClient(app)

    # Signup
    r = client.post("/auth/signup", json={"email":"test1@example.com","name":"Test One","password":"pass1234"})
    assert r.status_code == 200
    data = r.json()
    assert data["email"] == "test1@example.com"

    # Token / login
    r = client.post("/auth/token", data={"username":"test1@example.com","password":"pass1234"})
    assert r.status_code == 200
    tok = r.json()["access_token"]
    assert tok

    headers = {"Authorization": f"Bearer {tok}"}

    # Create family
    r = client.post("/families", json={"name":"Test Family"}, headers=headers)
    assert r.status_code == 200
    family_id = r.json()["id"]

    # Add transaction
    tx_payload = {
        "amount": 20.5,
        "date": "2025-06-01T10:00:00",
        "description": "UnitTest purchase",
        "merchant": "TestShop",
        "category": "Shopping"
    }
    r = client.post(f"/families/{family_id}/transactions", json=tx_payload, headers=headers)
    assert r.status_code == 200
    tx = r.json()
    assert float(tx["amount"]) == 20.5

    # Get transactions
    r = client.get(f"/families/{family_id}/transactions", headers=headers)
    assert r.status_code == 200
    arr = r.json()
    assert any(t["description"] == "UnitTest purchase" for t in arr)

    # Dashboard
    r = client.get(f"/families/{family_id}/dashboard", headers=headers)
    assert r.status_code == 200
    d = r.json()
    assert "total_last_30_days" in d
