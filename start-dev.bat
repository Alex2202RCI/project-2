@echo off
title Next.js Development Server
cd /d "%~dp0"
set PATH=%~dp0nodejs\node-v20.18.1-win-x64;%PATH%
echo Starting Next.js development server...
echo.
npm run dev
echo.
echo Server stopped. Press any key to close this window...
pause >nul