@echo off
REM Windows batch file to start Mermaid Slides offline server

echo 🧜‍♀️ Mermaid Slides - Offline Server
echo ========================================

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found, starting Python server...
    python start-server.py
    goto :end
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Node.js found, starting Node.js server...
    node start-server.js
    goto :end
)

REM If neither Python nor Node.js is available
echo ❌ Error: Neither Python nor Node.js is installed.
echo.
echo Please install one of the following:
echo - Python 3.x: https://python.org/downloads/
echo - Node.js: https://nodejs.org/download/
echo.
echo Then run this script again.
echo.
pause

:end