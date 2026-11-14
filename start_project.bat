@echo off
chcp 65001 > nul
cls
echo ===============================================================================
echo   ANCIENT KANNADA EPIGRAPHY AI - ONE-CLICK UNIFIED LAUNCHER
echo   (FastAPI Neural Epigraphy Backend + Vite React UI)
echo ===============================================================================
echo.

echo [*] Checking Python runtime...
python --version
if errorlevel 1 (
    echo [!] Error: Python is not installed or not in PATH.
    pause
    exit /b 1
)

echo [*] Checking Node.js runtime...
node --version
if errorlevel 1 (
    echo [!] Error: Node.js is not installed or not in PATH.
    pause
    exit /b 1
)

echo.
echo [*] Step 1: Launching FastAPI Neural Epigraphy Backend on port 8000...
start "FastAPI Neural Epigraph Backend (Port 8000)" cmd /k "chcp 65001 > nul && python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [*] Step 2: Waiting 3 seconds for backend initialization...
timeout /t 3 /nobreak > nul

echo [*] Step 3: Launching Vite Frontend on port 5173...
start "Vite Epigraph UI (Port 5173)" cmd /k "npm run dev"

echo [*] Step 4: Opening Browser at http://localhost:5173...
timeout /t 2 /nobreak > nul
start http://localhost:5173

echo.
echo ===============================================================================
echo   SYSTEM LAUNCHED SUCCESSFULLY!
echo   - Web UI: http://localhost:5173
echo   - Neural API Docs: http://localhost:8000/docs
echo ===============================================================================
echo Keep the backend and frontend terminal windows open while working.
echo.

