@echo off
title Next.js Production System
cd /d "%~dp0"
set PATH=%~dp0nodejs\node-v20.18.1-win-x64;%PATH%

echo ========================================
echo   Next.js Production System
echo ========================================
echo.
echo This script will:
echo 1. Build the project for production
echo 2. Start the production server
echo 3. Watch for changes and auto-rebuild
echo 4. Auto-restart if server crashes
echo.
echo Press Ctrl+C to stop everything.
echo.
pause

:: First, build the project
echo.
echo [1/3] Building project for production...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo BUILD FAILED! Please fix errors and try again.
    echo.
    pause
    exit /b 1
)
echo.
echo Build completed successfully!
echo.

:: Start the file watcher in background
echo [2/3] Starting file watcher...
echo.
start "File Watcher" watch-and-restart.bat

:: Wait a moment for watcher to start
timeout /t 3 /nobreak >nul

:: Start the production server
echo [3/3] Starting production server...
echo.
echo Server will be available at: http://localhost:3000
echo.
echo The system will now:
echo - Auto-restart server if it crashes
echo - Watch for file changes and rebuild
echo - Run continuously until you stop it
echo.
echo ========================================
echo.

call npm start

:: If server stops, show message
echo.
echo Server stopped. The file watcher will automatically restart it.
echo Press any key to exit completely...
pause >nul