# Mermaid Slides - Project Requirements & Implementation Guide

## 📊 Project Overview

**Project Name**: Mermaid Slides
**Current Status**: Phase 5B Partially Complete (Modular Components Started)
**Target**: Professional multi-distribution application
**Tech Stack**: React, Tailwind CSS, Mermaid.js

> ⚠️ **STATUS UPDATE**: This document represents the original project plan. For current improvement tracking and implementation progress, see [IMPROVEMENT_PLAN.md](./IMPROVEMENT_PLAN.md)

## 🎯 Project Goals

1. **Transform single React component** into maintainable, modular application
2. **Create multiple distribution channels** (web, offline, future VS Code extension)
3. **Implement professional code standards** and documentation
4. **Optimize for performance** and user experience

## 📋 Current State Analysis

### ✅ **Working Features**

- Markdown parsing and mermaid diagram extraction
- File upload (drag & drop, file picker)
- Presentation mode with navigation (arrows, home/end, thumbnails)
- Grid view for diagram overview
- Dark/light mode toggle
- 5 Mermaid theme options
- Visual progress tracking
- Responsive design

### ❌ **Technical Debt**

- Single 400+ line React component
- All logic in one file
- External CDN dependencies
- No TypeScript types
- Limited error handling
- No test coverage
- No proper state management patterns

## 🏗️ Implementation Phases

### **Phase 5B: Code Architecture & Best Practices**

#### **5B.1: Component Modularization**

```
src/
├── components/
│   ├── Editor/
│   │   ├── FileUpload.tsx
│   │   ├── MarkdownInput.tsx
│   │   ├── ThemeControls.tsx
│   │   └── DiagramParser.tsx
│   ├── Presentation/
│   │   ├── PresentationView.tsx
│   │   ├── DiagramDisplay.tsx
│   │   ├── NavigationControls.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ThumbnailStrip.tsx
│   │   └── GridView.tsx
│   ├── Common/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorBoundary.tsx
│   └── App.tsx
├── hooks/
│   ├── useMermaidRenderer.ts
│   ├── useFileHandler.ts
│   ├── useKeyboardNavigation.ts
│   ├── useTheme.ts
│   └── useDiagramParser.ts
├── utils/
│   ├── mermaidUtils.ts
│   ├── fileUtils.ts
│   ├── diagramUtils.ts
│   └── constants.ts
├── types/
│   ├── diagram.ts
│   ├── theme.ts
│   └── file.ts
└── styles/
    └── globals.css
```

#### **5B.2: Custom Hooks Implementation**

- **useMermaidRenderer**: Handle mermaid initialization, rendering, and theme changes
- **useFileHandler**: Manage file uploads, drag & drop, and content processing
- **useKeyboardNavigation**: Centralize keyboard event handling
- **useTheme**: Manage dark/light mode and mermaid theme state
- **useDiagramParser**: Extract and process mermaid diagrams from markdown

#### **5B.3: TypeScript Integration**

```typescript
// Core Types
interface Diagram {
	id: string;
	code: string;
	type: DiagramType;
	svg?: string;
}

interface AppState {
	diagrams: Diagram[];
	currentIndex: number;
	isViewMode: boolean;
	isGridView: boolean;
	theme: ThemeState;
}

enum DiagramType {
	FLOWCHART = "flowchart",
	SEQUENCE = "sequence",
	ER = "er",
	CLASS = "class",
	STATE = "state",
	GANTT = "gantt",
}
```

#### **5B.4: Error Handling & Validation**

- React Error Boundaries for component crashes
- File validation and error messaging
- Mermaid rendering error recovery
- Network failure handling
- User-friendly error states

### **Phase 5C: Web Deployment Version**

#### **5C.1: Build Configuration**

```
dist/web/
├── index.html (single file with inlined assets)
├── manifest.json (PWA support)
├── service-worker.js (offline caching)
└── favicon/
```

#### **5C.2: Optimization Features**

- Minified and bundled code
- CDN resource optimization
- Meta tags for SEO and social sharing
- Progressive Web App capabilities
- Performance monitoring

#### **5C.3: Deployment Ready**

- GitHub Pages compatible
- Cloudflare Pages ready
- Vercel/Netlify optimized
- Custom domain support

### **Phase 5D: Offline/Local Version**

#### **5D.1: Bundled Dependencies**

```
offline/
├── index.html
├── lib/
│   ├── mermaid.min.js (bundled locally)
│   ├── react.production.min.js
│   └── tailwind.min.css
└── README.md (offline setup instructions)
```

#### **5D.2: Self-Contained Features**

- No external network calls
- Bundled Mermaid.js library (~200KB)
- Inlined Tailwind CSS
- Local development server setup
- Privacy-focused (no analytics/tracking)

### **Phase 5E: Final Polish & Distribution**

#### **5E.1: Performance Optimization**

- Lazy loading for large diagram sets
- Virtual scrolling for grid view
- Debounced theme changes
- Memory management for SVG rendering

#### **5E.2: Cross-Browser Testing**

- Chrome/Edge/Firefox compatibility
- Safari-specific fixes
- Mobile browser optimizations
- Accessibility improvements

## 🔧 Technical Specifications

### **Code Standards**

- **ESLint**: Airbnb configuration with React hooks
- **Prettier**: Standard formatting rules
- **TypeScript**: Strict mode enabled
- **Comments**: JSDoc for all public functions
- **Naming**: camelCase for variables, PascalCase for components

### **Performance Targets**

- **Initial Load**: < 3 seconds on 3G
- **Diagram Rendering**: < 500ms per diagram
- **Navigation**: < 100ms response time
- **Bundle Size**: < 1MB total (web version)

### **Browser Support**

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Graceful Degradation**: Basic functionality on older browsers

### **Accessibility Requirements**

- **WCAG 2.1 AA** compliance
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Clear focus indicators

## 🧪 Testing Strategy

### **Unit Tests** (Future Phase)

- Component rendering tests
- Hook functionality tests
- Utility function tests
- Error handling validation

### **Integration Tests** (Future Phase)

- File upload workflows
- Diagram rendering pipeline
- Navigation flow testing
- Theme switching validation

### **E2E Tests** (Future Phase)

- Complete user workflows
- Cross-browser compatibility
- Performance benchmarking
- Accessibility auditing

## 📦 Distribution Channels

### **1. Web Application**

- **URL**: `https://mermaid-slides.com` (or GitHub Pages)
- **Features**: Full functionality, CDN optimized
- **Target**: General users, quick access
- **Updates**: Automatic via deployment

### **2. GitHub Repository**

- **Target**: Developers, contributors, self-hosting
- **Features**: Source code, documentation, issues
- **Setup**: Clone and run locally
- **Customization**: Fork and modify

### **3. Offline Package**

- **Target**: Privacy-conscious users, air-gapped environments
- **Features**: Complete self-contained package
- **Distribution**: GitHub releases, zip download
- **Security**: No external network calls

### **4. VS Code Extension** (Future)

- **Target**: Developers working with markdown
- **Features**: Direct integration with editor
- **Distribution**: VS Code Marketplace
- **Workflow**: Right-click markdown → "Open in Mermaid Slides"

## 🎯 Success Metrics

### **Technical Metrics**

- ✅ Zero external dependencies (offline version)
- ✅ < 100ms navigation response time
- ✅ < 3 second initial load time
- ✅ Zero accessibility violations

### **User Experience Metrics**

- ✅ One-click deployment to major platforms
- ✅ < 30 seconds from file to presentation
- ✅ Mobile-responsive design
- ✅ Offline functionality

### **Code Quality Metrics**

- ✅ 90%+ test coverage (future)
- ✅ Zero ESLint errors/warnings
- ✅ Modular architecture (max 100 lines per component)
- ✅ Full TypeScript coverage

## 🚀 Implementation Priority

### **Immediate (Phase 5B)**

1. Component modularization
2. Custom hooks extraction
3. TypeScript type definitions
4. Error boundary implementation

### **Next (Phase 5C)**

1. Build process setup
2. Web deployment optimization
3. PWA features
4. Performance monitoring

### **Following (Phase 5D)**

1. Dependency bundling
2. Offline package creation
3. Local development setup
4. Privacy features

### **Final (Phase 5E)**

1. Cross-browser testing
2. Performance optimization
3. Accessibility audit
4. Documentation completion

## 📝 Notes for Claude Code

### **Key Considerations**

1. **Preserve all existing functionality** during refactoring
2. **Maintain backward compatibility** with current usage patterns
3. **Focus on modularity** without over-engineering
4. **Prioritize user experience** over code perfection
5. **Document breaking changes** clearly

### **Implementation Approach**

1. **Incremental refactoring** - one component at a time
2. **Test each change** to ensure functionality preservation
3. **Update imports/exports** systematically
4. **Maintain consistent patterns** across components
5. **Add TypeScript gradually** without breaking existing code

### **Common Pitfalls to Avoid**

- Breaking existing state management
- Losing keyboard navigation functionality
- Breaking theme switching
- Interfering with mermaid rendering
- Disrupting file upload workflows

This document provides the complete roadmap for transforming Mermaid Slides from a prototype into a professional, distributable application.
