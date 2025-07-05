# Claude Code Session Guide - Mermaid Slides Project

This file contains important context for Claude Code to effectively work on the Mermaid Slides project across multiple sessions.

## 📋 **Project Context**

### **What is Mermaid Slides?**
A React application that transforms markdown files containing Mermaid diagrams into presentation slides with navigation, theming, and multiple view modes.

### **Current State (as of 2025-07-03)**
- **Working Features**: File upload, diagram parsing, presentation mode, navigation, theming
- **Architecture**: Complete TypeScript modular structure with 8 custom hooks
- **Testing**: 47 passing tests with comprehensive coverage ✅
- **Web Deployment**: Live at GitHub Pages with automated CI/CD ✅
- **Offline Package**: Complete self-contained distribution with local servers ✅
- **Quality Assurance**: Complete strategic framework with automated validation ✅
- **Status**: Phase 3.5 complete, VS Code Extension removed for fresh restart

## 🚨 **Critical Information**

### **Start Commands**
```bash
# Development server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Test
npm test

# Validation
npm run validate:all

# Extension development - REMOVED
# Extension codebase removed for fresh restart in future session
```

### **Session Checkpoint Protocol**
When approaching context limits, create a session checkpoint by:
1. Updating the current status in `docs/ACTION_PLAN.md`
2. Marking todos as completed in TodoWrite tool
3. Creating a "Session Checkpoint" section with:
   - Current phase percentage complete
   - Files created/modified in this session
   - Next steps for continuation
   - Any blockers or issues encountered
4. Summarizing progress concisely for smooth handoff

### **Key Files to Understand**
- `src/App.tsx` - Main application component (TypeScript)
- `src/components/` - Complete modular component structure
- `src/hooks/` - 8 custom hooks for reusable logic
- `docs/ACTION_PLAN.md` - **CRITICAL**: Current action plan for distribution channels
- `docs/ARCHITECTURE_STRATEGY.md` - **NEW**: Multi-channel architecture strategy
- `docs/DISTRIBUTION_GUIDE.md` - **NEW**: Comprehensive distribution documentation
- `scripts/validate-compatibility.cjs` - **NEW**: Automated cross-platform validation
- `scripts/validate-continuity.cjs` - **NEW**: Session continuity validation

## 📊 **Current Distribution Process**

### **Automated CI/CD Pipeline**: ✅ COMPLETE
**Current Phase**: Phase 3.5+ Complete - Automated Multi-Channel Deployment ✅
**Next Phase**: VS Code Extension codebase removed for fresh restart
**Live Site**: https://kanad13.github.io/mermaid-slides/

### **🚀 Deployment Automation**
Every commit to main automatically deploys to **ALL THREE CHANNELS**:
- **🌐 Web App**: Auto-deploys to GitHub Pages
- **📦 Offline Package**: Auto-creates GitHub Release with downloadable ZIP
- **🐳 Docker Image**: Auto-builds and pushes to Docker Hub
- **📊 Summary**: Complete deployment status in GitHub Actions

### **Strategic Documentation**
**MUST READ** these documents before starting Phase 4:
- `docs/ARCHITECTURE_STRATEGY.md` - Single-repo architecture strategy with branch management
- `docs/DISTRIBUTION_GUIDE.md` - Complete distribution process for all channels
- `docs/GITHUB_ACTIONS_SETUP.md` - **NEW**: Automated CI/CD pipeline documentation
- `docs/VERSIONING.md` - Semantic versioning and dependency management strategy

### **Progress Tracking**
Always check and update `docs/ACTION_PLAN.md`:
- Mark tasks as completed ✅
- Update progress sections
- Note any blockers or issues
- Update "Last Updated" timestamp

## 🛠️ **Development Guidelines**

### **Before Making Changes**
1. Read `docs/ACTION_PLAN.md` to understand current priorities
2. **Read strategic documents**: `docs/ARCHITECTURE_STRATEGY.md` and `docs/DISTRIBUTION_GUIDE.md`
3. Check which distribution phase we're in (currently Phase 3.5 - post VS Code Extension removal)
4. Run cross-platform validation: `node scripts/validate-compatibility.cjs`
5. Identify specific tasks to work on
6. Update task status to "in progress"

### **When Making Changes**
1. Test functionality before and after changes
2. Run `npm run lint` to check code quality
3. **Run validation**: `node scripts/validate-compatibility.cjs` after any distribution changes
4. Update relevant documentation
5. Follow architecture strategy from `docs/ARCHITECTURE_STRATEGY.md`
6. Mark tasks as complete in `docs/ACTION_PLAN.md`

### **Key Principles**
- **Preserve Functionality**: Never break existing features
- **Follow Architecture Strategy**: Use single-repo approach defined in `docs/ARCHITECTURE_STRATEGY.md`
- **Validate Changes**: Run `node scripts/validate-compatibility.cjs` after distribution changes
- **Update Documentation**: Keep action plan and distribution docs current
- **Test Changes**: Verify everything works after modifications

## 📦 **Dependencies Status**

### **Current Versions (as of 2025-07-03)**
- ✅ React: 19.1.0 (Latest)
- ✅ Mermaid: 11.7.0 (Latest)
- ✅ Vite: 7.0.0 (Latest)
- ✅ TypeScript: 5.8.3 (Latest)
- ✅ Tailwind: 3.4.17 (Latest stable)

**Status**: All dependencies are up-to-date and working correctly.

## 🏗️ **Architecture Status**

### **Current Architecture (Achieved)**
- ✅ Fully modular components (max 100 lines each)
- ✅ 8 custom hooks for reusable logic
- ✅ Complete TypeScript implementation with type safety
- ✅ Clean separation of concerns

### **Next Focus**
- ✅ Repository structure cleaned and organized
- ✅ Phase 3: Offline distribution packaging complete
- **Next Phase**: VS Code Extension fresh restart (when ready)

## 🧪 **Testing Status**
- **Current**: 47 passing tests with comprehensive coverage ✅
- **Infrastructure**: Vitest + React Testing Library fully configured ✅
- **Cross-Platform**: Automated validation script (20/20 tests passing) ✅
- **Status**: Testing foundation complete, distribution-ready

## 📚 **Documentation Status**

### **Current State**
- ✅ Documentation updated to reflect current architecture
- ✅ Obsolete planning documents removed
- ✅ Clear action plan for distribution channels established
- ✅ Complete architecture strategy documented (`docs/ARCHITECTURE_STRATEGY.md`)
- ✅ Comprehensive distribution guide created (`docs/DISTRIBUTION_GUIDE.md`)
- ✅ Cross-platform validation automated (`scripts/validate-compatibility.cjs`)

### **Focus**
Documentation updated to reflect VS Code extension removal.

## 🚀 **Quick Start for New Session**

1. **Check Current Status**:
   ```bash
   # Check current project state
   npm run dev
   
   # Run full test suite
   npm test
   
   # Run cross-platform validation
   node scripts/validate-compatibility.cjs
   
   # Run continuity validation
   node scripts/validate-continuity.cjs
   
   # Verify web deployment
   # Visit: https://kanad13.github.io/mermaid-slides/
   ```

2. **Review Strategic Documents**:
   - **MUST READ**: `docs/ACTION_PLAN.md` - Current phase and priorities
   - **MUST READ**: `docs/ARCHITECTURE_STRATEGY.md` - Single-repo architecture strategy
   - **MUST READ**: `docs/DISTRIBUTION_GUIDE.md` - Complete distribution process
   - Phase 3.5 (Quality Assurance) is COMPLETE ✅
   - **Current Focus**: Post VS Code Extension removal cleanup

3. **Start Working**:
   - Work on remaining tasks or new feature development
   - Update task status to "in progress" in action plan
   - Test changes with validation script
   - Update documentation and action plan progress

## 💡 **Tips for Effective Sessions**

### **Understanding the Codebase**
- Look at `src/App.tsx` for main application component
- Check `src/components/` for complete modular structure
- Review `src/hooks/` for 8 custom hooks with reusable logic

### **Common Tasks**
- **Feature Development**: Core React application improvements
- **Cross-Platform Validation**: Run `node scripts/validate-compatibility.cjs`
- **Architecture Compliance**: Follow `docs/ARCHITECTURE_STRATEGY.md`
- **Documentation**: Keep action plan and distribution docs updated

### **When Stuck**
- Check if issue is documented in action plan or architecture strategy
- Review `docs/ARCHITECTURE_STRATEGY.md` for guidance
- Run `node scripts/validate-compatibility.cjs` to verify current state
- Look for similar patterns in existing code
- Test changes incrementally

## 🔄 **Session Handoff**

### **At End of Session**
1. Update `docs/ACTION_PLAN.md` with:
   - Completed tasks ✅
   - Any new issues discovered
   - Current progress status
   - Next priority items

2. Test that current state works:
   ```bash
   npm run dev
   npm run build
   npm run lint
   npm run validate:all
   ```

3. Commit changes if appropriate (but only when explicitly requested)

---

**Last Updated**: 2025-07-05 (Phase 3.5+ Complete + Automated CI/CD Pipeline)
**Phase 3.5+ Status**: ✅ COMPLETE - Automated multi-channel deployment pipeline
**Repository Status**: ✅ PRODUCTION READY - Complete automation with GitHub Actions
**Next Session Priority**: TBD - VS Code Extension removed for fresh restart

### **🚀 Deployment Status**
- **Web Channel**: ✅ Auto-deployed via GitHub Actions
- **Offline Channel**: ✅ Auto-released via GitHub Actions  
- **Docker Channel**: ✅ Auto-published via GitHub Actions
- **CI/CD Pipeline**: ✅ Complete automation on every commit to main

**🔑 KEY CONTINUITY DOCUMENTS:**
- `docs/ACTION_PLAN.md` - Phase tracking and task management
- `docs/ARCHITECTURE_STRATEGY.md` - Single-repo architecture and version strategy
- `docs/DISTRIBUTION_GUIDE.md` - Complete distribution process documentation
- `scripts/validate-compatibility.cjs` - Automated quality assurance validation