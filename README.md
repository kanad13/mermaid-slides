# Mermaid Slides

Transform your markdown content with mermaid diagrams and images into beautiful presentation slides with advanced navigation and theming.

[![Live Demo](https://img.shields.io/badge/Live_Demo-blue?style=for-the-badge)](https://mermaid-slides.com/)
[![Docker Image](https://img.shields.io/badge/Docker_Image-blue?style=for-the-badge)](https://hub.docker.com/r/kunalpathak13/mermaid-slides)
[![VS Code Extension](https://img.shields.io/badge/VS_Code_Extension-purple?style=for-the-badge)](#-vs-code-extension-planned)
[![Documentation](https://img.shields.io/badge/Documentation-green?style=for-the-badge)](docs/)
[![Privacy First](https://img.shields.io/badge/Privacy_First-orange?style=for-the-badge)](#-privacy--security)

![Mermaid Slides Demo](docs/assets/mermai-slides-demo.gif)

## Quick Start

### **Online (Recommended)**

Visit **[Mermaid Slides](https://mermaid-slides.com/)** and start creating presentations immediately.

### **Docker Container**

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

### **Offline Package**

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

# Open browser to http://localhost:3000
```

### **Local Development**

```bash
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides
npm install
npm run dev
```

## Thanks Mermaid.js Team!

> **Important Notice:** This is an independent, community-driven project and is **not an official product** of the Mermaid.js team. Mermaid Slides (this project) is built with deep gratitude to the Mermaid.js creators and uses their library under the MIT License. All credit for the core diagramming functionality goes to the [Mermaid.js project](https://github.com/mermaid-js/mermaid).

## Key Features

### **Presentation & Navigation**

- **File Handling** - Drag & drop, file browser, or paste markdown content
- **Mixed Content** - Mermaid diagrams + images in unified presentations
- **Title Extraction** - Automatically extracts markdown headers as slide titles with user toggle
- **Navigation** - Keyboard controls, progress bar, grid view, thumbnails
- **Settings Panel** - Customize title display, auto-hide behavior, and user preferences
- **Presentation Mode** - Full-screen, distraction-free experience
- **Responsive** - Works on desktop, tablet, and mobile devices

### **Privacy & Security**

- **Zero Tracking** - No analytics, telemetry, or data collection
- **Offline First** - Complete functionality without internet dependency
- **Local Processing** - All diagram rendering happens on your device
- **Self-Contained** - All distributions bundle dependencies locally
- **Privacy Modals** - Built-in privacy policy and legal notice information

### **Multi-Platform Availability**

- **Web App** - Instant access via GitHub Pages
- **Offline Package** - Download and run locally on any OS
- **Docker Container** - Containerized deployment for any environment
- **VS Code Extension** - Planned for integrated markdown workflow

## VS Code Extension (Planned)

### **Planned Features**

- **Tab Integration** - Preview button will appear automatically on markdown file tabs
- **One-Click Preview** - Transform any markdown file with mermaid diagrams into presentations
- **Auto-Detection** - Automatically identify mermaid diagrams in your files
- **Privacy-First** - Zero internet communication, all processing happens locally

### **Planned Usage**

1. Open any markdown file containing mermaid diagrams
2. Click the "Preview Mermaid Slides" button in the tab bar
3. Side preview opens with all diagrams ready for presentation
4. Use arrow keys or controls to navigate through slides

### **Future Installation**

```bash
# Will be available on VS Code Marketplace
# Search for "Mermaid Slides" in VS Code Extensions

# Also available as VSIX download from GitHub Releases
# Install via: Extensions ... Install from VSIX
```

**Status**: Currently planned for future development. Follow the repository for updates!

## Privacy & Security

Mermaid Slides is designed with privacy as a core principle:

- **No Data Collection** - Zero analytics, tracking, or telemetry
- **Offline Operation** - Full functionality without internet connection
- **Local Processing** - All diagram rendering happens on your device
- **Self-Contained** - No external CDN dependencies in any distribution
- **Minimal Permissions** - Planned VS Code extension will only read active editor content
- **No External Requests** - All distributions make zero network calls during operation

## Documentation

### **Architecture & Development**

- **[Architecture Strategy](docs/ARCHITECTURE_STRATEGY.md)** - Multi-channel architecture and development strategy
- **[Distribution Guide](docs/DISTRIBUTION.md)** - Complete distribution process for all channels
- **[Contributing Guide](docs/CONTRIBUTING.md)** - Development setup and contribution guidelines

### **User Guides & Documentation**

- **[Complete Documentation](docs/)** - Full guides and feature details
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Multi-channel deployment and distribution
- **[Contributing Guide](docs/CONTRIBUTING.md)** - Development workflow and contribution guidelines
- **[AI Agent Context](AGENTS.md)** - Context file for AI coding assistants

## Technology

**Frontend**: React 19 + TypeScript | **Build**: Vite 7.0 | **Styling**: Tailwind CSS 3.4
**Diagrams**: Mermaid.js 11.7 | **Testing**: Vitest + React Testing Library | **Deployment**: GitHub Pages

## Supported Content

**Mermaid Diagrams**: Flowcharts, Sequence, ER, Class, State, Gantt, Pie Charts, Git Graphs
**Images**: PNG, JPEG, GIF, WebP with automatic scaling and responsive display

## Contributing

We welcome contributions! See our [Contributing Guidelines](docs/CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

Mermaid Slides is built with and redistributes the following open source projects. I am grateful for their contributions to the community:

- **[Mermaid.js](https://github.com/mermaid-js/mermaid)** (MIT License) — Copyright (c) Knut Sveidqvist
  _The core diagramming engine that makes this project possible_
- **[React](https://github.com/facebook/react)** (MIT License) — Copyright (c) Meta Platforms, Inc.
  _The foundation for our modern, interactive user interface_
- **[Vite](https://github.com/vitejs/vite)** (MIT License) — Copyright (c) Evan You
  _Lightning-fast development and build tooling_
- **[Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)** (MIT License) — Copyright (c) Tailwind Labs, Inc.
  _Utility-first CSS framework for rapid UI development_
- **[TypeScript](https://github.com/microsoft/TypeScript)** (Apache-2.0 License) — Copyright (c) Microsoft Corporation
  _Type safety and developer experience enhancements_

See [package.json](package.json) for a complete list of all dependencies.

**Special thanks to the Mermaid.js team** for creating such a powerful and flexible diagramming library that enables developers to create beautiful diagrams with simple text syntax.

---

**[Try it now](https://mermaid-slides.com/) | [Full Documentation](docs/) | [Report Issues](https://github.com/kanad13/mermaid-slides/issues)**
