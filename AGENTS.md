# Mermaid Slides - Agent Context

Transform markdown mermaid diagrams into presentation slides with navigation, theming, and automatic title extraction.

**Live Demo**: https://mermaid-slides.com/

---

## Commands

```bash
npm run dev              # Development server (http://localhost:5173)
npm run build           # Production build
npm run build:offline   # Offline package with local server scripts
npm test               # Run test suite with Vitest
npm run lint           # ESLint code quality check
npm run validate:all   # Full cross-platform validation
```

---

## Architecture

**Core Structure:**
- `src/App.tsx` - Main application entry point
- `src/components/` - React components (<100 lines each, modular design)
- `src/hooks/` - 8 custom React hooks for state and logic
- `src/utils/` - Utilities and parsers (includes title extraction)

**Key Features:**
- Automatic title extraction from markdown headers
- Theme integration (light/dark mode)
- Grid view with meaningful slide titles
- Settings persistence
- Cross-platform compatibility (web, offline, Docker)

---

## Distribution Channels

1. **Web App**: https://mermaid-slides.com/ (GitHub Pages, automated deployment)
2. **Offline Package**: Standalone with Node.js/Python/shell server scripts
3. **Docker**: `kunalpathak13/mermaid-slides` (Docker Hub, automated)
4. **VS Code Extension**: Planned for future development

---

## Code Style

- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **Component Size**: Keep under 100 lines
- **Imports**: ES modules syntax (no CommonJS)
- **Styling**: Tailwind CSS utility classes
- **Testing**: Vitest + React Testing Library

---

## Workflow Guidelines

**Before Coding:**
- Review [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for distribution requirements
- Run `npm run validate:all` to check current state
- Ensure cross-platform compatibility considerations

**After Coding:**
- Run `npm test` to verify functionality
- Run `npm run lint` to check code quality
- Run `npm run build` and `npm run build:offline` to verify builds
- Update documentation if adding features or changing APIs
- Test offline package functionality if distribution logic changed

**Key Principles:**
- Preserve cross-platform compatibility (web, offline, Docker)
- Maintain modular component architecture
- Keep dependencies minimal and purposeful
- Document user-facing changes

---

## Project-Specific Notes

**Title Extraction:**
- Implemented in `src/utils/mermaidParser.ts`
- Extracts markdown headers (`#`, `##`, etc.) from diagram code
- Settings toggle in `src/components/Settings/SettingsPanel.tsx`

**Build Artifacts:**
- `dist/` - Web production build (git-ignored)
- `offline-package/` - Offline distribution (git-ignored, generated)
- Both are generated during build process

**Validation Scripts:**
- `scripts/validate-compatibility.cjs` - Cross-platform checks
- `scripts/validate-continuity.cjs` - Documentation consistency

---

## Documentation Structure

- **[README.md](README.md)** - User-facing documentation, features, quick start
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Multi-channel deployment strategy
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Development guidelines, versioning, testing

Keep documentation concise and actionable. Avoid duplication across files.
