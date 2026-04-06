@echo off
title File Watcher and Auto-Restart
cd /d "%~dp0"
set PATH=%~dp0nodejs\node-v20.18.1-win-x64;%PATH%

echo Starting file watcher for auto-rebuild...
echo.
echo This will watch for changes and automatically rebuild the project.
echo Press Ctrl+C to stop watching.
echo.

:watch
echo Checking for changes...
call npm run build
if %errorlevel% equ 0 (
    echo Build successful! Restarting server...
    taskkill /F /IM node.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
    start "" run-prod.bat
) else (
    echo Build failed! Waiting for next change...
)
timeout /t 10 /nobreak >nul
goto watch