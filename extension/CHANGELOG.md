# Change Log

All notable changes to the Mermaid Slides VS Code extension will be documented in this file.

## [1.0.0] - 2025-07-04

### Added
- Initial release of Mermaid Slides VS Code Extension
- Preview command for transforming markdown mermaid diagrams into slides
- Right-click context menu integration for markdown files
- Command palette integration
- Editor title bar button for quick access
- Configuration options for themes and auto-detection
- Webview-based presentation display
- Auto-detection of mermaid diagrams in markdown files

### Features
- **Preview Mermaid Slides Command**: Main functionality to preview slides
- **Context Menu Integration**: Right-click on markdown files to access preview
- **Theme Support**: Multiple theme options (light, dark, neutral, base, forest, default)
- **Auto-Detection**: Automatically detects mermaid diagrams in markdown files
- **Configuration**: Customizable settings for user preferences

### Technical Implementation
- TypeScript-based extension development
- Webview provider for embedding React application
- Message passing between extension and webview
- Configuration management through VS Code settings
- Proper Content Security Policy implementation

## [Unreleased]

### Planned
- Full React application embedding (currently placeholder)
- Enhanced keyboard shortcuts within presentations
- Export functionality for presentations
- Better error handling and user feedback
- Performance optimizations
- Additional theme customization options

---

## Development Notes

This extension is part of the larger Mermaid Slides project ecosystem:
- **Web Channel**: Live at https://kanad13.github.io/mermaid-slides/
- **Offline Package**: Self-contained local distribution
- **VS Code Extension**: This extension for IDE integration

The extension follows the single-repository architecture strategy, sharing core functionality with the web and offline distributions while providing VS Code-specific integration features.