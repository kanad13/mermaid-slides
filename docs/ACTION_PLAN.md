# Mermaid Slides - Action Plan

**Created**: 2025-07-05  
**Last Updated**: 2025-07-05
**Current Status**: Phase 1 (Critical Fixes) COMPLETE ✅ - Phase 2 (Feature Enhancements) COMPLETE ✅ - Phase 3 (Web Bug Fixes) ready
**Live Site**: https://kanad13.github.io/mermaid-slides/

---

## Project Status

### Distribution Channels ✅ **ALL COMPLETE**
- **🌐 Web Deployment**: Live at GitHub Pages with CI/CD
- **💾 Offline Package**: Self-contained local distribution 
- **🔧 VS Code Extension**: Working VSIX package (1.76MB)

### Current Architecture
- Modern TypeScript React app with 47 passing tests
- 8 custom hooks for reusable logic
- Complete cross-platform compatibility validation
- Privacy-first design with zero external dependencies

---

## 🎯 **ACTIVE DEVELOPMENT PHASES**

### **Phase 1: Critical Fixes** ✅ **COMPLETED**
**Priority: URGENT - 1.5 hours**

#### **1.1 Web Theme Dropdown Bug** ✅
- **Issue**: Theme selection offset by one position  
- **Files**: `src/components/Viewer/HeaderControls/ThemeDropdown.tsx`
- **Estimate**: 30 minutes
- **Status**: FIXED - Theme dropdown now uses consistent theme options from useTheme hook

#### **1.2 VS Code Grid View Scrolling** ✅
- **Issue**: Grid view missing scrollbars
- **Files**: `src/components/Viewer/GridView.tsx`, `src/components/Viewer/Viewer.tsx`
- **Estimate**: 45 minutes
- **Status**: FIXED - Added extension-specific height handling (`h-screen` vs `min-h-screen`)

#### **1.3 Auto-Hide Top Bar Implementation** ✅
- **Issue**: Need configurable auto-hide behavior
- **Files**: `src/hooks/useAutoHide.ts`, `src/components/Viewer/ViewerHeader.tsx`, `src/App.tsx`
- **Estimate**: 60 minutes
- **Status**: IMPLEMENTED - Added autoHideEnabled prop with smooth transitions, enabled by default for web

### **Phase 1.5: Documentation & Testing Improvements** ✅ **COMPLETED**
**Priority: HIGH - 1 hour**

#### **1.5.1 VS Code Installation Instructions** ✅
- **Issue**: `code` command not found during testing
- **Files**: `VSCODE_TESTING_GUIDE.md`, `TESTING_AND_DEPLOYMENT.md`
- **Estimate**: 30 minutes
- **Status**: COMPREHENSIVE - Created detailed VS Code-specific testing guide with multiple installation methods

#### **1.5.2 Distribution Channel Documentation** ✅
- **Issue**: Generic instructions instead of channel-specific ones
- **Files**: `TESTING_AND_DEPLOYMENT.md`, `VSCODE_TESTING_GUIDE.md`
- **Estimate**: 30 minutes
- **Status**: ENHANCED - Added proper documentation for each distribution channel with specific testing procedures

### **Phase 1.6: Bug Investigation & Tracking** ✅ **COMPLETED**
**Priority: HIGH - 1.5 hours**

#### **1.6.1 VS Code Extension Issues Investigation** ✅
- **Issues**: Auto-hide not working, grid view scrolling not working
- **Files**: `KNOWN_ISSUES.md`, `src/components/Viewer/GridView.tsx`
- **Estimate**: 90 minutes
- **Status**: ROOT CAUSES IDENTIFIED - Auto-hide: missing prop, Grid view: flex layout issues, implemented potential fix

### **Phase 1.7: Theme Dropdown Fix** ✅ **COMPLETED**
**Priority: URGENT - 30 minutes**

#### **1.7.1 Theme Selection Offset Bug** ✅
- **Issue**: Theme dropdown offset by one position across all channels
- **Files**: `src/components/Viewer/HeaderControls/ThemeDropdown.tsx`
- **Estimate**: 30 minutes
- **Status**: FIXED - Removed duplicate useTheme hook, single source of truth for theme state

### **Phase 2: Feature Enhancements** ✅ **COMPLETED**
**Priority: HIGH - 2 hours**

#### **2.1 Settings/Config Panel** ✅
- **Implementation**: Replace theme dropdown with settings panel
- **Features**: Auto-hide config, about button, theme selection
- **Files**: New `src/components/Settings/`, update header controls
- **Estimate**: 120 minutes
- **Status**: COMPLETED - Settings panel implemented with theme selection, auto-hide toggle, and about button

### **Phase 3: Web Version Bug Fixes** 🚀 **IN PROGRESS**
**Priority: HIGH - 3 hours**

#### **3.1 Theme Selection Offset Bug** ✅
- **Issue**: Settings panel theme selection offset by one position
- **Investigation**: React state synchronization between Settings panel and useTheme hook
- **Files**: `src/components/Settings/SettingsPanel.tsx`
- **Estimate**: 90 minutes
- **Status**: FIXED - Type mismatch resolved, 51/51 tests passing including new theme-specific tests

#### **3.2 Favicon Duplication Issue**
- **Issue**: Double mermaid emoji in browser tab
- **Investigation**: Vite dev server interference, browser default favicon behavior
- **Files**: `index.html`, vite config, public assets
- **Estimate**: 45 minutes

#### **3.3 Web Version Polish & Testing**
- **Implementation**: Comprehensive testing of all web features
- **Validation**: Ensure web version is production-ready before extending to other channels
- **Estimate**: 45 minutes

### **Phase 4: Repository Restructure** 🗂️ **FOLLOWING SESSION**
**Priority: MEDIUM - 2 hours**

#### **4.1 VS Code Extension Cleanup**
- **Action**: Remove VS Code extension folder and all related files
- **Rationale**: Focus on web version first, eliminate distraction and maintenance overhead
- **Files**: `/extension/*`, build scripts, documentation references
- **Estimate**: 30 minutes

#### **4.2 File Structure Reorganization**
- **Evaluation**: Analyze each file and folder for relevance and organization
- **Actions**: 
  - Move test files to proper locations
  - Organize scripts and configs
  - Clean root directory
  - Consolidate documentation
- **Goal**: Clear, maintainable structure focused on web deployment
- **Estimate**: 90 minutes

### **Phase 5: Advanced Web Features** 🚀 **FUTURE SESSIONS**
**Priority: LOW**

#### **5.1 Cross-Channel Feature Consistency**
- **Implementation**: Automated feature parity validation
- **Estimate**: 90 minutes

---

## Success Metrics

### Quality Metrics
- [x] Core functionality works across all channels
- [x] Complete workflow (file → presentation) in all channels
- [x] Clear documentation for setup and usage
- [ ] No critical bugs after Phase 1 fixes

### Phase 1 Success Criteria ✅
- [x] Theme dropdown selects correct theme
- [x] VS Code grid view has functional scrollbars
- [x] Auto-hide top bar works with user configuration

### Phase 1.5 Success Criteria ✅
- [x] VS Code extension installation works without `code` command
- [x] Comprehensive testing documentation for all distribution channels
- [x] Channel-specific deployment instructions available

### Phase 1.6 Success Criteria ✅
- [x] Root cause identified for VS Code auto-hide issue
- [x] Potential fix implemented for VS Code grid view scrolling
- [x] Bug tracking system established with KNOWN_ISSUES.md

### Phase 1.7 Success Criteria ✅
- [x] Theme dropdown now correctly applies selected themes (all channels)
- [x] No more offset between theme selection and visual appearance
- [x] Single source of truth for theme state established

### Phase 2 Success Criteria ✅
- [x] Settings panel replaces theme dropdown successfully
- [x] Auto-hide configuration toggle works in web mode
- [x] About button displays app information
- [x] Theme selection works from settings panel
- [x] Extension mode hides auto-hide option appropriately

---

**Next Session Goal**: Phase 3 - Fix web version bugs (theme selection offset, favicon duplication) before moving to repository restructure and VS Code extension cleanup.
