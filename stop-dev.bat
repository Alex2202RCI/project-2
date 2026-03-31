@echo off
title Stop Next.js Development Server
echo Stopping Next.js development server...
echo.
taskkill /F /IM node.exe 2>nul
if errorlevel 1 (
    echo No running Node.js processes found.
) else (
    echo Server stopped successfully.
)
echo.
pause