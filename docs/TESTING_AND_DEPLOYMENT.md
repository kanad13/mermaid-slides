# 🧪 Testing and Deployment Guide

Comprehensive testing and deployment procedures for the Mermaid Slides project.

---

## 🧪 Testing Infrastructure

### **Testing Framework**
- **Primary Framework**: Vitest (modern Vite-native test runner)
- **Testing Environment**: jsdom for DOM simulation
- **Component Testing**: React Testing Library for React components
- **Test Coverage**: 44+ tests across components, hooks, and utilities

### **Test Structure**
```
src/
├── App.test.tsx                     # Main application tests
├── components/
│   ├── FileUpload/__tests__/
│   │   └── FileUpload.test.tsx      # File upload functionality
│   ├── Settings/__tests__/
│   │   └── SettingsPanel.test.tsx   # Settings panel functionality
│   └── Viewer/ViewerComponents/__tests__/
│       └── KeyboardShortcutsHelp.test.tsx  # Keyboard shortcuts
├── hooks/__tests__/
│   ├── useFileHandler.test.ts       # File handling logic
│   └── useViewerNavigation.test.ts  # Navigation logic
└── utils/__tests__/
    ├── fileHandler.test.ts          # File processing utilities
    └── mermaidParser.test.ts        # Mermaid diagram parsing
```

### **Test Commands**
```bash
# Run all tests
npm test

# Run tests with UI interface
npm run test:ui

# Run tests once (for CI)
npm run test:run

# Run full validation suite
npm run validate:all
```

---

## 🚀 Deployment Process

### **Multi-Channel Deployment**
Mermaid Slides deploys to **three channels simultaneously**:

1. **🌐 Web Application** - GitHub Pages
2. **💾 Offline Package** - GitHub Releases
3. **🐳 Docker Container** - Docker Hub

### **Automated CI/CD Pipeline**
**Location**: `.github/workflows/deploy.yml`

#### **Pipeline Structure**
```yaml
# 5-Job Deployment Pipeline
1. Build & Test Job    # Tests, linting, builds, validation
2. Deploy Pages Job    # GitHub Pages deployment
3. Create Release Job  # GitHub releases with offline package
4. Docker Build Job    # Multi-platform Docker images
5. Deployment Summary  # Consolidated status report
```

#### **Deployment Triggers**
- Push to `main` or `master` branch
- Manual workflow dispatch via GitHub Actions

---

## 📋 Testing Procedures

### **Pre-Deployment Testing**
All tests must pass before deployment:

```bash
# 1. Run automated test suite
npm test

# 2. Run linting checks
npm run lint

# 3. Validate cross-platform compatibility
npm run validate:compatibility

# 4. Validate build continuity
npm run validate:continuity

# 5. Run complete validation suite
npm run validate:all
```

### **Manual Testing Checklist**

#### **Core Functionality**
- [ ] File upload (drag & drop, file picker)
- [ ] Markdown parsing with mermaid diagrams
- [ ] Image support (PNG, JPEG, GIF, WebP)
- [ ] Title extraction from markdown headers
- [ ] Navigation (keyboard shortcuts, mouse controls)
- [ ] Grid view with thumbnails
- [ ] Settings panel functionality

#### **Cross-Platform Testing**
- [ ] **Browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Operating Systems**: Windows, macOS, Linux
- [ ] **Mobile**: iOS Safari, Android Chrome
- [ ] **Offline Package**: Python and Node.js servers

#### **Performance Testing**
- [ ] Large file handling (>1MB markdown files)
- [ ] Multiple diagrams rendering (>20 diagrams)
- [ ] Memory usage during extended use
- [ ] Navigation responsiveness

---

## 🔧 Quality Assurance

### **Code Quality Standards**
- **ESLint Configuration**: Strict TypeScript and React rules
- **Type Safety**: Full TypeScript implementation
- **Test Coverage**: >90% code coverage target
- **Cross-Platform**: Validated on Windows, macOS, Linux

### **Build Validation**
```bash
# Web build validation
npm run build

# Offline package validation
npm run build:offline

# Docker build validation
docker build -t mermaid-slides-test .
```

### **Validation Scripts**
- **`validate-compatibility.cjs`**: Cross-platform compatibility checks
- **`validate-continuity.cjs`**: Build continuity validation
- **`prepare-offline-package.cjs`**: Offline package preparation

---

## 📊 Deployment Channels

### **🌐 Web Application Deployment**
- **Target**: GitHub Pages
- **URL**: https://mermaid-slides.com/
- **Build**: Static files optimized for CDN delivery
- **Deployment Time**: ~2-3 minutes from push to live

### **💾 Offline Package Deployment**
- **Target**: GitHub Releases
- **Format**: ZIP archive with all dependencies
- **Contents**: 
  - Complete application bundle
  - Python and Node.js servers
  - Cross-platform startup scripts
  - Example markdown files
- **Deployment**: Automated archive creation and upload

### **🐳 Docker Container Deployment**
- **Target**: Docker Hub
- **Image**: `kunalpathak13/mermaid-slides`
- **Platforms**: linux/amd64, linux/arm64
- **Features**: Multi-platform support, non-root user, read-only filesystem

---

## 🔄 Release Management

### **Version Management**
- **Source**: `package.json` version field
- **Format**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Synchronization**: All channels use same version
- **Current Version**: 1.2.0

### **Release Process**
1. **Version Update**: Update `package.json` version
2. **Testing**: Run complete test suite
3. **Documentation**: Update version references
4. **Git Tag**: Create version tag
5. **Automated Deployment**: GitHub Actions handles all channels

---

## 🛠️ Development Testing

### **Local Development Testing**
```bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test:ui

# Test offline build locally
npm run build:offline
cd offline-package
python3 start-server.py
```

### **Mock Data and Testing**
- **Sample Data**: Rich sample markdown included
- **Mock Functions**: Mermaid.js and file operations mocked
- **Test Utilities**: Custom test utilities for component testing

---

## 🔍 Troubleshooting

### **Common Test Issues**
```bash
# Clear test cache
npm run test -- --clearCache

# Run specific test file
npm run test -- FileUpload.test.tsx

# Debug failing tests
npm run test:ui  # Use UI interface for debugging
```

### **Build Issues**
```bash
# Clear build cache
rm -rf dist/ node_modules/.vite/

# Reinstall dependencies
npm ci

# Validate build configuration
npm run validate:all
```

### **Deployment Issues**
- **GitHub Actions**: Check workflow logs in repository
- **Docker Build**: Verify multi-platform support
- **Offline Package**: Test server scripts on target platform

---

## 📈 Performance Metrics

### **Target Metrics**
- **Build Time**: <30 seconds for all channels
- **Test Suite**: <60 seconds for complete run
- **Application Load**: <3 seconds first load
- **Memory Usage**: <100MB during typical use

### **Monitoring**
- **GitHub Actions**: Automated build success tracking
- **Test Results**: Continuous test result monitoring
- **Performance**: Load time and memory usage validation

---

**Testing Status**: ✅ All 44+ tests passing with comprehensive coverage across the application.