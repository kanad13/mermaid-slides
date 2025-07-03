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

// Test 1: Check key strategic documents exist
console.log('\n📋 Checking strategic documents...');
const strategicDocs = [
    'docs/ACTION_PLAN.md',
    'docs/ARCHITECTURE_STRATEGY.md',
    'docs/DISTRIBUTION_GUIDE.md',
    'docs/VERSIONING.md',
    'docs/DEPENDENCY_MANAGEMENT.md'
];

for (const doc of strategicDocs) {
    if (fs.existsSync(doc)) {
        logSuccess(`Strategic document exists: ${doc}`);
    } else {
        logError(`Missing strategic document: ${doc}`);
    }
}

// Test 2: Check CLAUDE.md references all key documents
console.log('\n📝 Checking CLAUDE.md references...');
try {
    const claudeContent = fs.readFileSync('CLAUDE.md', 'utf8');
    
    const requiredReferences = [
        'docs/ACTION_PLAN.md',
        'docs/ARCHITECTURE_STRATEGY.md',
        'docs/DISTRIBUTION_GUIDE.md',
        'scripts/validate-compatibility.cjs'
    ];
    
    for (const ref of requiredReferences) {
        if (claudeContent.includes(ref)) {
            logSuccess(`CLAUDE.md references: ${ref}`);
        } else {
            logError(`CLAUDE.md missing reference: ${ref}`);
        }
    }
    
    // Check for Phase 4 readiness indicators
    if (claudeContent.includes('Phase 4')) {
        logSuccess('CLAUDE.md indicates Phase 4 readiness');
    } else {
        logError('CLAUDE.md missing Phase 4 readiness indicators');
    }
    
} catch {
    logError('Cannot read CLAUDE.md');
}

// Test 3: Check README.md links to strategic documents
console.log('\n🏠 Checking README.md strategic links...');
try {
    const readmeContent = fs.readFileSync('README.md', 'utf8');
    
    const strategicLinks = [
        'docs/ARCHITECTURE_STRATEGY.md',
        'docs/DISTRIBUTION_GUIDE.md',
        'docs/ACTION_PLAN.md'
    ];
    
    for (const link of strategicLinks) {
        if (readmeContent.includes(link)) {
            logSuccess(`README.md links to: ${link}`);
        } else {
            logError(`README.md missing link: ${link}`);
        }
    }
} catch {
    logError('Cannot read README.md');
}

// Test 4: Check ACTION_PLAN.md shows Phase 3.5 complete
console.log('\n🎯 Checking action plan status...');
try {
    const actionPlanContent = fs.readFileSync('docs/ACTION_PLAN.md', 'utf8');
    
    if (actionPlanContent.includes('Phase 3.5') && actionPlanContent.includes('COMPLETE')) {
        logSuccess('ACTION_PLAN.md shows Phase 3.5 complete');
    } else {
        logError('ACTION_PLAN.md does not show Phase 3.5 complete');
    }
    
    if (actionPlanContent.includes('Phase 4')) {
        logSuccess('ACTION_PLAN.md references Phase 4');
    } else {
        logError('ACTION_PLAN.md missing Phase 4 references');
    }
} catch {
    logError('Cannot read ACTION_PLAN.md');
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

// Test 6: Check continuity indicators in CLAUDE.md
console.log('\n🔄 Checking continuity indicators...');
try {
    const claudeContent = fs.readFileSync('CLAUDE.md', 'utf8');
    
    const continuityIndicators = [
        'KEY CONTINUITY DOCUMENTS',
        'MUST READ',
        'Phase 3.5 Complete',
        'Phase 4'
    ];
    
    for (const indicator of continuityIndicators) {
        if (claudeContent.includes(indicator)) {
            logSuccess(`CLAUDE.md contains continuity indicator: ${indicator}`);
        } else {
            logError(`CLAUDE.md missing continuity indicator: ${indicator}`);
        }
    }
} catch {
    logError('Cannot read CLAUDE.md for continuity check');
}

// Final summary
console.log('\n📊 Continuity Validation Summary');
console.log('================================');
console.log(`Tests Passed: ${testsPasssed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPasssed + testsFailed}`);

if (testsFailed === 0) {
    console.log('\n🎉 All continuity validation tests passed!');
    console.log('The project is ready for seamless Phase 4 development.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some continuity validation tests failed.');
    console.log('Please review and fix the issues to ensure smooth session transitions.');
    process.exit(1);
}