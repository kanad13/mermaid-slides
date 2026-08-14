# Contributing Guide

Guidelines for contributing to Mermaid Slides.

---

## Development Setup

**Build / maintainer requirement:** Node **22.12+**. Node 20 reached end of life on 30 April 2026 and no longer receives security patches.

```bash
# Clone repository
git clone https://github.com/kanad13/mermaid-slides.git
cd mermaid-slides

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests once
npm run test:run
```

---

## Development Workflow

### Before Coding

- Review [DEPLOYMENT.md](DEPLOYMENT.md) for distribution requirements
- Run `npm run validate:all` to check current state
- Consider cross-platform compatibility (web, offline, Docker)

### During Development

- Follow TypeScript strict mode
- Keep components under 100 lines
- Use ES modules syntax (no CommonJS)
- Write tests for new features
- Follow existing code patterns

### After Coding

- Run `npm run test:run` to verify functionality
- Run `npm run lint` to check code quality
- Run `npm run build` and `npm run build:offline` to verify builds
- Update documentation if adding features or changing APIs
- Test offline package if distribution logic changed

---

## Code Style

**TypeScript:**

- Strict mode enabled
- Explicit types preferred
- Avoid `any` types

**React:**

- Functional components with hooks
- Component size: <100 lines
- Props interface for each component

**Styling:**

- Tailwind CSS utility classes
- Avoid inline styles
- Follow existing theme patterns

**Testing:**

- Vitest + React Testing Library
- Test user interactions, not implementation
- Maintain >90% coverage

---

## Versioning Strategy

**Format**: Semantic Versioning (MAJOR.MINOR.PATCH)

**Increment Rules:**

- **MAJOR (X.0.0)**: Breaking changes, removed features, fundamental architecture changes
- **MINOR (0.X.0)**: New features (backward compatible), new diagram types, new themes
- **PATCH (0.0.X)**: Bug fixes, security updates, documentation updates, dependency updates

**Examples:**

- Major: Removing markdown format support, changing navigation behavior
- Minor: Adding new Mermaid diagram support, grid view enhancements
- Patch: Fixing rendering issues, correcting navigation bugs, security patches

**Version Source**: `package.json` is the single source of truth

**Cross-Channel Sync**: All channels (web, offline, Docker) use same version

---

## Dependency Management

### Update Strategy

**Security Updates:**

- Critical: Immediate patch
- High-severity: Within 1 week
- Medium/Low: Next scheduled release

**Regular Updates:**

- Major dependencies: Quarterly review
- Minor/Patch: Monthly maintenance window
- Test before deploying

### Security Monitoring

```bash
# Check for vulnerabilities
npm audit

# Fix automatically fixable issues
npm audit fix

# Manual review for breaking changes
npm audit fix --force  # Use with caution
```

**Automated Scanning:**

- GitHub Dependabot enabled
- Automatic security alerts
- Weekly dependency update PRs

### Current Dependency Lines (Core)

- React 19.x
- Mermaid 11.x
- Vite 7.x
- TypeScript 5.x
- Tailwind CSS 3.4.x

---

## Testing Procedures

### Test Suite

**Framework**: Vitest (44+ tests)
**Libraries**: React Testing Library, jsdom

**Structure:**

```
src/
├── App.test.tsx
├── components/__tests__/
├── hooks/__tests__/
└── utils/__tests__/
```

### Test Commands

```bash
# Run tests in watch mode
npm test

# Run tests once (for CI / validation)
npm run test:run

# Run with UI interface
npm run test:ui

# Full validation suite
npm run validate:all
```

### Pre-Deployment Testing Checklist

**Automated:**

- [ ] All tests passing: `npm run test:run`
- [ ] Linting clean: `npm run lint`
- [ ] Build successful: `npm run build`
- [ ] Offline build successful: `npm run build:offline`
- [ ] Compatibility validated: `npm run validate:compatibility`
- [ ] Continuity validated: `npm run validate:continuity`

**Manual:**

- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test offline package on Windows, macOS, Linux
- [ ] Verify all server scripts work (Python, Node.js, Shell, Batch)
- [ ] Test Docker image builds and runs
- [ ] Check mobile responsiveness

---

## Git Workflow

### Branch Strategy

```
main                  # Production-ready code
├── feature/xxx       # Feature development
├── bugfix/xxx        # Bug fixes
└── hotfix/xxx        # Critical fixes
```

### Commit Messages

**Format**: Conventional Commits

```bash
feat: Add new diagram type support
fix: Correct keyboard navigation bug
docs: Update deployment guide
test: Add tests for title extraction
chore: Update dependencies
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with clear commits
3. Run full validation: `npm run validate:all`
4. Push branch and create PR
5. Ensure CI passes
6. Request review
7. Merge when approved

---

## Release Process

### Creating a Release

1. **Update Version**:

   ```bash
   # Update package.json version
   npm version patch  # or minor, or major
   ```

2. **Build All Channels**:

   ```bash
   npm run build
   npm run build:offline
   ```

3. **Run Full Validation**:

   ```bash
   npm run validate:all
   ```

4. **Commit and Tag**:

   ```bash
   git add .
   git commit -m "Release v1.2.3"
   git tag v1.2.3
   ```

5. **Push to Main**:

   ```bash
   git push origin main --tags
   ```

6. **Automated Deployment**: GitHub Actions deploys all channels automatically

### Post-Release Verification

- [ ] Web app live at https://mermaid-slides.com/
- [ ] GitHub Release created with offline package
- [ ] Docker image pushed to Docker Hub
- [ ] Version numbers consistent across all channels

---

## Project-Specific Notes

### Title Extraction

- Implementation: `src/utils/mermaidParser.ts`
- Extracts markdown headers from diagram code
- Settings: `src/components/Settings/SettingsPanel.tsx`

### Build Artifacts

- `dist/` - Web production build (git-ignored)
- `offline-package/` - Offline distribution (git-ignored)
- Both generated during build process

### Validation Scripts

- `scripts/validate-compatibility.cjs` - Cross-platform checks
- `scripts/validate-continuity.cjs` - Documentation consistency

---

## Documentation Standards

**Keep It Concise:**

- Avoid duplication across files
- Focus on actionable information
- Update when making changes

**Documentation Files:**

- [README.md](../README.md) - User-facing documentation, features
- [AGENTS.md](../AGENTS.md) - AI agent context and commands
- [DEPLOYMENT.md](DEPLOYMENT.md) - Multi-channel deployment strategy
- [CONTRIBUTING.md](CONTRIBUTING.md) - This file

---

## Getting Help

**Issues**: [GitHub Issues](https://github.com/kanad13/mermaid-slides/issues)
**Discussions**: [GitHub Discussions](https://github.com/kanad13/mermaid-slides/discussions)
**Documentation**: Check docs/ directory for guides

---

**Thank you for contributing to Mermaid Slides!**
