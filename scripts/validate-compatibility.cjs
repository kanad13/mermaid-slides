#!/usr/bin/env node

// Cross-Platform Compatibility Validation Script
// Tests the offline package across different environments

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Cross-Platform Compatibility Test for Mermaid Slides');
console.log('========================================================');

let testsPasssed = 0;
let testsFailed = 0;

function logSuccess(message) {
    console.log(`✅ ${message}`);
    testsPasssed++;
}

function logError(message) {
    console.log(`❌ ${message}`);
    testsFailed++;
}

function logInfo(message) {
    console.log(`ℹ️  ${message}`);
}

// Test 1: Check if offline package exists
console.log('\n📁 Testing file structure...');
const offlinePackageDir = 'offline-package';
if (fs.existsSync(offlinePackageDir)) {
    logSuccess('Offline package directory found');
} else {
    logError('Offline package directory not found');
    process.exit(1);
}

// Test 2: Check required files exist
const requiredFiles = [
    'offline-package/index.html',
    'offline-package/start-server.py',
    'offline-package/start-server.js',
    'offline-package/start-server.sh',
    'offline-package/start-server.bat',
    'offline-package/README.md'
];

for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
        logSuccess(`Required file exists: ${file}`);
    } else {
        logError(`Missing required file: ${file}`);
    }
}

// Test 3: Check Python availability
console.log('\n🐍 Testing Python compatibility...');
try {
    const pythonVersion = execSync('python3 --version', { encoding: 'utf8' }).trim();
    logSuccess(`Python3 available: ${pythonVersion}`);
    
    // Test Python server script syntax
    try {
        execSync('python3 -m py_compile offline-package/start-server.py', { stdio: 'ignore' });
        logSuccess('Python server script compiles successfully');
    } catch {
        logError('Python server script has syntax errors');
    }
} catch {
    logError('Python3 not available');
}

// Test 4: Check Node.js availability
console.log('\n📦 Testing Node.js compatibility...');
try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    logSuccess(`Node.js available: ${nodeVersion}`);
    
    // Test Node.js server script syntax
    try {
        execSync('node -c offline-package/start-server.js', { stdio: 'ignore' });
        logSuccess('Node.js server script is valid');
    } catch {
        logError('Node.js server script has syntax errors');
    }
} catch {
    logError('Node.js not available');
}

// Test 5: Check asset files exist
console.log('\n🎨 Testing asset files...');
const assetsDir = 'offline-package/assets';
if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir).filter(file => 
        file.endsWith('.js') || file.endsWith('.css')
    );
    if (assetFiles.length > 0) {
        logSuccess(`Found ${assetFiles.length} asset files`);
    } else {
        logError('No asset files found');
    }
} else {
    logError('Assets directory not found');
}

// Test 6: Check HTML file structure
console.log('\n📄 Testing HTML file structure...');
try {
    const htmlContent = fs.readFileSync('offline-package/index.html', 'utf8');
    
    if (htmlContent.includes('mermaid')) {
        logSuccess('HTML file contains mermaid references');
    } else {
        logError('HTML file missing mermaid references');
    }
    
    if (htmlContent.includes('assets/')) {
        logSuccess('HTML file contains asset references');
    } else {
        logError('HTML file missing asset references');
    }
    
    // Check for relative paths (offline compatibility)
    // Exclude SVG namespace declarations and data URLs
    const problematicUrls = htmlContent.match(/(?:href|src)=["']https?:\/\//g);
    if (problematicUrls && problematicUrls.length > 0) {
        logError(`HTML file contains ${problematicUrls.length} absolute URLs (bad for offline)`);
    } else {
        logSuccess('HTML file uses relative paths (good for offline)');
    }
} catch {
    logError('Cannot read HTML file');
}

// Test 7: Check README documentation
console.log('\n📚 Testing documentation...');
try {
    const readmeContent = fs.readFileSync('offline-package/README.md', 'utf8');
    
    if (readmeContent.includes('localhost:3005')) {
        logSuccess('README contains server port information');
    } else {
        logError('README missing server port information');
    }
    
    if (readmeContent.includes('python')) {
        logSuccess('README contains Python instructions');
    } else {
        logError('README missing Python instructions');
    }
    
    if (readmeContent.includes('node')) {
        logSuccess('README contains Node.js instructions');
    } else {
        logError('README missing Node.js instructions');
    }
} catch {
    logError('Cannot read README file');
}

// Test 8: Directory structure validation
console.log('\n📂 Testing directory structure...');
if (fs.existsSync('offline-package/assets')) {
    logSuccess('Assets directory exists');
} else {
    logError('Assets directory missing');
}

if (fs.existsSync('offline-package/examples')) {
    logSuccess('Examples directory exists');
} else {
    logError('Examples directory missing');
}

// Final summary
console.log('\n📊 Test Summary');
console.log('===============');
console.log(`Tests Passed: ${testsPasssed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPasssed + testsFailed}`);

if (testsFailed === 0) {
    console.log('\n🎉 All cross-platform compatibility tests passed!');
    console.log('The offline package is ready for distribution.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some compatibility tests failed.');
    console.log('Please review and fix the issues before distribution.');
    process.exit(1);
}