#!/bin/bash
echo "🧜‍♀️ Mermaid Slides - Starting Server..."
echo "Checking for Python 3..."

if command -v python3 >/dev/null 2>&1; then
    echo "✅ Found Python 3, starting server..."
    python3 start-server.py
elif command -v node >/dev/null 2>&1; then
    echo "✅ Found Node.js, starting server..."
    node start-server.js
else
    echo "❌ Error: Neither Python 3 nor Node.js found."
    echo "Please install Python 3 or Node.js to run the server."
    exit 1
fi
