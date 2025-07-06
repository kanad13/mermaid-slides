# Distribution Guide - Mermaid Slides

## Overview

This guide provides comprehensive instructions for distributing Mermaid Slides across three channels: Web, Offline, and VS Code Extension. The VS Code Extension is currently planned for future development.

**🚀 NEW: Automated CI/CD Pipeline** - All distribution channels are now automated via GitHub Actions!

## Channel Summary

| Channel | Status | Target Audience | Distribution Method |
|---------|--------|-----------------|-------------------|
| **Web** | ✅ Live | General users, quick testing | GitHub Pages |
| **Offline** | ✅ Ready | Corporate, air-gapped environments | Download package + Docker |
| **VS Code** | 📋 Planned | Developers, VS Code users | VS Code Marketplace |

---

## Web Channel Distribution

### Current Status: ✅ LIVE
**URL**: https://mermaid-slides.com/

### Deployment Process
1. **Automatic Deployment**: Triggered on pushes to `main` branch
2. **Build Pipeline**: Tests → Build → Deploy
3. **Deployment Time**: ~2-3 minutes from push to live

### Manual Deployment (if needed)
```bash
# Build for production
npm run build

# Deploy to GitHub Pages (manual)
# Files in dist/ are automatically deployed by GitHub Actions
```

### Web Channel Features
- **Zero Setup**: Visit URL and start using immediately
- **Mobile Responsive**: Works on tablets and phones
- **Feature Showcase**: Landing page demonstrates capabilities
- **Help System**: Built-in keyboard shortcuts and usage guides

### Target Users
- Casual users exploring the tool
- Quick presentations without installation
- Sharing and collaboration via URL
- Mobile users needing lightweight access

---

## Offline Channel Distribution

### Current Status: ✅ READY FOR DISTRIBUTION
**Package Location**: `offline-package/` directory
**Docker Image**: `kunalpathak13/mermaid-slides` on Docker Hub

### Distribution Package Contents
```
offline-package/
├── index.html              # Main application
├── assets/                 # All bundled assets (47 files)
├── examples/               # Sample markdown files
├── start-server.py         # Python 3 server
├── start-server.js         # Node.js server
├── start-server.sh         # Unix shell script
├── start-server.bat        # Windows batch script
└── README.md              # Setup instructions
```

### Distribution Process

#### 1. Package Preparation
```bash
# Build offline package
npm run build

# Copy assets to offline package
cp -r dist/* offline-package/

# Verify package integrity
node scripts/validate-compatibility.cjs
```

#### 2. Distribution Methods

**Direct Download**
- Archive `offline-package/` as ZIP/TAR
- Distribute via email, file sharing, or internal systems
- Include setup instructions in package

**Corporate Distribution**
- Internal software repositories
- Network file shares
- Intranet download portals
- USB drives for air-gapped environments
- Docker registry/harbor deployments

#### 3. User Setup Process
```bash
# Extract package
unzip mermaid-slides-offline-v1.0.0.zip
cd mermaid-slides-offline

# Start server (multiple options)
./start-server.sh           # Unix/macOS
start-server.bat            # Windows
python3 start-server.py     # Manual Python
node start-server.js        # Manual Node.js

# Open in browser
# http://localhost:3005

# OR use Docker
docker pull kunalpathak13/mermaid-slides:latest
docker run -p 3000:3000 kunalpathak13/mermaid-slides:latest
# Open browser to http://localhost:3000
```

### Offline Channel Features
- **Zero Network Dependencies**: Works completely offline
- **Multiple Server Options**: Python, Node.js, shell scripts, or Docker
- **Cross-Platform**: Windows, macOS, Linux
- **Self-Contained**: All assets bundled locally
- **Examples Included**: Sample markdown files provided
- **Container Ready**: Docker image for easy deployment

### Target Users
- Corporate environments with restricted internet
- Air-gapped security environments
- Remote locations with poor connectivity
- Educational institutions with network restrictions
- Developers wanting local development environment

---

## VS Code Extension Distribution

### Current Status: 📋 PLANNED FOR FUTURE DEVELOPMENT

### Distribution Process (Planned)

#### 1. Extension Development
```bash
# Development commands (planned)
npm run build:extension     # Build extension package
npm run package:extension   # Create .vsix package
npm run publish:extension   # Publish to marketplace
```

#### 2. Distribution Methods (Planned)

**VS Code Marketplace**
- Primary distribution channel
- Automatic updates via VS Code
- Global discovery and installation

**Manual Installation**
- Download .vsix from GitHub Releases
- Install via VS Code: Extensions → Install from VSIX
- Corporate/internal distribution

#### 3. User Installation (Planned)
```bash
# Method 1: VS Code Marketplace
# Search "Mermaid Slides" in VS Code Extensions

# Method 2: Command line
code --install-extension mermaid-slides

# Method 3: Manual VSIX
# Download .vsix and install via VS Code interface
```

### VS Code Extension Features (Planned)
- **Tab Integration**: Preview button on markdown file tabs
- **Auto-Detection**: Identifies mermaid diagrams automatically
- **Webview Preview**: Side-by-side presentation view
- **Privacy-First**: Zero network calls, local processing only

### Target Users (Planned)
- Developers working with markdown documentation
- Technical writers using VS Code
- Teams wanting integrated presentation workflow
- Users preferring editor-based tools

---

## Quality Assurance

### Pre-Distribution Checklist

#### All Channels
- [ ] All tests passing (`npm test`)
- [ ] Build successful (`npm run build`)
- [ ] Linting clean (`npm run lint`)
- [ ] Cross-platform compatibility verified

#### Web Channel Specific
- [ ] GitHub Pages deployment successful
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Help documentation up-to-date

#### Offline Channel Specific
- [ ] Package integrity validated (`node scripts/validate-compatibility.cjs`)
- [ ] All server scripts functional
- [ ] Docker image builds and runs correctly
- [ ] Documentation includes port information
- [ ] No external URL dependencies
- [ ] Cross-platform server testing complete

#### VS Code Extension Specific (Planned)
- [ ] Extension packages without errors
- [ ] Webview integration functional
- [ ] VS Code marketplace guidelines met
- [ ] Auto-detection works correctly


### Testing Procedures

#### Web Channel Testing
```bash
# Automated testing
npm test
npm run build

# Manual testing
# 1. Visit live URL
# 2. Test file upload workflow
# 3. Verify navigation and theming
# 4. Check mobile responsiveness
# 5. Validate help system
```

#### Offline Channel Testing
```bash
# Automated validation
node scripts/validate-compatibility.cjs

# Manual testing across platforms
# 1. Test on Windows, macOS, Linux
# 2. Verify all server options work
# 3. Confirm complete offline functionality
# 4. Validate setup documentation
# 5. Test in isolated network environment
# 6. Verify Docker image functionality
```

#### VS Code Extension Testing (Planned)
```bash
# Development testing (planned)
npm run test:extension

# Manual testing steps
# 1. Install extension in VS Code
# 2. Open markdown file with mermaid diagrams
# 3. Verify preview button appears
# 4. Test presentation functionality
```

---

## Version Management

### Versioning Strategy
- **Format**: Semantic Versioning (MAJOR.MINOR.PATCH)
- **Source**: `package.json` version field
- **Synchronization**: All channels use same core version

### Release Process
1. **Version Update**: Update `package.json` version
2. **Build All Channels**: Web and offline builds
3. **Quality Assurance**: Run all validation scripts
4. **Git Tagging**: Tag release with version number
5. **Distribution**: Deploy web, package offline

### Version Display
Each channel displays version information:
- **Web**: Footer or about section
- **Offline**: Server startup message and HTML meta tags
- **VS Code Extension**: Extension manifest and about page

---

## Troubleshooting

### Common Issues

#### Web Channel
- **Slow Loading**: Check network connection, try browser refresh
- **Mobile Issues**: Ensure modern browser, check viewport settings
- **Feature Not Working**: Verify JavaScript enabled, check console

#### Offline Channel
- **Server Won't Start**: Check Python/Node.js installation, verify port 3005 availability
- **Assets Not Loading**: Ensure relative paths, check server directory
- **Cross-Platform Issues**: Use appropriate server script for platform

#### VS Code Extension (Planned)
- **Installation Issues**: Check VS Code version compatibility (1.60+)
- **Preview Not Working**: Verify mermaid diagram syntax, check extension activation
- **Performance Issues**: Large files may need processing time
- **Webview Issues**: Check VS Code developer tools, verify local assets

### Support Resources
- **Documentation**: Complete guides for each distribution channel
- **Examples**: Sample markdown files included with each channel
- **Validation Scripts**: Automated testing tools for quality assurance

---

## Security Considerations

### Web Channel Security
- **HTTPS**: Automatic via GitHub Pages
- **Content Security**: No external scripts or resources
- **User Data**: No data collection or storage

### Offline Channel Security
- **Network Isolation**: Works completely offline
- **Local Server**: Bound to localhost only (127.0.0.1)
- **File Access**: Limited to package directory only

### VS Code Extension Security (Planned)
- **Sandbox**: Webview operates in secure context
- **Permissions**: Minimal required permissions only
- **File Access**: Limited to workspace files only
- **Network Isolation**: Zero external network requests

---

**Distribution Status**: Web and Offline channels ready for production use
**Next Phase**: VS Code Extension development and distribution (planned)
**Quality Assurance**: All compatibility tests passing ✅
