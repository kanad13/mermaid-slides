#!/bin/bash

# Show help if requested
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    echo "Mermaid Slides Offline Server"
    echo "Usage: $0 [options]"
    echo "Options:"
    echo "  -p, --port <number>  Port to run the server on (default: 3000)"
    echo "  --no-browser         Do not automatically open browser"
    echo "  -h, --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                   # Start on default port 3000"
    echo "  $0 -p 8080          # Start on port 8080"
    echo "  $0 --no-browser     # Start without opening browser"
    exit 0
fi

echo "🧜‍♀️ Mermaid Slides - Starting Server..."
echo "Checking for Python 3..."

if command -v python3 >/dev/null 2>&1; then
    echo "✅ Found Python 3, starting server..."
    python3 start-server.py "$@"
elif command -v node >/dev/null 2>&1; then
    echo "✅ Found Node.js, starting server..."
    node start-server.js "$@"
else
    echo "❌ Error: Neither Python 3 nor Node.js found."
    echo "Please install Python 3 or Node.js to run the server."
    echo ""
    echo "Installation instructions:"
    echo "- Python 3: https://www.python.org/downloads/"
    echo "- Node.js: https://nodejs.org/en/download/"
    exit 1
fi