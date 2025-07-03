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
- **Status**: Phase 3 complete, Phase 3.5 (Quality Assurance) planned

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
```

### **Key Files to Understand**
- `src/App.tsx` - Main application component (TypeScript)
- `src/components/` - Complete modular component structure
- `src/hooks/` - 8 custom hooks for reusable logic
- `docs/ACTION_PLAN.md` - **CRITICAL**: Current action plan for distribution channels

## 📊 **Current Distribution Process**

### **Active Plan**: See `docs/ACTION_PLAN.md`
**Current Phase**: Phase 3 Complete - Offline Package ✅
**Next Phase**: Phase 3.5 - Quality Assurance & Distribution Strategy
**Live Site**: https://kanad13.github.io/mermaid-slides/

### **Progress Tracking**
Always check and update `docs/ACTION_PLAN.md`:
- Mark tasks as completed ✅
- Update progress sections
- Note any blockers or issues
- Update "Last Updated" timestamp

## 🛠️ **Development Guidelines**

### **Before Making Changes**
1. Read `docs/ACTION_PLAN.md` to understand current priorities
2. Check which distribution phase we're in
3. Identify specific tasks to work on
4. Update task status to "in progress"

### **When Making Changes**
1. Test functionality before and after changes
2. Run `npm run lint` to check code quality
3. Update relevant documentation
4. Mark tasks as complete in `docs/ACTION_PLAN.md`

### **Key Principles**
- **Preserve Functionality**: Never break existing features
- **Incremental Progress**: Complete one distribution phase before moving to next
- **Update Documentation**: Keep action plan current
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
- Phase 3: Offline distribution packaging

## 🧪 **Testing Status**
- **Current**: 47 passing tests with comprehensive coverage ✅
- **Infrastructure**: Vitest + React Testing Library fully configured ✅
- **Status**: Testing foundation complete, distribution-ready

## 📚 **Documentation Status**

### **Current State**
- ✅ Documentation updated to reflect current architecture
- ✅ Obsolete planning documents removed
- ✅ Clear action plan for distribution channels established

### **Focus**
Distribution-specific documentation and user guides for each channel.

## 🚀 **Quick Start for New Session**

1. **Check Current Status**:
   ```bash
   # Check current project state
   npm run dev
   
   # Run full test suite
   npm test
   
   # Verify web deployment
   # Visit: https://kanad13.github.io/mermaid-slides/
   ```

2. **Review Progress**:
   - Read `docs/ACTION_PLAN.md` thoroughly
   - Phase 2 (Web Deployment) is COMPLETE ✅
   - Next focus: Phase 3 (Offline Version)
   - Identify next priority tasks in action plan

3. **Start Working**:
   - Update task status to "in progress" in action plan
   - Focus on Phase 3 offline distribution tasks
   - Test frequently with both `npm run dev` and deployed site
   - Update documentation and action plan progress

## 💡 **Tips for Effective Sessions**

### **Understanding the Codebase**
- Look at `src/App.tsx` for main application component
- Check `src/components/` for complete modular structure
- Review `src/hooks/` for 8 custom hooks with reusable logic

### **Common Tasks**
- **Testing Setup**: Priority focus for distribution readiness
- **Distribution Packaging**: Web, offline, and VS Code extension channels
- **Documentation**: Keep action plan updated with progress

### **When Stuck**
- Check if issue is documented in action plan
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
   npm test
   ```

3. Commit changes if appropriate (but only when explicitly requested)

---

**Last Updated**: 2025-07-03 (Phase 3 Complete + Strategic Planning)
**Phase 3 Status**: ✅ COMPLETE - Offline package with local servers
**Repository Status**: ✅ READY - Strategic framework for quality assurance
**Next Session Priority**: Phase 3.5 - Quality Assurance & Distribution Strategy