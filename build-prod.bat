@echo off
title Building Project for Production
cd /d "%~dp0"
set PATH=%~dp0nodejs\node-v20.18.1-win-x64;%PATH%
echo Building project for production...
echo.
call npm run build
echo.
if %errorlevel% equ 0 (
    echo Build completed successfully!
) else (
    echo Build failed!
    pause
)