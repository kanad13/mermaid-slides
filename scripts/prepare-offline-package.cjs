#!/usr/bin/env node
/**
 * Prepare offline package by copying server scripts and examples
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..');
const offlineDir = path.join(sourceDir, 'offline-package');

// Files to copy to the offline package
const filesToCopy = [
    { src: 'public/favicon.ico', dest: 'favicon.ico' },
    { src: 'public/offline-template/start-server.py', dest: 'start-server.py' },
    { src: 'public/offline-template/start-server.js', dest: 'start-server.js' },
    { src: 'public/offline-template/start-server.sh', dest: 'start-server.sh' },
    { src: 'public/offline-template/start-server.bat', dest: 'start-server.bat' },
    { src: 'public/offline-template/README.md', dest: 'README.md' }
];

// Directories to copy
const dirsToCopy = [
    { src: 'public/examples', dest: 'examples' }
];

console.log('📦 Preparing offline package...');

// Declare the package as CommonJS.
//
// start-server.js uses require(). Node decides module type from the nearest
// package.json, so when the built package sits inside this repository — whose
// package.json says "type": "module" — Node treats the script as an ES module
// and it dies on the first require(). Extracted from the release archive there
// is no parent package.json, Node defaults to CommonJS, and it works. That gap
// meant one of the four documented start commands could never be tested in
// place. Writing this file makes the package say what it is rather than
// depending on where it happens to sit.
fs.writeFileSync(
    path.join(offlineDir, 'package.json'),
    JSON.stringify(
        {
            name: 'mermaid-slides-offline',
            private: true,
            type: 'commonjs',
            description: 'Offline distribution of Mermaid Slides. Run start-server.js or start-server.py.'
        },
        null,
        2
    ) + '\n'
);
console.log('📄 Writing package.json (type: commonjs)');

// Copy files
filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(sourceDir, src);
    const destPath = path.join(offlineDir, dest);
    
    if (fs.existsSync(srcPath)) {
        console.log(`📄 Copying ${src} → ${dest}`);
        fs.copyFileSync(srcPath, destPath);
        
        // Make shell scripts executable
        if (dest.endsWith('.sh') || dest.endsWith('.py')) {
            try {
                fs.chmodSync(destPath, 0o755);
            } catch (error) {
                console.warn(`⚠️  Could not make ${dest} executable:`, error.message);
            }
        }
    } else {
        console.warn(`⚠️  Source file not found: ${src}`);
    }
});

// Copy directories
dirsToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(sourceDir, src);
    const destPath = path.join(offlineDir, dest);
    
    if (fs.existsSync(srcPath)) {
        console.log(`📁 Copying directory ${src} → ${dest}`);
        copyDir(srcPath, destPath);
    } else {
        console.warn(`⚠️  Source directory not found: ${src}`);
    }
});

console.log('✅ Offline package prepared successfully!');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    
    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        
        if (fs.statSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}