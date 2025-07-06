@echo off
echo 🧜‍♀️ Mermaid Slides - Starting Server...
echo.

REM Show help if requested
if "%1"=="-h" goto help
if "%1"=="--help" goto help
goto main

:help
echo Mermaid Slides Offline Server
echo Usage: %0 [options]
echo Options:
echo   -p, --port ^<number^>  Port to run the server on (default: 3000)
echo   --no-browser         Do not automatically open browser
echo   -h, --help           Show this help message
echo.
echo Examples:
echo   %0                   # Start on default port 3000
echo   %0 -p 8080          # Start on port 8080
echo   %0 --no-browser     # Start without opening browser
exit /b 0

:main
echo Checking for Python 3...

REM Check for Python 3
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Python, starting server...
    python start-server.py %*
    goto end
)

REM Check for py launcher (Python 3)
py -3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Python 3 via py launcher, starting server...
    py -3 start-server.py %*
    goto end
)

REM Check for Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Node.js, starting server...
    node start-server.js %*
    goto end
)

echo ❌ Error: Neither Python 3 nor Node.js found.
echo Please install Python 3 or Node.js to run the server.
echo.
echo Installation instructions:
echo - Python 3: https://www.python.org/downloads/
echo - Node.js: https://nodejs.org/en/download/
pause
exit /b 1

:end