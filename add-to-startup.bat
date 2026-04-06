@echo off
title Add to Windows Startup
cd /d "%~dp0"

echo Adding project to Windows Startup...
echo.

:: Create a shortcut in the Startup folder
set "startupFolder=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "projectPath=%~dp0run-prod.bat"

echo Creating shortcut in Startup folder...
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "%startupFolder%\NextJS-Project.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "%projectPath%" >> CreateShortcut.vbs
echo oLink.WorkingDirectory = "%~dp0" >> CreateShortcut.vbs
echo oLink.Description = "Next.js Project Server" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs

cscript //nologo CreateShortcut.vbs
del CreateShortcut.vbs

if exist "%startupFolder%\NextJS-Project.lnk" (
    echo.
    echo Successfully added to Windows Startup!
    echo The project will now start automatically when Windows boots.
    echo.
    echo Location: %startupFolder%\NextJS-Project.lnk
) else (
    echo.
    echo Failed to add to Startup folder.
    echo You can manually add run-prod.bat to your Startup folder.
)

echo.
pause