@echo off
title Next.js Production Server
cd /d "%~dp0"
set PATH=%~dp0nodejs\node-v20.18.1-win-x64;%PATH%

:loop
echo Starting Next.js production server...
echo.
call npm start
echo.
echo Server stopped. Restarting in 5 seconds...
timeout /t 5 /nobreak >nul
goto loop