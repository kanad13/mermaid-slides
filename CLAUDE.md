# Claude Code Session Guide - Mermaid Slides Project

This file contains important context for Claude Code to effectively work on the Mermaid Slides project across multiple sessions.

## 📋 **Project Context**

### **What is Mermaid Slides?**
A React application that transforms markdown files containing Mermaid diagrams into presentation slides with navigation, theming, and multiple view modes.

### **Current State (as of 2025-06-30)**
- **Working Features**: File upload, diagram parsing, presentation mode, navigation, theming
- **Architecture**: Partially modularized (new structure alongside legacy code)
- **Key Issue**: Legacy `MermaidSlides.jsx` (400+ lines) coexists with new modular components

## 🚨 **Critical Information**

### **Start Commands**
```bash
# Development server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

### **Key Files to Understand**
- `src/App.jsx` - New main application component
- `src/MermaidSlides.jsx` - ⚠️ LEGACY - Scheduled for removal
- `src/components/` - New modular structure (partially complete)
- `IMPROVEMENT_PLAN.md` - **CRITICAL**: Current improvement tracking and plan
- `PROJECT_REQUIREMENTS.md` - Original project requirements (historical reference)

## 📊 **Current Improvement Process**

### **Active Plan**: See `IMPROVEMENT_PLAN.md`
**Current Phase**: Phase 1 - Foundation Cleanup
**Priority**: Remove legacy code, update dependencies, fix docs

### **Progress Tracking**
Always check and update `IMPROVEMENT_PLAN.md`:
- Mark tasks as completed ✅
- Update progress sections
- Note any blockers or issues
- Update "Last Updated" timestamp

## 🛠️ **Development Guidelines**

### **Before Making Changes**
1. Read `IMPROVEMENT_PLAN.md` to understand current priorities
2. Check which phase we're in
3. Identify specific tasks to work on
4. Update task status to "in progress"

### **When Making Changes**
1. Test functionality before and after changes
2. Run `npm run lint` to check code quality
3. Update relevant documentation
4. Mark tasks as complete in `IMPROVEMENT_PLAN.md`

### **Key Principles**
- **Preserve Functionality**: Never break existing features
- **Incremental Progress**: Complete one phase before moving to next
- **Update Documentation**: Keep improvement plan current
- **Test Changes**: Verify everything works after modifications

## 📦 **Dependency Issues (Critical)**

### **Major Updates Needed** (as of 2025-06-30)
- React: 18.2.0 → 19.1.0 (⚠️ Breaking changes expected)
- Mermaid: 10.6.1 → 11.7.0 (⚠️ API changes likely)
- Vite: 5.4.0 → 7.0.0 (⚠️ Config changes needed)
- Tailwind: 3.4.0 → 4.1.11 (⚠️ CSS changes)

**Important**: Update one major dependency at a time and test thoroughly.

## 🏗️ **Architecture Notes**

### **Current Structure Issues**
- Two parallel implementations (old vs new) - confusing and redundant
- Incomplete component modularization
- Mixed coding patterns

### **Target Architecture**
- Fully modular components (max 100 lines each)
- Custom hooks for reusable logic
- TypeScript for type safety
- Comprehensive testing

## 🧪 **Testing Status**
- **Current**: No tests exist
- **Target**: 80%+ coverage with Vitest + React Testing Library
- **Priority**: Set up after Phase 1 (Foundation Cleanup)

## 📚 **Documentation Issues**

### **Known Problems**
- README says start with `python -m http.server` but should be `npm run dev`
- Various command examples throughout docs are incorrect
- PROJECT_REQUIREMENTS.md describes work as "to be done" but partially exists

### **Fix Strategy**
Update all documentation as part of Phase 1 cleanup.

## 🚀 **Quick Start for New Session**

1. **Check Current Status**:
   ```bash
   # Check if dependencies are up to date
   npm outdated
   
   # Check current project state
   npm run dev
   ```

2. **Review Progress**:
   - Read `IMPROVEMENT_PLAN.md` thoroughly
   - Check which phase we're in
   - Identify next priority tasks

3. **Start Working**:
   - Update task status to "in progress" in improvement plan
   - Make incremental changes
   - Test frequently
   - Update documentation

## 💡 **Tips for Effective Sessions**

### **Understanding the Codebase**
- Look at `src/App.jsx` for current architecture
- Avoid modifying `src/MermaidSlides.jsx` (legacy - will be deleted)
- Check `src/components/` for new modular structure

### **Common Tasks**
- **Dependency Updates**: Check for breaking changes first
- **Code Refactoring**: Maintain functionality while improving structure
- **Documentation**: Keep improvement plan updated with progress

### **When Stuck**
- Check if issue is documented in improvement plan
- Look for similar patterns in existing code
- Test changes incrementally

## 🔄 **Session Handoff**

### **At End of Session**
1. Update `IMPROVEMENT_PLAN.md` with:
   - Completed tasks ✅
   - Any new issues discovered
   - Current progress status
   - Next priority items

2. Test that current state works:
   ```bash
   npm run dev
   npm run build
   npm run lint
   ```

3. Commit changes if appropriate (but only when explicitly requested)

---

**Last Updated**: 2025-06-30
**Next Session Priority**: Phase 1 - Foundation Cleanup