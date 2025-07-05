# Multi-Channel Architecture Strategy

**Created**: 2025-07-03  
**Updated**: 2025-07-05  
**Phase**: 3.5+ - Automated Multi-Channel Deployment  
**Status**: Strategic Framework Document  

---

## Executive Summary

This document defines the architecture strategy for distributing Mermaid Slides across two active channels: Web and Offline. The VS Code Extension channel has been removed to eliminate feature drift and will be redesigned from scratch in a future phase. The strategy ensures maintainability, consistency, and scalability while minimizing complexity.

## Recommended Architecture: Single Repository with Channel-Specific Builds

### Decision: Single Repository (Current Approach) ✅

**Rationale**:
- Core React application remains identical across all channels
- Shared component library, hooks, and utilities
- Unified testing suite covers all distribution channels
- Single source of truth for bug fixes and feature updates
- Simplified dependency management and security updates

### Repository Structure Strategy

```
mermaid-slides/                    # Main repository
├── src/                          # Core React application (shared)
├── public/                       # Web-specific assets
├── offline-package/              # Offline distribution build
├── scripts/                      # Build and deployment scripts
├── docs/                         # Documentation
├── config/                       # Build configurations
└── dist/                         # Generated builds
```

### Channel-Specific Adaptations

#### 1. Web Channel (✅ Complete)
- **Build Target**: Static files for GitHub Pages
- **Configuration**: `vite.config.js` with base path
- **Assets**: Bundled with CDN fallbacks
- **Deployment**: Automated via GitHub Actions

#### 2. Offline Channel (✅ Complete)
- **Build Target**: Self-contained package with local servers
- **Configuration**: Modified build for relative paths
- **Assets**: All dependencies bundled locally
- **Servers**: Python, Node.js, batch, and shell scripts

#### 3. VS Code Extension (🚫 Removed)
- **Status**: Removed due to feature drift
- **Future**: Will be redesigned from scratch in a future phase
- **Reason**: Eliminated to maintain focus on core functionality

---

## Version Synchronization Strategy

### Semantic Versioning Implementation

**Format**: `MAJOR.MINOR.PATCH` (e.g., 1.2.3)

- **MAJOR**: Breaking changes in core functionality
- **MINOR**: New features, new distribution channels
- **PATCH**: Bug fixes, security updates, dependency updates

### Cross-Channel Version Management

1. **Single Version Source**: `package.json` version is authoritative
2. **Build-Time Injection**: Version injected into all builds
3. **Channel Tagging**: Git tags format `v1.2.3-web`, `v1.2.3-offline`
4. **Release Coordination**: All channels built from same commit

### Version Display Strategy

```typescript
// Version display in each channel
const VERSION_INFO = {
  core: "1.2.3",           // From package.json
  channel: "web",          // Injected at build time
  build: "20250703.1"      // Build timestamp
};
```

---

## Branch Strategy

### Development Workflow

```
main                      # Production-ready code, all channels
├── develop              # Integration branch for new features
├── feature/xxx          # Feature development branches
├── release/v1.2.3       # Release preparation branches
└── hotfix/xxx           # Critical bug fixes
```

### Channel Release Process ✅ AUTOMATED

1. **Feature Development**: `feature/xxx` → `develop`
2. **Release Preparation**: `develop` → `release/v1.2.3`
3. **Channel Testing**: Test all channels from release branch
4. **Production Release**: `release/v1.2.3` → `main`
5. **🚀 Automated Deployment**: GitHub Actions deploys to ALL channels

### Release Automation ✅ IMPLEMENTED

**GitHub Actions Workflow**: `.github/workflows/deploy.yml`
```bash
# Triggers automatically on push to main
# - Runs tests and linting
# - Builds all channels
# - Deploys web app to GitHub Pages
# - Creates GitHub Release with offline package
# - Builds and pushes Docker image
# - Provides comprehensive deployment summary
```

---

## Cross-Platform Compatibility Validation

### Testing Matrix

| Platform | Web | Offline | Status |
|----------|-----|---------|--------|
| **Windows** | ✅ Chrome/Edge/Firefox | ✅ Python/Node.js | Ready |
| **macOS** | ✅ Safari/Chrome/Firefox | ✅ Python/Node.js | Ready |
| **Linux** | ✅ Chrome/Firefox | ✅ Python/Node.js | Ready |

### Compatibility Requirements

#### Web Channel
- **Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Android Chrome 90+
- **Features**: ES2020 support, CSS Grid, WebGL (for Mermaid)

#### Offline Channel
- **Runtimes**: Python 3.7+, Node.js 14+
- **Systems**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Dependencies**: Zero external network requirements

#### VS Code Extension
- **Status**: Removed - will be redesigned in future phase

---

## Distribution Documentation Strategy

### Channel-Specific Documentation

#### 1. Web Channel Documentation
- **Location**: `docs/WEB_DEPLOYMENT.md`
- **Content**: GitHub Pages setup, custom domain configuration
- **Audience**: Developers wanting to deploy their own instance

#### 2. Offline Package Documentation
- **Location**: `offline-package/README.md` ✅
- **Content**: Download, setup, server options, troubleshooting
- **Audience**: End users, corporate environments

#### 3. VS Code Extension Documentation
- **Status**: Removed - will be created in future phase

### Unified Documentation Hub

- **Master README**: Overview of both active channels
- **Quick Start**: 30-second setup for each channel
- **Feature Comparison**: Channel-specific capabilities
- **Migration Guide**: Moving between channels

---

## Security and Maintenance Strategy

### Security Audit Workflow

1. **Dependency Scanning**: Weekly automated scans
2. **Vulnerability Assessment**: Monthly manual review
3. **Update Protocol**: Critical patches within 24 hours
4. **Channel Isolation**: Security issues contained per channel

### Maintenance Procedures

#### Regular Updates
- **Dependencies**: Monthly review and updates
- **Security Patches**: Immediate application
- **Feature Parity**: Ensure all channels have same core features

#### Quality Assurance Checklist
- [ ] All tests passing across channels
- [ ] Cross-platform compatibility verified
- [ ] Documentation updated and accurate
- [ ] Performance benchmarks within acceptable ranges

---

## Implementation Timeline

### Phase 3.5 Completion (Current)
- [x] Architecture strategy documentation
- [ ] Cross-platform validation tests
- [ ] Comprehensive distribution documentation
- [ ] Automated build and release scripts

### Phase 4 (Future)
- [ ] VS Code extension redesign from scratch
- [ ] Extension-specific build configuration
- [ ] Webview integration testing

---

## Success Metrics

### Architecture Goals
- **Maintainability**: Single codebase, shared components
- **Consistency**: Identical user experience across channels
- **Scalability**: Easy addition of new distribution channels
- **Security**: Isolated security management per channel

### Quality Metrics
- **Build Success**: >99% automated build success rate
- **Test Coverage**: >90% code coverage across all channels
- **Performance**: <30 seconds from installation to first use
- **Documentation**: Complete setup guides for each channel

---

## Risk Mitigation

### Technical Risks
- **Build Complexity**: Automated scripts with fallback procedures
- **Dependency Conflicts**: Channel-specific dependency management
- **Platform Compatibility**: Comprehensive testing matrix

### Operational Risks
- **Release Coordination**: Automated release process
- **Documentation Drift**: Single-source documentation strategy
- **Security Vulnerabilities**: Automated scanning and response procedures

---

**Next Actions**: Proceed with cross-platform compatibility validation and comprehensive distribution documentation.