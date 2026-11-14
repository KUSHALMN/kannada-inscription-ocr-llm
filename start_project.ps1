# One-Click Unified Launcher for Ancient Kannada Epigraphy AI (PowerShell)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host

Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "  ANCIENT KANNADA EPIGRAPHY AI - ONE-CLICK UNIFIED LAUNCHER" -ForegroundColor Yellow
Write-Host "  (FastAPI Neural Epigraphy Backend + Vite React UI)" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[*] Step 1: Starting FastAPI Neural Epigraphy Backend on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "[*] Step 2: Waiting for backend startup..." -ForegroundColor Green
Start-Sleep -Seconds 3

Write-Host "[*] Step 3: Starting Vite Frontend on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "[*] Step 4: Opening Browser..." -ForegroundColor Green
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "  PLATFORM LAUNCHED!" -ForegroundColor Yellow
Write-Host "  - UI: http://localhost:5173" -ForegroundColor White
Write-Host "  - API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "===============================================================================" -ForegroundColor Cyan

