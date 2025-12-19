from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    return {"success": True}

@router.post("/signup")
def signup():
    return {"success": True}

@router.post("/logout")
def logout():
    return {"success": True}
