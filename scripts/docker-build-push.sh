#!/bin/bash

# ==============================================================================
# Docker Build, Package, Tag, and Push Script for Mermaid Slides
# ==============================================================================
#
# PURPOSE:
#   Automates the Docker release process for the mermaid-slides project:
#   1. Builds offline package: Creates self-contained distribution
#   2. Docker image: Builds, tags (version & latest), and pushes to Docker Hub
#   3. Git tagging: Creates and pushes a version tag to the remote Git repository
#
# PREREQUISITES:
# - `bash`, `grep`, `cut`, `rm`, `node`, `npm` must be available
# - `docker` must be installed, running, and logged into Docker Hub (`docker login`)
# - `git` must be installed and configured with push access to the remote repository
# - A `package.json` file must exist with a "version" field
# - The script should be run from the root directory of the repository
# - Node.js project must be buildable with `npm run build`
#
# USAGE:
# 1. Ensure all prerequisites are met (Docker login, git access, etc.)
# 2. Make the script executable: `chmod +x docker-build-push.sh`
# 3. Run the script: `./docker-build-push.sh`
#
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# --- Configuration ---
# Your Docker Hub username / organization
DOCKER_HUB_USER="kunalpathak13"
# Base name for the Docker image (without user/org prefix)
IMAGE_BASE_NAME="mermaid-slides"
# Full Docker image name
IMAGE_NAME="${DOCKER_HUB_USER}/${IMAGE_BASE_NAME}"
# Git remote name to push tags to
GIT_REMOTE_NAME="origin"

echo "=================================================="
echo "🧜‍♀️ Starting Mermaid Slides Docker Release Process..."
echo "=================================================="

# --- 1. Get Version from package.json ---
echo "🔍 Extracting version from package.json..."
VERSION=$(grep '"version"' package.json | cut -d '"' -f 4)

# Check if VERSION was successfully extracted
if [ -z "$VERSION" ]; then
  echo "❌ Error: Could not automatically determine version from package.json." >&2
  echo "   Ensure the file exists and contains a line like '\"version\": \"1.0.0\"'" >&2
  exit 1
fi

echo "✅ Version found: ${VERSION}"
echo "--------------------------------------------------"

# --- 2. Check Node.js and npm availability ---
echo "🟢 Checking Node.js and npm availability..."
node --version || { echo "❌ Error: Node.js not found. Please install Node.js." >&2; exit 1; }
npm --version || { echo "❌ Error: npm not found. Please install npm." >&2; exit 1; }
echo "✅ Node.js and npm are available."
echo "--------------------------------------------------"

# --- 3. Install Dependencies ---
echo "📦 Installing Node.js dependencies..."
npm install
echo "✅ Dependencies installed."
echo "--------------------------------------------------"

# --- 4. Build the Project ---
echo "🔨 Building the project..."
npm run build
echo "✅ Project build complete."
echo "--------------------------------------------------"

# --- 5. Create Offline Package ---
echo "📦 Creating offline package..."
# Remove existing offline package
rm -rf offline-package
# Create offline package directory
mkdir -p offline-package
# Copy build output
cp -r dist/* offline-package/

# Create server scripts in offline package
echo "📝 Creating server scripts..."

# Python server script
cat > offline-package/start-server.py << 'EOF'
#!/usr/bin/env python3
"""
Simple HTTP server for Mermaid Slides offline package.
Works with Python 3.x
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 3000
HOST = '0.0.0.0'  # Bind to all interfaces for Docker compatibility

def find_available_port(start_port=3000):
    """Find an available port starting from the given port."""
    import socket
    port = start_port
    while port < start_port + 100:  # Try up to 100 ports
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((HOST, port))
                return port
        except OSError:
            port += 1
    return None

def main():
    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)

    print("🧜‍♀️ Mermaid Slides - Offline Server")
    print("=" * 40)

    # Find available port
    port = find_available_port(PORT)
    if port is None:
        print(f"❌ Error: Could not find an available port starting from {PORT}")
        sys.exit(1)

    # Set up the server
    handler = http.server.SimpleHTTPRequestHandler

    try:
        with socketserver.TCPServer((HOST, port), handler) as httpd:
            url = f"http://{HOST}:{port}"
            print(f"✅ Server running at: {url}")
            print(f"📁 Serving files from: {script_dir}")
            print("\n🚀 Opening in your default browser...")
            print("💡 Press Ctrl+C to stop the server\n")

            # Open browser
            webbrowser.open(url)

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for using Mermaid Slides!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
EOF

# Node.js server script
cat > offline-package/start-server.js << 'EOF'
#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const HOST = '0.0.0.0';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('File not found');
        return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server error');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen(PORT, HOST, () => {
    const url = `http://localhost:${PORT}`;
    console.log('🧜‍♀️ Mermaid Slides - Offline Server');
    console.log('=' .repeat(40));
    console.log(`✅ Server running at: ${url}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('\n🚀 Opening in your default browser...');
    console.log('💡 Press Ctrl+C to stop the server\n');

    // Open browser
    const start = process.platform === 'darwin' ? 'open' :
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} ${url}`);
});
EOF

# Shell script for Unix systems
cat > offline-package/start-server.sh << 'EOF'
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
EOF

# Windows batch script
cat > offline-package/start-server.bat << 'EOF'
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
EOF

# README for offline package
cat > offline-package/README.md << 'EOF'
# Mermaid Slides - Offline Package

This is a self-contained offline version of Mermaid Slides that runs locally without internet access.

## Quick Start

### Windows
Double-click `start-server.bat`

### macOS/Linux
```bash
chmod +x start-server.sh
./start-server.sh
```

### Manual Start
```bash
# With Python 3
python3 start-server.py

# With Node.js
node start-server.js
```

## Requirements
- Python 3.x OR Node.js
- Modern web browser

## Features
- Complete offline functionality
- No external dependencies
- Cross-platform compatibility
- Automatic browser opening

The server will start at http://localhost:3000
EOF

# Make scripts executable
chmod +x offline-package/start-server.py
chmod +x offline-package/start-server.js
chmod +x offline-package/start-server.sh

# Copy examples if they exist in public directory
if [ -d "public/examples" ]; then
    cp -r public/examples offline-package/
fi

echo "✅ Offline package created with embedded server scripts."
echo "--------------------------------------------------"

# --- 6. Build Docker Image ---
echo "🐳 Building Docker image: ${IMAGE_NAME}:${VERSION}..."
docker build -t "${IMAGE_NAME}:${VERSION}" .
echo "✅ Docker build complete."
echo "--------------------------------------------------"

# --- 7. Tag Docker Image ---
echo "🏷️ Tagging ${IMAGE_NAME}:${VERSION} as ${IMAGE_NAME}:latest..."
docker tag "${IMAGE_NAME}:${VERSION}" "${IMAGE_NAME}:latest"
echo "✅ Docker tagging complete."
echo "--------------------------------------------------"

# --- 8. Push Docker Image to Docker Hub ---
echo "☁️ Pushing Docker tag: ${IMAGE_NAME}:${VERSION}..."
echo "   (Ensure you are logged into Docker Hub: 'docker login')"
docker push "${IMAGE_NAME}:${VERSION}"
echo "✅ Version tag push complete."
echo "--------------------------------------------------"

echo "☁️ Pushing Docker tag: ${IMAGE_NAME}:latest..."
docker push "${IMAGE_NAME}:latest"
echo "✅ Latest tag push complete."
echo "--------------------------------------------------"

# --- 9. Create Git Tag ---
GIT_TAG="v${VERSION}"
echo "🏷️ Creating Git tag: ${GIT_TAG}..."
# Check if tag already exists locally
if git rev-parse "${GIT_TAG}" >/dev/null 2>&1; then
  echo "⚠️ Warning: Git tag ${GIT_TAG} already exists locally. Skipping creation."
else
  git tag "${GIT_TAG}"
  echo "✅ Git tag ${GIT_TAG} created locally."
fi
echo "--------------------------------------------------"

# --- 10. Push Git Tag ---
echo "☁️ Pushing Git tag ${GIT_TAG} to remote '${GIT_REMOTE_NAME}'..."
echo "   (Ensure you have push access to the remote repository)"
# Check if tag already exists remotely before pushing
if git ls-remote --tags "${GIT_REMOTE_NAME}" | grep -q "refs/tags/${GIT_TAG}"; then
    echo "⚠️ Warning: Git tag ${GIT_TAG} already exists on the remote '${GIT_REMOTE_NAME}'. Skipping push."
else
    git push "${GIT_REMOTE_NAME}" "${GIT_TAG}"
    echo "✅ Git tag ${GIT_TAG} pushed to ${GIT_REMOTE_NAME}."
fi
echo "--------------------------------------------------"

echo "=================================================="
echo "✅✅✅ Mermaid Slides Docker Release Complete! ✅✅✅"
echo "=================================================="
echo "Summary:"
echo "  - Project Version: ${VERSION}"
echo "  - Docker Image: ${IMAGE_NAME}"
echo "    - Built image tagged: ${VERSION}, latest"
echo "    - Pushed tags to Docker Hub: ${VERSION}, latest"
echo "  - Git Tag: ${GIT_TAG}"
echo "    - Created/verified tag: ${GIT_TAG}"
echo "    - Pushed/verified tag to remote '${GIT_REMOTE_NAME}'"
echo "--------------------------------------------------"
echo "Consumers can now:"
echo "  - Run with Docker: docker run -p 3000:3000 ${IMAGE_NAME}"
echo "  - Pull latest: docker pull ${IMAGE_NAME}"
echo "  - Pull specific version: docker pull ${IMAGE_NAME}:${VERSION}"
echo "  - Access at: http://localhost:3000"
echo "=================================================="
