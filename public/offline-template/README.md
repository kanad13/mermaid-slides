# 🧜‍♀️ Mermaid Slides - Offline Package

Transform your markdown mermaid diagrams into beautiful presentation slides - completely offline!

## 🚀 Quick Start

### Option 1: Automatic (Recommended)
```bash
# Make executable (macOS/Linux)
chmod +x start-server.sh
./start-server.sh

# Windows
start-server.bat
```

### Option 2: Python Server
```bash
python3 start-server.py

# With custom port
python3 start-server.py -p 8080

# Without opening browser
python3 start-server.py --no-browser
```

### Option 3: Node.js Server
```bash
node start-server.js

# With custom port
node start-server.js -p 8080

# Without opening browser
node start-server.js --no-browser
```

## 📋 Requirements

You need **one** of the following:
- **Python 3.x** (recommended) - [Download](https://www.python.org/downloads/)
- **Node.js** - [Download](https://nodejs.org/en/download/)

## 🎯 Features

- ✅ **Complete offline functionality** - No internet required after download
- ✅ **Cross-platform servers** - Python, Node.js, Shell scripts
- ✅ **Configurable ports** - Use any available port
- ✅ **Auto-browser opening** - Opens automatically in your default browser
- ✅ **Example diagrams** - Ready-to-use examples included

## 📊 Usage

1. **Start the server** using one of the methods above
2. **Open your browser** to http://localhost:3000 (or your custom port)
3. **Upload markdown files** or use the built-in editor
4. **Create beautiful presentations** from your mermaid diagrams

## 🔧 Port Configuration

All servers support custom ports:

```bash
# Python
python3 start-server.py -p 8080

# Node.js
node start-server.js -p 8080

# Shell script (forwards to Python/Node.js)
./start-server.sh -p 8080
```

If the specified port is unavailable, the Python server will automatically find the next available port.

## 🌐 Alternative Access

- **Web Version**: https://kanad13.github.io/mermaid-slides/
- **Docker**: `docker run -p 3000:3000 kunalpathak13/mermaid-slides:latest`

## 🔒 Privacy & Security

- ✅ **Zero external connections** - Everything runs locally
- ✅ **No data collection** - Your diagrams stay on your machine
- ✅ **Open source** - Full transparency

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Try a different port
python3 start-server.py -p 8080
```

### Python/Node.js Not Found
1. Install Python 3: https://www.python.org/downloads/
2. Or install Node.js: https://nodejs.org/en/download/
3. Restart your terminal after installation

### Permission Denied (macOS/Linux)
```bash
chmod +x start-server.sh
chmod +x start-server.py
```

---

**Made with ❤️ for offline presentation creation**