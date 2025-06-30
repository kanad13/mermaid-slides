# Mermaid Slides

Transform your markdown mermaid diagrams into beautiful presentation slides with advanced navigation and theming.

![Mermaid Slides Demo](docs/demo-screenshot.png)

## ✨ Features

### 📁 **File Handling**

- **Drag & Drop Support** - Simply drag markdown files onto the interface
- **File Browser** - Traditional file picker for .md and .txt files
- **Copy & Paste** - Direct markdown content input
- **Sample Content** - Built-in examples to get started quickly

### 🎨 **Theming & Customization**

- **Dark/Light Mode** - Toggle between UI themes for comfortable viewing
- **5 Mermaid Themes** - Default, Dark, Forest, Base, and Neutral diagram styles
- **Live Theme Switching** - See changes instantly in presentation mode
- **Responsive Design** - Works on desktop, tablet, and mobile devices

### 🧭 **Advanced Navigation**

- **Keyboard Controls** - Arrow keys, Home/End for seamless navigation
- **Visual Progress Bar** - See your progress through the presentation
- **Thumbnail Strip** - Quick overview and jumping to specific diagrams
- **Grid View** - See all diagrams at once with overview mode
- **Smart Scaling** - Automatic diagram sizing for optimal viewing

### 🎯 **Presentation Mode**

- **Full-Screen Experience** - Distraction-free presentation interface
- **Multiple View Modes** - Single diagram focus or grid overview
- **Professional Controls** - Clean navigation with progress indicators
- **Theme Controls** - Adjust appearance during presentations

## 🚀 Quick Start

### Option 1: Use Online (Recommended)

Visit **[Mermaid Slides](https://your-deployment-url.com)** and start creating presentations immediately.

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/mermaid-slides.git
cd mermaid-slides

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser (Vite default port)
```

### Option 3: Production Build

```bash
# Build for production
npm run build

# Serve the built files (choose one)
npx serve dist
# or
python -m http.server 8000 -d dist

# Open http://localhost:3000 (serve) or http://localhost:8000 (python)
```

## 📖 Usage

1. **Load Your Content**

   - Drag a markdown file with mermaid diagrams onto the drop zone, or
   - Click "Choose File" to browse for files, or
   - Paste markdown content directly into the text area

2. **Parse Diagrams**

   - Click "Parse Diagrams" to extract all mermaid code blocks
   - The tool will find and prepare all diagrams for presentation

3. **Enter Presentation Mode**

   - Click "View Diagrams" to start your presentation
   - Use the navigation controls or keyboard shortcuts

4. **Navigate Your Presentation**
   - **← →** Arrow keys to move between diagrams
   - **Home/End** to jump to first/last diagram
   - **Click thumbnails** for quick navigation
   - **Grid view button** (⊞) to see all diagrams at once
   - **ESC** to return to the editor

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS 3.x
- **Diagram Rendering**: Mermaid.js 10.6.1
- **Icons**: Lucide React
- **Build**: No build process (single HTML file)
- **Deployment**: Static hosting compatible

## 📋 Supported Mermaid Diagrams

Mermaid Slides supports all standard Mermaid diagram types:

- **Flowcharts** - Decision trees and process flows
- **Sequence Diagrams** - Interaction timelines
- **ER Diagrams** - Database relationships
- **Class Diagrams** - Object-oriented structures
- **State Diagrams** - System state transitions
- **Gantt Charts** - Project timelines
- **Pie Charts** - Data visualization
- **Git Graphs** - Version control workflows

## 🎯 Use Cases

### 📚 **Documentation Presentations**

- Transform existing markdown documentation into slide presentations
- Present technical architectures and system designs
- Share database schemas and API workflows

### 🏢 **Business & Technical Meetings**

- Present process flows and decision trees
- Demonstrate system architectures to stakeholders
- Review database designs and relationships

### 🎓 **Education & Training**

- Create interactive learning materials
- Teach system design concepts
- Explain complex workflows step-by-step

### 💼 **Professional Development**

- Portfolio presentations with technical diagrams
- Code review sessions with visual aids
- Architecture decision records (ADRs) presentations

## 🌟 Why Mermaid Slides?

### **vs PowerPoint/Google Slides**

- ✅ **Version Control Friendly** - Markdown source can be tracked in Git
- ✅ **Programmatic** - Diagrams defined in code, not drawn manually
- ✅ **Consistent Styling** - Automatic theme application across all diagrams
- ✅ **Fast Updates** - Change code, not complex visual elements

### **vs Mermaid Live Editor**

- ✅ **Presentation Mode** - Full-screen, distraction-free experience
- ✅ **Multi-Diagram** - Handle dozens of diagrams in sequence
- ✅ **Advanced Navigation** - Thumbnails, grid view, progress tracking
- ✅ **File Handling** - Direct markdown file support

### **vs Static Site Generators**

- ✅ **Zero Setup** - No build process or deployment complexity
- ✅ **Interactive** - Real-time theme switching and navigation
- ✅ **Portable** - Single file that works anywhere
- ✅ **Offline Capable** - No internet required for offline version

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/mermaid-slides.git
cd mermaid-slides

# No build process needed - just open index.html
# For development with live reload:
npx serve . --live-reload
```

### Reporting Issues

- 🐛 **Bug Reports**: Use the issue template with reproduction steps
- 💡 **Feature Requests**: Describe your use case and proposed solution
- 📖 **Documentation**: Help improve our guides and examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Mermaid.js](https://mermaid.js.org/)** - Powerful diagramming and charting library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful, customizable icons
- **[React](https://react.dev/)** - User interface library

## 📞 Support

- 📖 **Documentation**: Check our [docs](docs) folder
- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Report bugs via GitHub Issues
- ✉️ **Contact**: [your-email@example.com]

---

**Made with ❤️ for the developer community**

_Transform your markdown diagrams into presentations that wow your audience._
