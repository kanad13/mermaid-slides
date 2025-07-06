# 🏷️ Semantic Versioning Strategy - Mermaid Slides

**Document Version**: 1.0.0  
**Created**: 2025-07-03  
**Last Updated**: 2025-07-03  

---

## 📋 Overview

This document defines the semantic versioning strategy for Mermaid Slides across all distribution channels: web deployment, offline package, and VS Code extension.

## 🔢 Version Format

**Pattern**: `MAJOR.MINOR.PATCH` (following [Semantic Versioning 2.0.0](https://semver.org/))

**Example**: `1.2.3`
- **1** = Major version
- **2** = Minor version  
- **3** = Patch version

---

## 📊 Version Increment Rules

### 🚨 Major Version (X.0.0)
**When to increment:**
- Breaking changes to core functionality
- Removal of existing features
- Fundamental architecture changes
- Changes that require user action to continue working

**Examples:**
- Removing support for old markdown formats
- Changing core navigation behavior
- Major UI/UX overhaul that changes user workflows

### ✨ Minor Version (0.X.0)
**When to increment:**
- New features that maintain backward compatibility
- New diagram types support
- New themes or viewing modes
- Performance improvements
- New export formats

**Examples:**
- Adding new Mermaid diagram support
- New presentation themes
- Grid view enhancements
- Keyboard shortcut additions

### 🔧 Patch Version (0.0.X)
**When to increment:**
- Bug fixes that don't change functionality
- Security updates
- Documentation updates
- Dependency updates (non-breaking)
- Performance optimizations

**Examples:**
- Fixing diagram rendering issues
- Correcting keyboard navigation bugs
- Updating documentation
- Security patches

---

## 🎯 Distribution Channel Synchronization

### 📦 Current Channels
1. **Web Deployment** (GitHub Pages)
2. **Offline Package** (Downloadable ZIP)
3. **VS Code Extension** (Planned)

### 🔄 Version Synchronization Strategy

**Approach**: **Unified Versioning**
- All channels maintain the same version number
- Releases are coordinated across all channels
- Each channel includes version identifier

**Benefits:**
- ✅ Simple for users to understand
- ✅ Clear compatibility between channels
- ✅ Easier support and debugging

### 📅 Release Coordination

**Process:**
1. **Development** → All changes made in main repository
2. **Testing** → All channels tested simultaneously  
3. **Release** → Version tag created in git
4. **Deploy** → All channels updated with same version

---

## 🏷️ Version Tagging Strategy

### 📋 Git Tag Format
```bash
# Release tags
v1.0.0          # Full release
v1.1.0-beta.1   # Beta release
v1.1.0-alpha.2  # Alpha release
```

### 🚀 Release Types

**Stable Releases**: `v1.0.0`
- Fully tested across all channels
- Production-ready
- Full documentation
- No known critical bugs

**Beta Releases**: `v1.1.0-beta.1`
- Feature-complete but may have minor bugs
- Available for user testing
- Documentation may be incomplete

**Alpha Releases**: `v1.1.0-alpha.1`
- Early development versions
- For developer testing only
- May have incomplete features

---

## 📄 Version Information Display

### 🌐 Web Deployment
```html
<!-- In HTML meta tags -->
<meta name="version" content="1.0.0">

<!-- In application footer -->
<footer>Mermaid Slides v1.0.0</footer>
```

### 💾 Offline Package
```markdown
<!-- In README.md -->
**Version**: 1.0.0 (Offline Package)

<!-- In package.json equivalent -->
{
  "version": "1.0.0",
  "name": "mermaid-slides-offline"
}
```

### 🔧 VS Code Extension
```json
// In package.json
{
  "version": "1.0.0",
  "displayName": "Mermaid Slides v1.0.0"
}
```

---

## 🔄 Update and Migration Strategy

### 📥 User Notification

**Web Deployment:**
- Automatic updates (no user action required)
- Optional version notification in UI

**Offline Package:**
- Manual download required
- Clear upgrade instructions
- Migration guide for breaking changes

**VS Code Extension:**
- Automatic updates via VS Code marketplace
- Optional manual update

### 📋 Migration Guidelines

**For Major Version Changes:**
1. **Migration Guide** → Detailed upgrade instructions
2. **Backward Compatibility** → Support old format for 1 version
3. **User Communication** → Clear breaking change notifications
4. **Rollback Plan** → Option to downgrade if needed

---

## 🧪 Testing Strategy by Version Type

### 🔧 Patch Releases
- ✅ Regression testing
- ✅ Bug fix verification
- ✅ Quick smoke test across channels

### ✨ Minor Releases  
- ✅ Full feature testing
- ✅ Compatibility testing
- ✅ Performance validation
- ✅ User acceptance testing

### 🚨 Major Releases
- ✅ Complete system testing
- ✅ Migration testing
- ✅ Extended beta testing period
- ✅ Breaking change validation
- ✅ Documentation review

---

## 📊 Version History Tracking

### 📋 Changelog Format
```markdown
# Changelog

## [1.2.0] - 2025-07-03
### Added
- New grid view mode for presentations
- Support for additional Mermaid diagram types

### Changed
- Improved keyboard navigation performance
- Updated UI for better mobile experience

### Fixed
- Fixed diagram rendering on Safari
- Corrected theme switching behavior

## [1.1.1] - 2025-06-25
### Fixed
- Security update for dependencies
- Fixed offline package server startup
```

### 🏷️ Release Notes Template
```markdown
# Release v1.2.0 - Enhanced Navigation

## 🎉 What's New
- **Grid View Mode**: Navigate all slides at once
- **New Diagram Support**: Added support for X, Y, Z diagrams

## 🔧 Improvements
- **Performance**: 40% faster diagram rendering
- **Mobile**: Better touch navigation

## 🐛 Bug Fixes
- Fixed theme switching on Edge browser
- Corrected file upload validation

## 📦 Download
- [Web Version](https://mermaid-slides.com/)
- [Offline Package](https://github.com/user/repo/releases/v1.2.0)

## 🔄 Upgrade Notes
No breaking changes - automatic update for web users.
```

---

## 🛡️ Security Version Strategy

### 🚨 Security Updates
- **Immediate patch release** for critical vulnerabilities
- **Coordinated disclosure** following industry standards
- **Clear security advisories** for users

### 🔢 Security Version Format
```bash
v1.0.1-security.1    # Security patch
v1.0.2               # Regular patch including security fix
```

---

## 📅 Release Schedule

### 🗓️ Regular Release Cycle
- **Patch releases**: As needed (bug fixes, security)
- **Minor releases**: Monthly (new features)
- **Major releases**: Quarterly or as needed (breaking changes)

### 🚀 Emergency Releases
- **Security issues**: Within 24-48 hours
- **Critical bugs**: Within 1 week
- **Hotfixes**: Outside regular schedule as needed

---

## ✅ Implementation Checklist

### 📋 Version 1.0.0 Baseline
- [x] Current web deployment
- [x] Current offline package  
- [ ] VS Code extension (planned)

### 🔄 Process Implementation
- [x] Git tagging strategy defined
- [x] Version display locations identified
- [x] Changelog format established
- [ ] Automated version bumping (future)
- [ ] Release automation (future)

---

**Next Actions**: Implement version display in current channels and establish git tagging workflow.