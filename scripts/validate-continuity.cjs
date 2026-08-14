#!/usr/bin/env node

// Documentation structure validation.
// Content-level link, anchor, command, and orphan checks are added in the
// engineering-foundation milestone defined in docs/WORKPLAN.md.

const fs = require('fs');

console.log('🔗 Continuity Validation for Mermaid Slides');
console.log('===========================================');

let testsPassed = 0;
let testsFailed = 0;

function logSuccess(message) {
    console.log(`✅ ${message}`);
    testsPassed++;
}

function logError(message) {
    console.log(`❌ ${message}`);
    testsFailed++;
}

// Check the maintained documentation set.
console.log('\n📋 Checking documentation files...');
const docs = [
    'README.md',
    'AGENTS.md',
    'docs/DEPLOYMENT.md',
    'docs/CONTRIBUTING.md',
    'docs/WORKPLAN.md',
    'docs/TESTING.md',
    'docs/IMPLEMENTATION_REFERENCE.md',
    'public/offline-template/README.md',
    '.github/ISSUE_TEMPLATE/bug_report.md',
    '.github/ISSUE_TEMPLATE/feature_request.md'
];

for (const doc of docs) {
    if (fs.existsSync(doc)) {
        logSuccess(`Documentation exists: ${doc}`);
    } else {
        logError(`Missing documentation: ${doc}`);
    }
}

if (!fs.existsSync('docs/ENGINEERING.md')) {
    logSuccess('Retired documentation is absent: docs/ENGINEERING.md');
} else {
    logError('Retired documentation still exists: docs/ENGINEERING.md');
}

// Check that the agent entry point reaches its authoritative documents.
console.log('\n📝 Checking AGENTS.md references...');
try {
    const agentsContent = fs.readFileSync('AGENTS.md', 'utf8');

    const requiredReferences = [
        'docs/WORKPLAN.md',
        'docs/CONTRIBUTING.md',
        'docs/TESTING.md',
        'docs/DEPLOYMENT.md',
        'docs/IMPLEMENTATION_REFERENCE.md',
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

// Check that the public entry point reaches every public contributor document.
console.log('\n🏠 Checking README.md references...');
try {
    const readmeContent = fs.readFileSync('README.md', 'utf8');
    const requiredReferences = [
        'docs/CONTRIBUTING.md',
        'docs/TESTING.md',
        'docs/DEPLOYMENT.md',
        'docs/WORKPLAN.md',
        'AGENTS.md',
    ];

    for (const ref of requiredReferences) {
        if (readmeContent.includes(ref)) {
            logSuccess(`README.md references: ${ref}`);
        } else {
            logError(`README.md missing reference: ${ref}`);
        }
    }
} catch {
    logError('Cannot read README.md');
}

// Check validation entry points.
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

// Check documentation structure consistency.
console.log('\n🔄 Checking documentation structure...');
try {
    if (docs.every((doc) => fs.existsSync(doc))) {
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
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`Total Tests: ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
    console.log('\n🎉 All continuity validation tests passed!');
    console.log('Documentation structure is consistent and complete.');
    process.exit(0);
} else {
    console.log('\n⚠️  Some continuity validation tests failed.');
    console.log('Please review and fix the documentation issues.');
    process.exit(1);
}
