#!/usr/bin/env node

// Continuity Validation Script
// Ensures all strategic documents are properly linked and accessible

const fs = require('fs');
const path = require('path');

console.log('🔗 Continuity Validation for Mermaid Slides');
console.log('===========================================');

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

// Test 1: Check key documentation files exist
console.log('\n📋 Checking documentation files...');
const docs = [
    'README.md',
    'AGENTS.md',
    'docs/DEPLOYMENT.md',
    'docs/CONTRIBUTING.md'
];

for (const doc of docs) {
    if (fs.existsSync(doc)) {
        logSuccess(`Documentation exists: ${doc}`);
    } else {
        logError(`Missing documentation: ${doc}`);
    }
}

// Test 2: Check AGENTS.md references key documents
console.log('\n📝 Checking AGENTS.md references...');
try {
    const agentsContent = fs.readFileSync('AGENTS.md', 'utf8');

    const requiredReferences = [
        'docs/DEPLOYMENT.md',
        'docs/CONTRIBUTING.md',
        'scripts/validate-compatibility.cjs'
    ];

    for (const ref of requiredReferences) {
        if (agentsContent.includes(ref)) {
            logSuccess(`AGENTS.md references: ${ref}`);
        } else {
            logError(`AGENTS.md missing reference: ${ref}`);
        }
    }

} catch {
    logError('Cannot read AGENTS.md');
}

// Test 3: Check README.md exists and is readable
console.log('\n🏠 Checking README.md...');
try {
    const readmeContent = fs.readFileSync('README.md', 'utf8');

    if (readmeContent.length > 0) {
        logSuccess('README.md is readable and has content');
    } else {
        logError('README.md is empty');
    }
} catch {
    logError('Cannot read README.md');
}

// Test 5: Check validation scripts are executable
console.log('\n🔧 Checking validation scripts...');
const validationScripts = [
    'scripts/validate-compatibility.cjs',
    'scripts/validate-continuity.cjs'
];

for (const script of validationScripts) {
    if (fs.existsSync(script)) {
        logSuccess(`Validation script exists: ${script}`);
    } else {
        logError(`Missing validation script: ${script}`);
    }
}

// Test 6: Check documentation structure consistency
console.log('\n🔄 Checking documentation structure...');
try {
    const deploymentExists = fs.existsSync('docs/DEPLOYMENT.md');
    const contributingExists = fs.existsSync('docs/CONTRIBUTING.md');
    const agentsExists = fs.existsSync('AGENTS.md');

    if (deploymentExists && contributingExists && agentsExists) {
        logSuccess('All core documentation files present');
    } else {
        logError('Missing core documentation files');
    }
} catch {
    logError('Cannot verify documentation structure');
}

// Final summary
console.log('\n📊 Continuity Validation Summary');
console.log('================================');
console.log(`Tests Passed: ${testsPasssed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPasssed + testsFailed}`);

if (testsFailed === 0) {
    console.log('\n🎉 All continuity validation tests passed!');
    console.log('Documentation structure is consistent and complete.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some continuity validation tests failed.');
    console.log('Please review and fix the documentation issues.');
    process.exit(1);
}