#!/bin/bash

# Cross-Platform Compatibility Test Script
# Tests the offline package across different server configurations

set -e

echo "🧪 Cross-Platform Compatibility Test for Mermaid Slides"
echo "========================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

log_success() {
    printf "${GREEN}✅ %s${NC}\n" "$1"
    ((TESTS_PASSED++))
}

log_error() {
    printf "${RED}❌ %s${NC}\n" "$1"
    ((TESTS_FAILED++))
}

log_info() {
    printf "${YELLOW}ℹ️  %s${NC}\n" "$1"
}

# Check if offline package exists
if [ ! -d "offline-package" ]; then
    log_error "Offline package directory not found"
    exit 1
fi

log_success "Offline package directory found"

# Test 1: Check required files exist
printf "\n📁 Testing file structure...\n"
required_files=(
    "offline-package/index.html"
    "offline-package/start-server.py"
    "offline-package/start-server.js"
    "offline-package/start-server.sh"
    "offline-package/start-server.bat"
    "offline-package/README.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "Required file exists: $file"
    else
        log_error "Missing required file: $file"
    fi
done

# Test 2: Check server scripts are executable
printf "\n🔧 Testing server script permissions...\n"
if [ -x "offline-package/start-server.sh" ]; then
    log_success "start-server.sh is executable"
else
    log_error "start-server.sh is not executable"
fi

# Test 3: Check Python availability and version
echo -e "\n🐍 Testing Python compatibility..."
if command -v python3 &> /dev/null; then
    python_version=$(python3 --version 2>&1)
    log_success "Python3 available: $python_version"
    
    # Test Python server syntax
    if python3 -m py_compile offline-package/start-server.py 2>/dev/null; then
        log_success "Python server script compiles successfully"
    else
        log_error "Python server script has syntax errors"
    fi
else
    log_error "Python3 not available"
fi

# Test 4: Check Node.js availability and version
echo -e "\n📦 Testing Node.js compatibility..."
if command -v node &> /dev/null; then
    node_version=$(node --version)
    log_success "Node.js available: $node_version"
    
    # Test Node.js server syntax
    if node -c offline-package/start-server.js 2>/dev/null; then
        log_success "Node.js server script is valid"
    else
        log_error "Node.js server script has syntax errors"
    fi
else
    log_error "Node.js not available"
fi

# Test 5: Check asset files exist
echo -e "\n🎨 Testing asset files..."
asset_count=$(find offline-package/assets -name "*.js" -o -name "*.css" | wc -l)
if [ "$asset_count" -gt 0 ]; then
    log_success "Found $asset_count asset files"
else
    log_error "No asset files found"
fi

# Test 6: Check HTML file structure
echo -e "\n📄 Testing HTML file structure..."
if grep -q "mermaid" offline-package/index.html; then
    log_success "HTML file contains mermaid references"
else
    log_error "HTML file missing mermaid references"
fi

if grep -q "assets/" offline-package/index.html; then
    log_success "HTML file contains asset references"
else
    log_error "HTML file missing asset references"
fi

# Test 7: Check README documentation
echo -e "\n📚 Testing documentation..."
readme_file="offline-package/README.md"
if [ -f "$readme_file" ]; then
    if grep -q "localhost:3005" "$readme_file"; then
        log_success "README contains server port information"
    else
        log_error "README missing server port information"
    fi
    
    if grep -q "python" "$readme_file"; then
        log_success "README contains Python instructions"
    else
        log_error "README missing Python instructions"
    fi
    
    if grep -q "node" "$readme_file"; then
        log_success "README contains Node.js instructions"
    else
        log_error "README missing Node.js instructions"
    fi
else
    log_error "README.md not found in offline package"
fi

# Test 8: Platform-specific script tests
echo -e "\n🖥️  Testing platform-specific scripts..."

# Test Windows batch file syntax (basic check)
if [ -f "offline-package/start-server.bat" ]; then
    if grep -q "@echo off" offline-package/start-server.bat; then
        log_success "Windows batch file has proper header"
    else
        log_error "Windows batch file missing proper header"
    fi
else
    log_error "Windows batch file not found"
fi

# Test Unix shell script syntax
if [ -f "offline-package/start-server.sh" ]; then
    if bash -n offline-package/start-server.sh 2>/dev/null; then
        log_success "Unix shell script syntax is valid"
    else
        log_error "Unix shell script has syntax errors"
    fi
else
    log_error "Unix shell script not found"
fi

# Test 9: Check for relative paths (offline compatibility)
echo -e "\n🔗 Testing path structure for offline compatibility..."
if grep -q "http://" offline-package/index.html; then
    log_error "HTML file contains absolute HTTP URLs (bad for offline)"
else
    log_success "HTML file uses relative paths (good for offline)"
fi

if grep -q "https://" offline-package/index.html; then
    log_error "HTML file contains absolute HTTPS URLs (bad for offline)"
else
    log_success "HTML file avoids external HTTPS dependencies"
fi

# Test 10: Directory structure validation
echo -e "\n📂 Testing directory structure..."
if [ -d "offline-package/assets" ]; then
    log_success "Assets directory exists"
else
    log_error "Assets directory missing"
fi

if [ -d "offline-package/examples" ]; then
    log_success "Examples directory exists"
else
    log_error "Examples directory missing"
fi

# Final summary
echo -e "\n📊 Test Summary"
echo "==============="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo -e "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All cross-platform compatibility tests passed!${NC}"
    echo -e "The offline package is ready for distribution."
    exit 0
else
    echo -e "\n${RED}⚠️  Some compatibility tests failed.${NC}"
    echo -e "Please review and fix the issues before distribution."
    exit 1
fi