# Distribution Guide - Mermaid Slides

**Created**: 2025-07-03  
**Phase**: 3.5 - Quality Assurance & Distribution Strategy  
**Status**: Complete Documentation  

---

## Overview

This guide provides comprehensive instructions for distributing Mermaid Slides across all three supported channels: Web, Offline, and VS Code Extension (planned).

## Channel Summary

| Channel | Status | Target Audience | Distribution Method |
|---------|--------|-----------------|-------------------|
| **Web** | ✅ Live | General users, quick testing | GitHub Pages |
| **Offline** | ✅ Ready | Corporate, air-gapped environments | Download package |
| **VS Code** | 📋 Planned | Developers, markdown users | VS Code Marketplace |

---

## Web Channel Distribution

### Current Status: ✅ LIVE
**URL**: https://kanad13.github.io/mermaid-slides/

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
```

### Offline Channel Features
- **Zero Network Dependencies**: Works completely offline
- **Multiple Server Options**: Python, Node.js, or shell scripts
- **Cross-Platform**: Windows, macOS, Linux
- **Self-Contained**: All assets bundled locally
- **Examples Included**: Sample markdown files provided

### Target Users
- Corporate environments with restricted internet
- Air-gapped security environments
- Remote locations with poor connectivity
- Educational institutions with network restrictions
- Developers wanting local development environment

---

## VS Code Extension Distribution (Planned)

### Current Status: 📋 PLANNED FOR PHASE 4

### Distribution Process (Planned)
1. **Extension Development**: Create VS Code extension project
2. **Marketplace Submission**: Publish to VS Code Marketplace
3. **Installation Method**: Standard VS Code extension installation

### Planned Features
- **Right-click Preview**: Context menu for `.md` files
- **Command Palette**: "Preview Mermaid Slides" command
- **Auto-detection**: Automatic mermaid diagram recognition
- **Live Updates**: Real-time preview as files change

### Target Users
- Developers working with markdown documentation
- Technical writers using VS Code
- Teams documenting system architectures
- Open source project maintainers

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
- [ ] Documentation includes port information
- [ ] No external URL dependencies
- [ ] Cross-platform server testing complete

#### VS Code Extension Specific (When Ready)
- [ ] Extension manifest valid
- [ ] Webview integration working
- [ ] Commands properly registered
- [ ] Marketplace guidelines followed

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
5. **Distribution**: Deploy web, package offline, prepare extension

### Version Display
Each channel displays version information:
- **Web**: Footer or about section
- **Offline**: Server startup message and HTML meta tags
- **VS Code**: Extension manifest and status bar

---

## Distribution Metrics

### Success Metrics
- **Web Channel**: Page views, user engagement, session duration
- **Offline Channel**: Download count, setup completion rate
- **VS Code Extension**: Install count, usage metrics, ratings

### Quality Metrics
- **Functionality**: Core features work across all channels
- **Performance**: Load times under 30 seconds
- **Reliability**: >99% uptime for web, <5% setup failure rate for offline
- **Documentation**: Complete setup guides with troubleshooting

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

#### VS Code Extension (When Available)
- **Installation Issues**: Check VS Code version compatibility
- **Preview Not Working**: Verify mermaid diagram syntax, check extension activation
- **Performance Issues**: Large files may need processing time

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

---

**Distribution Status**: Web and Offline channels ready for production use  
**Next Phase**: VS Code Extension development and distribution  
**Quality Assurance**: All compatibility tests passing ✅  