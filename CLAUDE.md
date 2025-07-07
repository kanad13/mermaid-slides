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
- `docs/DISTRIBUTION_GUIDE.md` - Distribution process
- `scripts/validate-compatibility.cjs` - Cross-platform validation

## ⚡ **Workflow**

**Before coding**: Review architecture strategy, run validation  
**After coding**: Test, lint, validate compatibility  
**Key principle**: Preserve functionality, maintain cross-platform compatibility

---

**Live Demo**: https://mermaid-slides.com/  
**Phase**: Automated CI/CD complete, VS Code Extension planned