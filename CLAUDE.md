# Claude Code Session Guide - Mermaid Slides

**Mermaid Slides** - Transform markdown mermaid diagrams into presentation slides with navigation and theming.

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
- `src/utils/` - Utilities and parsers

## 🌐 **Distribution Channels**

1. **Web**: https://kanad13.github.io/mermaid-slides/ (automated)
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

**Live Demo**: https://kanad13.github.io/mermaid-slides/  
**Phase**: Automated CI/CD complete, VS Code Extension planned