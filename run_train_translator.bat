@echo off
title Ancient Kannada Multimodal Epigraphical Translator Training
echo =========================================================================
echo Starting Multimodal Ancient Kannada -> Modern Kannada + English Translator
echo Target: Structured JSON (Kingdom, Era, Halegannada, Hosagannada, English)
echo =========================================================================
"C:\Users\Kushal M N\AppData\Local\Programs\Python\Python311\python.exe" train_multimodal_vlm.py %*
pause
