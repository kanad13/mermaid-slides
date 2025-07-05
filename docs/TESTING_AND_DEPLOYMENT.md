# Testing and Deployment Guide

This guide provides step-by-step instructions for testing the Phase 1 fixes and deploying each distribution channel.

## 🧪 Testing Phase 1 Fixes

### Prerequisites
```bash
# Ensure you have Node.js and npm installed
node --version  # Should be >= 14.0.0
npm --version

# Install dependencies
npm install
npm run extension:install
```

### Fix 1: Web Theme Dropdown Bug

**What was fixed**: Theme selection was offset by one position - selecting "Dark" would apply "Forest", etc.

**How to test**:
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 in your browser
3. Upload a markdown file with mermaid diagrams (or use "Load Sample")
4. Click "View Slides" to enter presentation mode
5. In the top-right header, click the theme dropdown (palette icon)
6. Try selecting different themes:
   - **Default** → Should apply default theme
   - **Dark** → Should apply dark theme (not forest)
   - **Forest** → Should apply forest theme (not base)
   - **Base** → Should apply base theme (not neutral)
   - **Neutral** → Should apply neutral theme

**Expected result**: The selected theme name should match the applied visual theme.

### Fix 2: VS Code Grid View Scrolling

**What was fixed**: Grid view in VS Code extension was missing scrollbars when there were many diagrams.

**How to test**:
1. Build the extension app:
   ```bash
   npm run build:extension-app
   npm run extension:compile
   ```

2. Install the extension locally (see [VS Code Testing Guide](./VSCODE_TESTING_GUIDE.md) for detailed instructions):
   ```bash
   # Method 1: Via VS Code UI (Recommended)
   # Ctrl+Shift+P → "Extensions: Install from VSIX"
   # Select: extension/mermaid-slides-extension-1.0.0.vsix
   
   # Method 2: Command line (if code command is available)
   # code --install-extension extension/mermaid-slides-extension-1.0.0.vsix
   ```

3. Create a test markdown file with many diagrams:
   ```markdown
   # Test File with Many Diagrams
   
   ## Diagram 1
   ```mermaid
   graph TD
       A[Start] --> B[End]
   ```
   
   ## Diagram 2
   ```mermaid
   sequenceDiagram
       A->>B: Message
   ```
   
   ## Diagram 3
   ```mermaid
   pie title Pets
       "Dogs" : 386
       "Cats" : 85
   ```
   
   ## Diagram 4
   ```mermaid
   flowchart LR
       A[Input] --> B[Process] --> C[Output]
   ```
   
   ## Diagram 5
   ```mermaid
   gantt
       title A Gantt Diagram
       dateFormat  YYYY-MM-DD
       section Section
       A task           :a1, 2014-01-01, 30d
   ```
   
   ## Diagram 6
   ```mermaid
   graph TB
       subgraph "System A"
           A1[Component 1]
           A2[Component 2]
       end
   ```
   ```

4. Right-click in the editor and select "🧜‍♀️ Preview Mermaid Slides"
5. Click the grid view button (grid icon) in the top-right
6. **Expected result**: You should be able to scroll through all diagrams in the grid view

**Alternative installation method**:
```bash
# Uninstall if already installed
code --uninstall-extension mermaid-slides.mermaid-slides-extension

# Install from VSIX
code --install-extension extension/mermaid-slides-extension-1.0.0.vsix
```

### Fix 3: Auto-Hide Top Bar Implementation

**What was fixed**: Added configurable auto-hide behavior for the presentation header.

**How to test**:
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 and load some slides
3. Enter presentation mode
4. **Expected result**: After 3 seconds of inactivity, the header should slide up and hide. Moving the mouse or pressing keys should make it reappear.

**Note**: Auto-hide is now enabled by default for the web version. For VS Code extension, it remains disabled to avoid conflicts with VS Code's own UI.

## 🚀 Deployment Instructions

### Web Channel Deployment

**Current Status**: ✅ Automatically deployed via GitHub Actions

**Manual deployment** (if needed):
```bash
# Build for production
npm run build

# The dist/ folder is automatically deployed to GitHub Pages
# Visit: https://kanad13.github.io/mermaid-slides/
```

**Testing deployed version**:
1. Visit https://kanad13.github.io/mermaid-slides/
2. Test the theme dropdown fix as described above

### Offline Package Deployment

**Build offline package**:
```bash
# Build the application
npm run build

# Copy to offline package (if needed)
cp -r dist/* offline-package/
```

**Test offline package**:
```bash
cd offline-package

# Start local server (choose one method):
./start-server.sh              # Unix/macOS
# OR
start-server.bat               # Windows
# OR
python3 start-server.py        # Manual Python
# OR
node start-server.js           # Manual Node.js

# Visit http://localhost:3005
```

**Distribute offline package**:
```bash
# Create distribution archive
cd ..
zip -r mermaid-slides-offline-v1.0.0.zip offline-package/
# OR
tar -czf mermaid-slides-offline-v1.0.0.tar.gz offline-package/
```

### VS Code Extension Deployment

> **📖 For detailed VS Code testing instructions, see [VSCODE_TESTING_GUIDE.md](./VSCODE_TESTING_GUIDE.md)**

**Build extension**:
```bash
npm run build:extension-app
npm run extension:compile
npm run extension:package
```

**Local installation for testing**:

*Method 1: Via VS Code UI (Recommended)*
1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. Type: `Extensions: Install from VSIX...`
4. Navigate to: `extension/mermaid-slides-extension-1.0.0.vsix`
5. Click "Install"

*Method 2: Command line (if available)*
```bash
# For VS Code
code --install-extension extension/mermaid-slides-extension-1.0.0.vsix

# For VS Code Insiders
code-insiders --install-extension extension/mermaid-slides-extension-1.0.0.vsix
```

**Setting up `code` command** (if not available):
1. Open VS Code
2. Press `Ctrl+Shift+P` / `Cmd+Shift+P`
3. Type: `Shell Command: Install 'code' command in PATH`
4. Restart terminal

**Uninstall for testing**:
- Via UI: Extensions panel → Find "🧜‍♀️ Mermaid Slides" → Uninstall
- Via CLI: `code --uninstall-extension mermaid-slides.mermaid-slides-extension`

**Publishing to marketplace** (when ready):
```bash
cd extension

# Login to Visual Studio Marketplace (one-time setup)
npx vsce login mermaid-slides

# Publish to marketplace
npx vsce publish
```

**Pre-publication checklist**:
- [ ] Extension builds without errors (`npm run extension:compile`)
- [ ] VSIX package creates successfully (`npm run extension:package`)
- [ ] Extension installs and loads in VS Code
- [ ] Preview command works with sample markdown files
- [ ] Grid view scrolling works properly
- [ ] Theme selection works correctly
- [ ] Extension can be uninstalled cleanly

## 🔍 Validation Commands

**Run all tests**:
```bash
npm run validate:all
```

**Individual validation**:
```bash
# Run unit tests
npm test

# Check code quality
npm run lint

# Validate cross-platform compatibility
npm run validate:compatibility

# Check project continuity
npm run validate:continuity

# Build all distribution channels
npm run build:all
```

## 🐛 Common Issues and Solutions

### Theme Dropdown Issues
- **Problem**: Themes still seem offset
- **Solution**: Hard refresh browser (Ctrl+Shift+R) to clear cache

### VS Code Extension Issues
- **Problem**: Extension doesn't load
- **Solution**: Check VS Code version (must be >= 1.60.0)
- **Solution**: Reinstall: `code --uninstall-extension mermaid-slides.mermaid-slides-extension && code --install-extension extension/mermaid-slides-extension-1.0.0.vsix`

### Grid View Scrolling Issues
- **Problem**: Still no scrollbars in VS Code
- **Solution**: Try creating more diagrams (need enough to exceed viewport height)
- **Solution**: Check VS Code zoom level (100% recommended)

### Build Issues
- **Problem**: Build fails
- **Solution**: Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

## 📊 Success Verification

After testing, you should be able to confirm:

✅ **Theme Dropdown**: Selecting "Dark" applies dark theme, "Forest" applies forest theme, etc.

✅ **Grid View Scrolling**: In VS Code extension, grid view with many diagrams shows scrollbars and allows scrolling

✅ **Auto-Hide Implementation**: When enabled, header hides after inactivity and reappears on mouse movement

✅ **All Builds Pass**: `npm run build:all` completes without errors

✅ **All Tests Pass**: `npm run validate:all` shows all tests passing

## 📝 Notes

- The auto-hide feature is implemented but disabled by default (can be enabled per-component)
- VS Code extension is fully functional and can be installed locally for testing
- All three distribution channels (web, offline, extension) include the Phase 1 fixes
- The fixes maintain backward compatibility and don't break existing functionality