# Mermaid Slides

Turn Markdown files with Mermaid diagrams and images into a presentation-ready deck in seconds. Mermaid Slides keeps the source plain-text, renders everything locally, and lets you present the result in the browser, offline, or from Docker — ideal for architecture reviews, demos, and docs walkthroughs.

Built and maintained by [Kunal Pathak](https://www.kunal-pathak.com).

[![Live Demo](https://img.shields.io/badge/Live_Demo-blue?style=for-the-badge)](https://mermaid-slides.com/)
[![Docker Image](https://img.shields.io/badge/Docker_Image-blue?style=for-the-badge)](https://hub.docker.com/r/kunalpathak13/mermaid-slides)
[![Mermaid Slideshow VS Code](https://img.shields.io/badge/VS_Code-Mermaid_Slideshow-purple?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=KunalPathak.mermaid-slideshow)
[![Markdown Presentation Tool](https://img.shields.io/badge/VS_Code-Markdown_Presentation_Tool-7c3aed?style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=KunalPathak.markdown-presentation-tool)
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

The image holds static files and a small Python server. Nothing writes to disk and nothing calls out,
so you can lock it down further:

```bash
docker run -p 3000:3000 --read-only --cap-drop=ALL kunalpathak13/mermaid-slides:latest
```

- **Container Ready**: Multi-platform support (AMD64, ARM64)
- **Runs Unprivileged**: Serves as a non-root user, with a digest-pinned base image
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

Requires **Node 20.19+** or **22.12+** for local development and production builds (matches Vite 7 requirements).

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
- **Settings Panel** - Toggle title display and auto-hide behavior during a session
- **Presentation Mode** - Full-screen, distraction-free experience
- **Responsive** - Works on desktop, tablet, and mobile devices

### **Privacy & Security**

- **Zero Tracking** - No analytics, telemetry, or data collection, and nothing stored in the browser
- **Offline First** - Complete functionality without internet dependency
- **Local Processing** - All parsing and diagram rendering happens on your device
- **Self-Contained** - All distributions bundle dependencies locally
- **Content-Security-Policy** - Enforced in every distribution; see [Privacy & Security](#privacy--security)
- **Privacy Modals** - Built-in privacy policy and legal notice information

### **Multi-Platform Availability**

- **Web App** - Instant access via GitHub Pages
- **Offline Package** - Download and run locally on any OS
- **Docker Container** - Containerized deployment for any environment

## Related VS Code Tools

If you prefer editor-native presentations, these companion tools are already live in the VS Code Marketplace:

### **Mermaid Slideshow**

- **Marketplace**: [KunalPathak.mermaid-slideshow](https://marketplace.visualstudio.com/items?itemName=KunalPathak.mermaid-slideshow)
- **Best for**: Mermaid-only files where each diagram becomes its own focused slide
- **Highlights**: Keyboard navigation, live preview updates, Mermaid theme selection

### **Markdown Presentation Tool**

- **Marketplace**: [KunalPathak.markdown-presentation-tool](https://marketplace.visualstudio.com/items?itemName=KunalPathak.markdown-presentation-tool)
- **Best for**: Full Markdown decks with headings, text, Mermaid diagrams, code blocks, and images
- **Highlights**: `<!-- slide -->` delimiters, theme awareness, style controls, rich mixed-content slides

Both tools are published separately from this repository and complement the web/offline/Docker versions of Mermaid Slides.

## Privacy & Security

Mermaid Slides is designed with privacy as a core principle:

- **No Data Collection** - Zero analytics, tracking, or telemetry. The app stores nothing: no cookies, no local storage, no session storage, no service worker
- **Local Processing** - Your markdown never leaves your device. Parsing and diagram rendering happen entirely in your browser
- **Self-Contained** - No CDN dependencies. Every distribution bundles its own assets, so the app itself never contacts a third party
- **Offline Operation** - Full functionality without an internet connection
- **Simple Local Servers** - The offline package uses lightweight local Python or Node.js servers only
- **Content-Security-Policy** - A strict policy is enforced in every distribution. Scripts may only load from the app's own files, and inline script is refused outright, so a markdown file cannot execute code in the page

### One thing to be aware of

If your markdown references a remote image — `![diagram](https://example.com/chart.png)` — your browser
fetches it, and that request tells the hosting server your IP address and user agent. That is how
images work on the web, and the policy above deliberately permits it: you put the image there on
purpose, and silently refusing to load it would break real documents.

Nothing else in the app reaches the network. If you want a presentation that provably makes no outside
requests, use local image paths or diagrams only.

## Documentation

- **[Deployment Guide](docs/DEPLOYMENT.md)** - Multi-channel deployment, release flow, and channel-specific notes
- **[Contributing Guide](docs/CONTRIBUTING.md)** - Development workflow, testing, and release checklist
- **[Future Work](docs/LATER.md)** - Planned follow-up improvements and rationale
- **[AI Agent Context](AGENTS.md)** - Workspace context and verified commands for coding agents

## Technology

**Frontend**: React 19 + TypeScript | **Build**: Vite 7 | **Styling**: Tailwind CSS 3.4
**Diagrams**: Mermaid.js 11 | **Testing**: Vitest + React Testing Library | **Deployment**: GitHub Pages, offline package, Docker

## Supported Content

**Mermaid Diagrams**: Flowcharts, Sequence, ER, Class, State, Gantt, Pie Charts, Git Graphs
**Images**: PNG, JPEG, GIF, WebP with automatic scaling and responsive display

## Contributing

We welcome contributions! See our [Contributing Guidelines](docs/CONTRIBUTING.md) for development setup and guidelines.

## Maintainer

Mermaid Slides is built and maintained by **[Kunal Pathak](https://www.kunal-pathak.com)** as a
non-commercial open-source project. No advertising, no tracking, no accounts.

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
