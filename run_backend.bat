@echo off
title Kannada Heritage AI Backend Server (RTX 5050 GPU)
echo =========================================================================
echo Starting FastAPI Epigraphical Backend Server with Neural Models Active!
echo GPU: NVIDIA GeForce RTX 5050 Laptop GPU (sm_120 Blackwell)
echo Endpoints:
echo   - Swagger Docs: http://127.0.0.1:8000/docs
echo   - Health Check: http://127.0.0.1:8000/api/v1/health
echo   - Inscription Analysis: POST http://127.0.0.1:8000/api/v1/analyze
echo   - Direct Translation:   POST http://127.0.0.1:8000/api/v1/translate
echo =========================================================================
"C:\Users\Kushal M N\AppData\Local\Programs\Python\Python311\python.exe" -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
pause
