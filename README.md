# Mermaid Slides

Transform your markdown content with mermaid diagrams and images into beautiful presentation slides with advanced navigation and theming.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-blue?style=for-the-badge)](https://kanad13.github.io/mermaid-slides/)
[![Documentation](https://img.shields.io/badge/📖_Documentation-green?style=for-the-badge)](docs/)

![Mermaid Slides Demo](docs/assets/mermai-slides-demo.gif)

## 🚀 Quick Start

### 🌐 **Online (Recommended)**
Visit **[Mermaid Slides](https://kanad13.github.io/mermaid-slides/)** and start creating presentations immediately.

### 💾 **Offline Package (New!)**
Download the complete offline package for local use without internet dependency:
```bash
# Download from GitHub Releases (coming soon)
# Or build from source:
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides
npm install && npm run build
cd offline-package
# Choose your preferred server:
python3 start-server.py  # Python option
node start-server.js     # Node.js option
./start-server.sh        # Auto-detect (macOS/Linux)
start-server.bat         # Auto-detect (Windows)
```

### 🛠️ **Local Development**
```bash
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides
npm install
npm run dev
```

## ✨ Key Features

- **📁 File Handling** - Drag & drop, file browser, or paste markdown content
- **🖼️ Mixed Content** - Mermaid diagrams + images in unified presentations  
- **🎨 Theming** - 5 Mermaid themes + dark/light UI modes
- **🧭 Navigation** - Keyboard controls, progress bar, grid view, thumbnails
- **🎯 Presentation Mode** - Full-screen, distraction-free experience
- **📱 Responsive** - Works on desktop, tablet, and mobile devices
- **💾 Offline Ready** - Complete offline package with zero internet dependency
- **🌐 Multi-Platform** - Web, offline package, VS Code extension (coming soon)

## 📚 Documentation

- **[Complete Documentation](docs/)** - Full guides and feature details
- **[Features Overview](docs/FEATURES.md)** - Comprehensive feature list
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