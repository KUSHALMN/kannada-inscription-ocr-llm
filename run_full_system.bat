@echo off
title Kannada Inscription OCR & Translation AI Workbench
echo =========================================================================
echo  KANNADA INSCRIPTION TRANSLATOR & OCR AI SYSTEM
echo  NVIDIA RTX 5050 Laptop GPU Acceleration Active
echo =========================================================================
echo.
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Kannada AI Backend (GPU)" cmd /k "title Backend Server && \"C:\Users\Kushal M N\AppData\Local\Programs\Python\Python311\python.exe\" -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Web Interface on http://localhost:3000 ...
start "Kannada AI Web UI" cmd /k "title Web UI && npm run dev"

echo.
echo =========================================================================
echo  System is running!
echo  Open your browser to: http://localhost:3000
echo  Backend Swagger Docs: http://127.0.0.1:8000/docs
echo =========================================================================
pause
