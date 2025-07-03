@echo off
echo 🧜‍♀️ Mermaid Slides - Starting Server...
echo Checking for Python 3...

python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Python, starting server...
    python start-server.py
    goto :end
)

python3 --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Python 3, starting server...
    python3 start-server.py
    goto :end
)

node --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Found Node.js, starting server...
    node start-server.js
    goto :end
)

echo ❌ Error: Neither Python nor Node.js found.
echo Please install Python 3 or Node.js to run the server.
pause

:end
