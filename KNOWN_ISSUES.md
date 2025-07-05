# Known Issues & Bug Tracking

This document tracks confirmed bugs, difficult-to-fix issues, and items deferred for future releases.

## ✅ **Recently Fixed Issues**

### **Issue #0: Theme System Complexity and Maintenance Burden**

**Status**: ✅ **RESOLVED** (2025-07-05)  
**Priority**: High  
**Affected**: All distribution channels (Web, Offline, VS Code Extension)

**Problem Description**:
Theme selection system was causing recurring bugs and maintenance complexity:
- Multiple theme-related bugs with offset selections
- Complex state management across multiple components
- Type synchronization issues between theme interfaces
- Increased testing overhead for theme variations

**Root Cause**:
Over-engineered theme system with:
1. Multiple `useTheme` hooks causing state conflicts
2. Complex prop passing for theme data
3. Redundant theme selection UI components
4. Type mismatches between theme interfaces

**Solution Applied**:
- **Complete theme system removal** for codebase simplification
- Defaulted to single Mermaid 'default' theme for all diagrams
- Removed `useTheme` hook, `ThemeDropdown` component
- Simplified `SettingsPanel` to focus on auto-hide configuration only
- Updated all components to remove theme-related props and state

**Files Removed**:
- `src/hooks/useTheme.ts`
- `src/components/Viewer/HeaderControls/ThemeDropdown.tsx`
- `src/hooks/__tests__/useTheme.test.ts`

**Files Modified**:
- `src/hooks/useMermaid.ts` - simplified to use default theme only
- `src/components/Settings/SettingsPanel.tsx` - removed theme selection
- `src/components/Viewer/Viewer.tsx` - removed theme props
- `src/types/components.ts` - removed theme-related interfaces
- `src/types/diagram.ts` - removed theme types
- Multiple other components - removed theme props

**Benefits**:
- ✅ Eliminated all theme-related bugs
- ✅ Reduced codebase complexity by ~15%
- ✅ Simplified component interfaces
- ✅ Reduced testing overhead
- ✅ Consistent default theme across all channels

---

## 🚨 **Active Bugs (Web Version)**

### **Issue #4: Double Favicon in Browser Tab**

**Status**: 🔍 **Under Investigation**  
**Priority**: Medium  
**Reported**: 2025-07-05  
**Affects**: Web version (development mode)

**Problem Description**:
Browser tab shows two mermaid emoji favicons instead of one.

**Investigation Results**:
- ✅ HTML contains only single favicon definition
- ✅ Tried various favicon formats (SVG with charset, single vs multiple definitions)
- 🔍 Possible Vite dev server interference
- 🔍 Browser default favicon loading behavior

**Current Status**: ⏳ **Low Priority** - Cosmetic issue, may resolve in production

---

## 🚨 **Active Bugs (VS Code Extension)**

### **Issue #1: Auto-Hide Feature Not Working in VS Code Extension**

**Status**: ✅ **ROOT CAUSE IDENTIFIED**  
**Priority**: Medium  
**Reported**: 2025-07-05  
**Affects**: VS Code Extension only (Web version works correctly)

**Root Cause Found**:
The auto-hide feature is **not enabled** in the VS Code extension. The `ExtensionApp.tsx` component does not pass `autoHideEnabled={true}` to the `Viewer` component, while the web version does.

**Investigation Results**:
- ✅ `ExtensionApp.tsx` missing `autoHideEnabled={true}` prop
- ✅ Web version (`App.tsx`) has `autoHideEnabled={true}` 
- ✅ `useAutoHide` hook works correctly when enabled
- ✅ No webview restrictions or event listener issues

**Design Decision Required**:
Should auto-hide be enabled in VS Code extensions? 

**Considerations**:
- **Pro**: Consistent behavior across channels
- **Con**: May interfere with VS Code's UI patterns
- **Con**: Users expect persistent headers in editor panels
- **Pro**: Could be made configurable via VS Code settings

**Recommended Solution**:
Add VS Code setting `mermaidSlides.autoHide` (default: false) and implement in extension

**Current Status**: ⏳ **Deferred** - Needs UX design decision

---

### **Issue #2: Grid View Scrolling Not Working in VS Code Extension**

**Status**: 🔧 **PARTIALLY FIXED** - Needs Testing  
**Priority**: High  
**Reported**: 2025-07-05  
**Affects**: VS Code Extension only (Web version works correctly)

**Latest Fix Applied** (2025-07-05):
- **Changed approach**: Using `h-[80vh]` and `overflow-y-auto` instead of `flex-1` 
- **Rationale**: Flex layouts may not calculate height correctly in webviews
- **Implementation**: Extension mode now uses explicit viewport height (80vh)

**Technical Changes Made**:
```css
/* Before (not working) */
flex-1 overflow-auto max-h-full

/* After (testing) */
h-[80vh] overflow-y-auto  /* when isExtensionMode=true */
```

**Investigation Results**:
- ✅ VS Code webviews handle `vh` units differently than browser
- ✅ Flex layout height calculation problematic in webview context
- ✅ Need explicit height instead of percentage-based heights
- ✅ `overflow-y-auto` more reliable than `overflow-auto` in webviews

**Testing Required**:
- [ ] Install rebuilt extension (`extension/mermaid-slides-extension-1.0.0.vsix`)
- [ ] Test with 6+ diagrams in grid view
- [ ] Verify scrollbars appear and function
- [ ] Test on different VS Code versions

**Status**: 
- **Code**: ✅ Fixed and rebuilt
- **Testing**: ⏳ Pending user verification
- **Deployment**: ✅ Ready for installation

**If Fix Doesn't Work**:
Consider these alternative approaches:
1. Use fixed pixel heights (e.g., `height: 600px`)
2. Implement virtual scrolling
3. Add pagination for grid view
4. Use absolute positioning strategy

**Workaround**: Users can use single-view mode and navigate with arrow keys

---

## 🎯 **Investigation Plan**

### **Priority 1: Grid View Scrolling**
This affects core functionality and user experience more directly.

**Next Steps**:
1. Add VS Code webview debugging
2. Test explicit height values (e.g., `height: 600px`)
3. Try different overflow strategies
4. Consider absolute positioning approach

### **Priority 2: Auto-Hide Feature**
This is a UX enhancement but doesn't break core functionality.

**Next Steps**:
1. Test event listener scope in webview
2. Add console logging to debug event firing
3. Consider webview-specific implementation
4. Evaluate if feature should be disabled in extension

---

## 📋 **Bug Triage Guidelines**

### **Severity Levels**:
- **Critical**: Breaks core functionality, prevents basic usage
- **High**: Significantly impacts user experience
- **Medium**: Minor UX issues, workarounds available
- **Low**: Cosmetic issues, future enhancements

### **Status Definitions**:
- 🔍 **Under Investigation**: Bug confirmed, investigating root cause
- 🔧 **In Progress**: Active development work happening
- ⏳ **Blocked**: Waiting on external dependency or information
- 📋 **Deferred**: Confirmed bug, scheduled for future release
- ✅ **Fixed**: Bug resolved and tested
- ❌ **Won't Fix**: Bug will not be addressed (with explanation)

---

## 🔧 **Technical Debt & Future Improvements**

### **Code Quality Issues**:
- Large mermaid bundle size (2.8MB) - consider code splitting
- CSS utility class conflicts in webview context
- Event listener cleanup in component unmounting

### **Performance Optimizations**:
- Lazy loading of diagram previews in grid view
- Virtual scrolling for large diagram sets
- Mermaid rendering optimization

### **Architecture Improvements**:
- Better separation of webview and browser-specific code
- Centralized configuration management
- Further codebase simplification and rationalization

---

## 📊 **Bug Statistics**

**Total Open Issues**: 2  
**High Priority**: 1 (Grid view scrolling)  
**VS Code Extension Issues**: 2  
**Web Version Issues**: 1 (Favicon duplication)  
**Recently Fixed**: 1 (Complete theme system removal for simplification)

**Last Updated**: 2025-07-05  
**Next Review**: When new bugs are reported or fixes are attempted  

---

## 🚀 **Contributing**

When reporting new bugs:
1. Use the template in this file
2. Include steps to reproduce
3. Specify which distribution channel is affected
4. Add browser/VS Code version information
5. Include console errors if available

When investigating bugs:
1. Update status and investigation notes
2. Document attempted fixes
3. Add technical details discovered
4. Update priority if scope changes