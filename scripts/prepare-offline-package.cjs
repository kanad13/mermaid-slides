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