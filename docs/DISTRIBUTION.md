# 🚀 Distribution Guide - Mermaid Slides

**Last Updated**: 2025-07-09  
**Version**: 1.2.0  
**Status**: Multi-Channel Production Ready

Transform your markdown mermaid diagrams into beautiful presentation slides through **3 flexible distribution channels**.

---

## 🎯 Choose Your Distribution Channel

### 🌐 Web Application
**Best for**: Quick testing, mobile use, instant access

- **URL**: https://mermaid-slides.com/
- **Features**: Zero installation, mobile responsive, always up-to-date
- **Requirements**: Modern web browser, internet connection
- **Deployment**: Automated via GitHub Actions to GitHub Pages

**Perfect for**: Casual users, quick presentations, sharing via URL

### 💾 Offline Package
**Best for**: Corporate environments, air-gapped systems, privacy-focused use

- **Download**: [Latest Release](https://github.com/kanad13/mermaid-slides/releases/latest)
- **Features**: Complete offline functionality, cross-platform servers
- **Requirements**: Python 3.x OR Node.js
- **Deployment**: Downloadable ZIP package with multiple server options

**Perfect for**: Corporate networks, restricted environments, local development

### 🐳 Docker Container
**Best for**: Containerized deployments, infrastructure-as-code

- **Image**: `kunalpathak13/mermaid-slides:latest`
- **Features**: Isolated environment, easy scaling, consistent deployment
- **Requirements**: Docker runtime
- **Deployment**: Automated build and push to Docker Hub

**Perfect for**: DevOps teams, containerized environments, cloud deployments

---

## 🚀 Quick Start Guide

### 🌐 Web Application
1. Visit https://mermaid-slides.com/
2. Upload markdown files or use the built-in editor
3. Start creating presentations immediately

### 💾 Offline Package
1. Download the latest package from [GitHub Releases](https://github.com/kanad13/mermaid-slides/releases/latest)
2. Extract the archive
3. Run the appropriate server:
   - **Windows**: `start-server.bat`
   - **macOS/Linux**: `./start-server.sh`
   - **Manual**: `python3 start-server.py` or `node start-server.js`
4. Open browser to `http://localhost:3000`

### 🐳 Docker Container
```bash
# Pull and run the latest image
docker run -p 3000:3000 kunalpathak13/mermaid-slides:latest

# Access at http://localhost:3000
```

---

## 📊 Feature Comparison

| Feature | Web App | Offline Package | Docker |
|---------|---------|-----------------|---------|
| **Installation** | None | Manual setup | Docker required |
| **Network** | Required | Optional | Optional |
| **Updates** | Automatic | Manual | Manual |
| **Customization** | Limited | Full | Full |
| **Portability** | URL sharing | Archive transfer | Image deployment |
| **Performance** | CDN-optimized | Local-optimized | Container-optimized |

---

## 🔄 Version Synchronization

All distribution channels maintain **unified versioning**:

- **Current Version**: 1.2.0
- **Release Strategy**: All channels updated simultaneously
- **Versioning**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Automation**: GitHub Actions handles all deployments

### Version Display
- **Web**: Visible in application footer
- **Offline**: Shown in server startup message
- **Docker**: Tagged with version number

---

## 🔒 Security & Privacy

### 🌐 Web Application
- ✅ HTTPS encryption via GitHub Pages
- ✅ No external dependencies (self-contained)
- ✅ Zero data collection or tracking
- ✅ Client-side processing only

### 💾 Offline Package
- ✅ Complete network isolation
- ✅ Local-only processing
- ✅ No external API calls
- ✅ Air-gapped environment support

### 🐳 Docker Container
- ✅ Isolated container environment
- ✅ Minimal attack surface
- ✅ Read-only filesystem
- ✅ Non-root user execution

---

## 🆘 Support & Troubleshooting

### 🌐 Web Application Issues
- **Slow loading**: Check network connection
- **Features not working**: Verify JavaScript is enabled
- **Mobile issues**: Use modern browser (Chrome, Safari, Firefox)

### 💾 Offline Package Issues
- **Server won't start**: Check Python/Node.js installation
- **Port conflicts**: Use custom port with `-p` flag
- **Cross-platform issues**: Use appropriate script for your OS

### 🐳 Docker Container Issues
- **Image won't pull**: Check Docker Hub connectivity
- **Container won't start**: Verify port 3000 is available
- **Performance issues**: Check Docker resource allocation

---

## 🔮 Future Channels

### 🔧 VS Code Extension (Planned)
- **Target**: Developers and technical writers
- **Features**: Tab integration, auto-detection, webview preview
- **Distribution**: VS Code Marketplace
- **Status**: In development roadmap

---

# 🛠️ Developer Guide

## Channel-Specific Implementation

### 🌐 Web Channel Deployment

#### Current Status: ✅ LIVE
**URL**: https://mermaid-slides.com/

#### Deployment Process
1. **Automatic Deployment**: Triggered on pushes to `main` branch
2. **Build Pipeline**: Tests → Build → Deploy
3. **Deployment Time**: ~2-3 minutes from push to live

#### Manual Deployment (if needed)
```bash
# Build for production
npm run build

# Files in dist/ are automatically deployed by GitHub Actions
```

#### Target Users
- Casual users exploring the tool
- Quick presentations without installation
- Sharing and collaboration via URL
- Mobile users needing lightweight access

### 💾 Offline Channel Implementation

#### Current Status: ✅ READY FOR DISTRIBUTION
**Package Location**: `offline-package/` directory
**Docker Image**: `kunalpathak13/mermaid-slides` on Docker Hub

#### Distribution Package Contents
```
offline-package/
├── index.html              # Main application
├── assets/                 # All bundled assets
├── examples/               # Sample markdown files
├── start-server.py         # Python 3 server
├── start-server.js         # Node.js server
├── start-server.sh         # Unix shell script
├── start-server.bat        # Windows batch script
└── README.md              # Setup instructions
```

#### Package Preparation
```bash
# Build offline package
npm run build:offline

# Verify package integrity
npm run validate:compatibility
```

#### Distribution Methods

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

#### Target Users
- Corporate environments with restricted internet
- Air-gapped security environments
- Remote locations with poor connectivity
- Educational institutions with network restrictions
- Developers wanting local development environment

### 🐳 Docker Channel Implementation

#### Build and Push Process
```bash
# Automated via GitHub Actions
# Manual process (if needed):
docker build -t kunalpathak13/mermaid-slides:latest .
docker push kunalpathak13/mermaid-slides:latest
```

#### Multi-Platform Support
- **Platforms**: linux/amd64, linux/arm64
- **Base Image**: Lightweight Node.js Alpine
- **Security**: Non-root user, read-only filesystem

---

## 🧪 Quality Assurance

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
- [ ] Package integrity validated (`npm run validate:compatibility`)
- [ ] All server scripts functional
- [ ] Docker image builds and runs correctly
- [ ] Documentation includes port information
- [ ] No external URL dependencies
- [ ] Cross-platform server testing complete

### Testing Procedures

#### Web Channel Testing
```bash
# Automated testing
npm test
npm run build

# Manual testing checklist:
# 1. Visit live URL
# 2. Test file upload workflow
# 3. Verify navigation and theming
# 4. Check mobile responsiveness
# 5. Validate help system
```

#### Offline Channel Testing
```bash
# Automated validation
npm run validate:compatibility

# Manual testing checklist:
# 1. Test on Windows, macOS, Linux
# 2. Verify all server options work
# 3. Confirm complete offline functionality
# 4. Validate setup documentation
# 5. Test in isolated network environment
# 6. Verify Docker image functionality
```

---

## 🔄 Release Process

### Version Management
- **Format**: Semantic Versioning (MAJOR.MINOR.PATCH)
- **Source**: `package.json` version field
- **Synchronization**: All channels use same core version

### Release Workflow
1. **Version Update**: Update `package.json` version
2. **Build All Channels**: Web and offline builds
3. **Quality Assurance**: Run all validation scripts
4. **Git Tagging**: Tag release with version number
5. **Automated Deployment**: GitHub Actions deploys all channels

### Version Display
- **Web**: Footer or about section
- **Offline**: Server startup message and HTML meta tags
- **Docker**: Image tags and container labels

---

## 📞 Getting Help

### Documentation Resources
- **User Guides**: Each channel includes comprehensive setup guides
- **Examples**: Sample markdown files included with each distribution
- **Validation Scripts**: Automated testing tools for quality assurance

### Support Channels
- **Issues**: [GitHub Issues](https://github.com/kanad13/mermaid-slides/issues)
- **Community**: GitHub Discussions for questions and feedback
- **Documentation**: Complete guides for each distribution channel

---

**🎉 All channels are production-ready and actively maintained with synchronized releases.**