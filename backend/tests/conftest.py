# backend/tests/conftest.py
import sys
from pathlib import Path
HERE = Path(__file__).resolve().parent
BACKEND_DIR = HERE.parent  # tests/.. -> backend/
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))
