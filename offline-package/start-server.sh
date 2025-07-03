#!/bin/bash

# Unix/Linux/macOS shell script to start Mermaid Slides offline server

echo "🧜‍♀️ Mermaid Slides - Offline Server"
echo "========================================"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found, starting Python server..."
    python3 start-server.py
    exit 0
fi

# Check if Python is available (might be Python 3 on some systems)
if command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version 2>&1)
    if [[ $PYTHON_VERSION == *"Python 3"* ]]; then
        echo "✅ Python 3 found, starting Python server..."
        python start-server.py
        exit 0
    fi
fi

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found, starting Node.js server..."
    node start-server.js
    exit 0
fi

# If neither Python 3 nor Node.js is available
echo "❌ Error: Neither Python 3 nor Node.js is installed."
echo ""
echo "Please install one of the following:"
echo "- Python 3.x: https://python.org/downloads/"
echo "- Node.js: https://nodejs.org/download/"
echo ""
echo "Then run this script again."
echo ""

# On macOS, suggest Homebrew
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "💡 On macOS, you can install using Homebrew:"
    echo "   brew install python3"
    echo "   # or"
    echo "   brew install node"
fi

# On Linux, suggest package manager
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "💡 On Linux, you can install using your package manager:"
    echo "   sudo apt install python3    # Ubuntu/Debian"
    echo "   sudo yum install python3    # CentOS/RHEL"
    echo "   # or"
    echo "   sudo apt install nodejs     # Ubuntu/Debian"
    echo "   sudo yum install nodejs     # CentOS/RHEL"
fi

exit 1