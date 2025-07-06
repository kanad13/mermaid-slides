# 🧜‍♀️ Mermaid Slides

Transform your markdown content with mermaid diagrams and images into beautiful presentation slides with advanced navigation and theming.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-blue?style=for-the-badge)](https://kanad13.github.io/mermaid-slides/)
[![Docker Image](https://img.shields.io/badge/🐳_Docker_Image-blue?style=for-the-badge)](https://hub.docker.com/r/kunalpathak13/mermaid-slides)
[![VS Code Extension](https://img.shields.io/badge/⚡_VS_Code_Extension-purple?style=for-the-badge)](#-vs-code-extension-planned)
[![Documentation](https://img.shields.io/badge/📖_Documentation-green?style=for-the-badge)](docs/)
[![Privacy First](https://img.shields.io/badge/🔒_Privacy_First-orange?style=for-the-badge)](#-privacy--security)

![Mermaid Slides Demo](docs/assets/mermai-slides-demo.gif)

## 🚀 Quick Start

### 🌐 **Online (Recommended)**
Visit **[Mermaid Slides](https://kanad13.github.io/mermaid-slides/)** and start creating presentations immediately.

### 🐳 **Docker Container**
Run Mermaid Slides in a Docker container for easy deployment:
```bash
# Pull and run the latest version
docker pull kunalpathak13/mermaid-slides:latest
docker run -p 3000:3000 kunalpathak13/mermaid-slides:latest

# Open browser to http://localhost:3000
```
- **Container Ready**: Multi-platform support (AMD64, ARM64)
- **Isolated Environment**: Complete containerized solution
- **Easy Deployment**: Perfect for corporate environments

### 💾 **Offline Package**
Download the complete offline package for local use without internet dependency:
```bash
# Download from GitHub Releases
# Visit: https://github.com/kanad13/mermaid-slides/releases/latest

# Extract and run:
unzip mermaid-slides-offline-v*.zip
cd mermaid-slides-offline

# Choose your preferred server:
python3 start-server.py  # Python option
node start-server.js     # Node.js option
./start-server.sh        # Auto-detect (macOS/Linux)
start-server.bat         # Auto-detect (Windows)

# Open browser to http://localhost:3005
```

### 🛠️ **Local Development**
```bash
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides
npm install
npm run dev
```

## ✨ Key Features

### 🎯 **Presentation & Navigation**
- **📁 File Handling** - Drag & drop, file browser, or paste markdown content
- **🖼️ Mixed Content** - Mermaid diagrams + images in unified presentations  
- **🧭 Navigation** - Keyboard controls, progress bar, grid view, thumbnails
- **🎯 Presentation Mode** - Full-screen, distraction-free experience
- **🎨 Theming** - 5 Mermaid themes + dark/light UI modes
- **📱 Responsive** - Works on desktop, tablet, and mobile devices

### 🔒 **Privacy & Security**
- **🚫 Zero Tracking** - No analytics, telemetry, or data collection
- **🌐 Offline First** - Complete functionality without internet dependency
- **🔐 Local Processing** - All diagram rendering happens on your device
- **📦 Self-Contained** - All distributions bundle dependencies locally

### 🌐 **Multi-Platform Availability**
- **🌐 Web App** - Instant access via GitHub Pages
- **💾 Offline Package** - Download and run locally on any OS
- **🐳 Docker Container** - Containerized deployment for any environment
- **⚡ VS Code Extension** - Planned for integrated markdown workflow

## ⚡ VS Code Extension (Planned)

### **Planned Features**
- **🎯 Tab Integration** - Preview button will appear automatically on markdown file tabs
- **🚀 One-Click Preview** - Transform any markdown file with mermaid diagrams into presentations
- **🔍 Auto-Detection** - Automatically identify mermaid diagrams in your files
- **🎨 Theme Sync** - Adapt to your VS Code theme (light/dark)
- **🔒 Privacy-First** - Zero internet communication, all processing happens locally

### **Planned Usage**
1. Open any markdown file containing mermaid diagrams
2. Click the "🧜‍♀️ Preview Mermaid Slides" button in the tab bar
3. Side preview opens with all diagrams ready for presentation
4. Use arrow keys or controls to navigate through slides

### **Future Installation**
```bash
# Will be available on VS Code Marketplace
# Search for "Mermaid Slides" in VS Code Extensions

# Also available as VSIX download from GitHub Releases
# Install via: Extensions → ... → Install from VSIX
```

**Status**: Currently planned for future development. Follow the repository for updates!

## 🔒 Privacy & Security

Mermaid Slides is designed with privacy as a core principle:

- **🚫 No Data Collection** - Zero analytics, tracking, or telemetry
- **🌐 Offline Operation** - Full functionality without internet connection
- **🔐 Local Processing** - All diagram rendering happens on your device
- **📦 Self-Contained** - No external CDN dependencies in any distribution
- **🔒 Minimal Permissions** - Planned VS Code extension will only read active editor content
- **🚫 No External Requests** - All distributions make zero network calls during operation

## 📚 Documentation

### **🏗️ Architecture & Development**
- **[Architecture Strategy](docs/ARCHITECTURE_STRATEGY.md)** - Multi-channel architecture and development strategy
- **[Distribution Guide](docs/DISTRIBUTION_GUIDE.md)** - Complete distribution process for all channels
- **[Contributing Guide](docs/CONTRIBUTING.md)** - Development setup and contribution guidelines

### **📖 User Guides & Documentation**

- **[Complete Documentation](docs/)** - Full guides and feature details
- **[Features Overview](docs/FEATURES.md)** - Comprehensive feature list
- **[Testing & Deployment](docs/TESTING_AND_DEPLOYMENT.md)** - Testing and deployment guides
- **[VS Code Testing Guide](docs/VSCODE_TESTING_GUIDE.md)** - VS Code extension testing
- **[Development Setup](CLAUDE.md)** - Developer workflow and instructions
- **[Contributing](docs/CONTRIBUTING.md)** - How to contribute to the project

## 🛠️ Technology

**Frontend**: React 19 + TypeScript | **Build**: Vite 7.0 | **Styling**: Tailwind CSS 3.4  
**Diagrams**: Mermaid.js 11.7 | **Testing**: Vitest + React Testing Library | **Deployment**: GitHub Pages

## 📋 Supported Content

**Mermaid Diagrams**: Flowcharts, Sequence, ER, Class, State, Gantt, Pie Charts, Git Graphs  
**Images**: PNG, JPEG, GIF, WebP with automatic scaling and responsive display

## 🤝 Contributing

We welcome contributions! See our [Contributing Guidelines](docs/CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**[🌐 Try it now](https://kanad13.github.io/mermaid-slides/) | [📖 Full Documentation](docs/) | [🐛 Report Issues](https://github.com/kanad13/mermaid-slides/issues)**