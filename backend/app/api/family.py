from fastapi import APIRouter

router = APIRouter()

@router.get("")
def get_family():
    return []

@router.post("/invite")
def invite_member():
    return {"success": True}
