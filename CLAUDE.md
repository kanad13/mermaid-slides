# Claude Code Session Guide - Mermaid Slides

**Mermaid Slides** - Transform markdown mermaid diagrams into presentation slides with navigation, theming, and automatic title extraction.

## 🚀 **Quick Start**

```bash
npm run dev              # Development server
npm run build           # Production build
npm run build:offline   # Offline package
npm test               # Test suite
npm run lint           # Code quality
npm run validate:all   # Full validation
```

## 🏗️ **Architecture**

- `src/App.tsx` - Main application
- `src/components/` - Modular components (<100 lines each)
- `src/hooks/` - 8 custom hooks
- `src/utils/` - Utilities and parsers (includes title extraction)

## ✨ **Features**

- **Title Extraction**: Automatically extracts markdown headers as slide titles
- **Settings Toggle**: Show/hide titles with user preference (enabled by default)
- **Theme Integration**: Title styling matches light/dark mode themes
- **Grid View**: Displays meaningful titles instead of generic labels

## 🌐 **Distribution Channels**

1. **Web**: https://mermaid-slides.com/ (automated)
2. **Offline**: Package + Docker `kunalpathak13/mermaid-slides` (automated)
3. **VS Code Extension**: Planned for future development

## 📚 **Key Documents**

- `docs/ARCHITECTURE_STRATEGY.md` - Multi-channel strategy
- `docs/DISTRIBUTION.md` - Distribution process
- `scripts/validate-compatibility.cjs` - Cross-platform validation

## ⚡ **Workflow**

**Before coding**: Review architecture strategy, run validation
**After coding**: Test, lint, validate compatibility, **UPDATE DOCUMENTATION**
**Key principle**: Preserve functionality, maintain cross-platform compatibility

## 📚 **DOCUMENTATION AUTOMATION RESPONSIBILITIES**

### **AUTOMATIC DOCUMENTATION TRIGGERS**
Claude must **automatically** check and update documentation when:

#### **🚨 IMMEDIATE UPDATE REQUIRED**
- **New Features**: Any user-facing feature addition → Update README.md + FEATURES.md
- **API Changes**: Function signatures, props, interfaces → Update technical docs + examples
- **Version Updates**: package.json version change → Update ALL version references
- **Breaking Changes**: Behavior modifications → Update ALL affected documentation
- **Component Changes**: New/modified components → Update architecture documentation

#### **📋 SYSTEMATIC CHECKS REQUIRED**
- **Dependency Updates**: package.json changes → Review DEPENDENCY_MANAGEMENT.md
- **Test Additions**: New test files → Update TESTING_AND_DEPLOYMENT.md
- **Build Changes**: vite.config, scripts → Update relevant technical docs
- **Feature Removal**: Deleted functionality → Remove from ALL documentation

### **DOCUMENTATION UPDATE CHECKLIST**
For **EVERY** coding session, Claude must:

1. **🔍 DETECT CHANGES**
   - [ ] Identify what type of changes were made
   - [ ] Determine documentation impact scope
   - [ ] Check if changes affect user-facing features

2. **📝 UPDATE DOCUMENTATION**
   - [ ] README.md: Add new features to Key Features section
   - [ ] FEATURES.md: Document new capabilities comprehensively  
   - [ ] Technical docs: Update architecture/implementation details
   - [ ] Examples: Update code examples if APIs changed
   - [ ] Version references: Synchronize if version updated

3. **✅ VALIDATE ACCURACY**
   - [ ] Cross-reference documentation claims with actual code
   - [ ] Verify all examples work with current implementation
   - [ ] Check for broken internal references
   - [ ] Ensure version consistency across all files

### **DOCUMENTATION CHANGE DETECTION SYSTEM**

```bash
# Claude should ask these questions after ANY code changes:

1. "Did I add any new user-facing features?"
   → YES: Update README.md Key Features + FEATURES.md

2. "Did I modify any component APIs or props?"
   → YES: Update technical documentation + examples

3. "Did I change package.json version?"
   → YES: Update version references in ALL documentation

4. "Did I add/remove/modify tests?"
   → YES: Update TESTING_AND_DEPLOYMENT.md

5. "Did I add new dependencies or scripts?"
   → YES: Review and update relevant documentation

6. "Did I modify build or deployment configuration?"
   → YES: Update DISTRIBUTION.md or technical docs
```

### **AUTOMATED VALIDATION PROMPTS**

After documentation updates, Claude must:

```bash
# Documentation Accuracy Validation
1. "Do all documented features actually exist in the code?"
2. "Do all code examples work with current implementation?"
3. "Are version numbers consistent across all documentation?"
4. "Do internal links point to existing files/sections?"
5. "Does the README accurately represent current capabilities?"
```

---

**Live Demo**: https://mermaid-slides.com/
