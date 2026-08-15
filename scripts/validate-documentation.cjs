#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const ignoredDirectories = new Set([
    '.git',
    'coverage',
    'dist',
    'node_modules',
    'offline-package',
    'playwright-report',
    'test-results',
]);
const ignoredPaths = new Set(['tests/fixtures']);
const requiredDocuments = [
    'README.md',
    'AGENTS.md',
    'docs/WORKPLAN.md',
    'docs/CONTRIBUTING.md',
    'docs/TESTING.md',
    'docs/DEPLOYMENT.md',
    'public/offline-template/README.md',
    '.github/ISSUE_TEMPLATE/bug_report.md',
    '.github/ISSUE_TEMPLATE/feature_request.md',
];
const optionalMarker = '<!-- documentation-integrity: optional -->';

function toRepositoryPath(filePath) {
    return filePath.split(path.sep).join('/');
}

function listMarkdownFiles(root) {
    const files = [];

    function visit(relativeDirectory) {
        const directory = path.join(root, relativeDirectory);
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            if (entry.isDirectory() && ignoredDirectories.has(entry.name)) {
                continue;
            }

            const relativePath = path.join(relativeDirectory, entry.name);
            if (entry.isDirectory()) {
                if (ignoredPaths.has(toRepositoryPath(relativePath))) {
                    continue;
                }
                visit(relativePath);
            } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
                files.push(toRepositoryPath(relativePath));
            }
        }
    }

    visit('');
    return files.sort();
}

function withoutFencedCode(content) {
    let fence = null;
    return content
        .split('\n')
        .map((line) => {
            const match = line.match(/^\s*(`{3,}|~{3,})/);
            if (match) {
                if (fence === null) {
                    fence = match[1][0];
                } else if (match[1][0] === fence) {
                    fence = null;
                }
                return ' '.repeat(line.length);
            }

            if (fence !== null) {
                return ' '.repeat(line.length);
            }

            return line.replace(/(`+)[^`]*\1/g, (value) => ' '.repeat(value.length));
        })
        .join('\n');
}

function lineNumberAt(content, index) {
    return content.slice(0, index).split('\n').length;
}

function githubSlug(heading) {
    return heading
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/!?(?:\[([^\]]*)\])(?:\([^)]*\)|\[[^\]]*\])/g, '$1')
        .replace(/[`*_~]/g, '')
        .replace(/[^\p{Letter}\p{Number}\p{Mark}\s_-]/gu, '')
        .trim()
        .replace(/\s+/g, '-');
}

function collectAnchors(content) {
    const anchors = new Set();
    const slugCounts = new Map();
    let fence = null;

    for (const line of content.split('\n')) {
        const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
        if (fenceMatch) {
            if (fence === null) {
                fence = fenceMatch[1][0];
            } else if (fenceMatch[1][0] === fence) {
                fence = null;
            }
            continue;
        }
        if (fence !== null) {
            continue;
        }

        const headingMatch = line.match(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
        if (headingMatch) {
            const baseSlug = githubSlug(headingMatch[1]);
            if (baseSlug) {
                const count = slugCounts.get(baseSlug) ?? 0;
                anchors.add(count === 0 ? baseSlug : `${baseSlug}-${count}`);
                slugCounts.set(baseSlug, count + 1);
            }
        }

        for (const explicitAnchor of line.matchAll(/\bid=["']([^"']+)["']/gi)) {
            anchors.add(explicitAnchor[1]);
        }
    }

    return anchors;
}

function normalizeDestination(rawDestination) {
    const withoutAngles = rawDestination.startsWith('<') && rawDestination.endsWith('>')
        ? rawDestination.slice(1, -1)
        : rawDestination;
    try {
        return decodeURIComponent(withoutAngles);
    } catch {
        return withoutAngles;
    }
}

function collectLinks(content) {
    const searchableContent = withoutFencedCode(content);
    const links = [];
    const inlineLink = /!?\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^)\s]+)(?:\s+["'][^)\n]*["'])?\s*\)/g;
    const referenceDefinitions = new Map();

    for (const match of searchableContent.matchAll(/^ {0,3}\[([^\]]+)\]:\s*(<[^>\n]+>|\S+)/gm)) {
        referenceDefinitions.set(match[1].trim().toLowerCase(), {
            destination: match[2],
        });
    }

    for (const match of searchableContent.matchAll(inlineLink)) {
        links.push({
            destination: match[1],
            line: lineNumberAt(searchableContent, match.index),
        });
    }

    for (const match of searchableContent.matchAll(/!?\[([^\]\n]+)\]\[([^\]\n]*)\]/g)) {
        const label = (match[2] || match[1]).trim().toLowerCase();
        const definition = referenceDefinitions.get(label);
        if (definition) {
            links.push({
                destination: definition.destination,
                line: lineNumberAt(searchableContent, match.index),
            });
        } else {
            links.push({
                line: lineNumberAt(searchableContent, match.index),
                missingReference: label,
            });
        }
    }

    return links;
}

function resolveLocalLink(root, sourcePath, rawDestination) {
    const destination = normalizeDestination(rawDestination);
    if (/^[a-z][a-z\d+.-]*:/i.test(destination) || destination.startsWith('//')) {
        return null;
    }

    const hashIndex = destination.indexOf('#');
    const destinationPath = hashIndex === -1 ? destination : destination.slice(0, hashIndex);
    const anchor = hashIndex === -1 ? '' : destination.slice(hashIndex + 1);
    const withoutQuery = destinationPath.split('?')[0];
    const sourceDirectory = path.posix.dirname(sourcePath);
    const relativeTarget = withoutQuery === ''
        ? sourcePath
        : path.posix.normalize(
            withoutQuery.startsWith('/')
                ? withoutQuery.slice(1)
                : path.posix.join(sourceDirectory, withoutQuery),
        );
    const absoluteTarget = path.resolve(root, relativeTarget);
    const relativeFromRoot = path.relative(root, absoluteTarget);

    if (relativeFromRoot.startsWith('..') || path.isAbsolute(relativeFromRoot)) {
        return { anchor, path: relativeTarget, outsideRoot: true };
    }

    let targetPath = toRepositoryPath(relativeFromRoot);
    if (fs.existsSync(absoluteTarget) && fs.statSync(absoluteTarget).isDirectory()) {
        targetPath = path.posix.join(targetPath, 'README.md');
    }

    return { anchor, path: targetPath, outsideRoot: false };
}

function validateDocumentation(root) {
    const errors = [];
    const markdownFiles = listMarkdownFiles(root);
    const markdownSet = new Set(markdownFiles);
    const documents = new Map();
    const graph = new Map(markdownFiles.map((file) => [file, new Set()]));

    for (const requiredDocument of requiredDocuments) {
        if (!markdownSet.has(requiredDocument)) {
            errors.push(`${requiredDocument}: required ownership document is missing`);
        }
    }

    let packageScripts = {};
    try {
        const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
        packageScripts = packageJson.scripts ?? {};
    } catch (error) {
        errors.push(`package.json: cannot read npm scripts (${error.message})`);
    }

    for (const markdownFile of markdownFiles) {
        const content = fs.readFileSync(path.join(root, markdownFile), 'utf8');
        documents.set(markdownFile, {
            anchors: collectAnchors(content),
            content,
            optional: content.includes(optionalMarker),
        });
    }

    for (const [markdownFile, document] of documents) {
        for (const link of collectLinks(document.content)) {
            if (link.missingReference) {
                errors.push(
                    `${markdownFile}:${link.line}: reference link has no definition: ${link.missingReference}`,
                );
                continue;
            }
            const target = resolveLocalLink(root, markdownFile, link.destination);
            if (target === null) {
                continue;
            }
            if (target.outsideRoot) {
                errors.push(`${markdownFile}:${link.line}: local link leaves the repository: ${link.destination}`);
                continue;
            }

            const absoluteTarget = path.join(root, target.path);
            if (!fs.existsSync(absoluteTarget)) {
                errors.push(`${markdownFile}:${link.line}: local link target does not exist: ${link.destination}`);
                continue;
            }

            if (markdownSet.has(target.path)) {
                graph.get(markdownFile).add(target.path);
                if (target.anchor && !documents.get(target.path).anchors.has(target.anchor)) {
                    errors.push(`${markdownFile}:${link.line}: heading anchor does not exist: ${link.destination}`);
                }
            }
        }

        for (const command of document.content.matchAll(/\bnpm\s+run\s+([A-Za-z\d:_-]+)/g)) {
            const scriptName = command[1];
            if (!Object.hasOwn(packageScripts, scriptName)) {
                errors.push(
                    `${markdownFile}:${lineNumberAt(document.content, command.index)}: `
                    + `documented npm command does not exist: ${scriptName}`,
                );
            }
        }
    }

    const entryPoints = markdownFiles.filter((file) => (
        file === 'README.md'
        || file === 'AGENTS.md'
        || /^\.github\/ISSUE_TEMPLATE\/[^/]+\.md$/.test(file)
    ));
    const reachable = new Set(entryPoints);
    const pending = [...entryPoints];
    while (pending.length > 0) {
        const current = pending.shift();
        for (const target of graph.get(current) ?? []) {
            if (!reachable.has(target)) {
                reachable.add(target);
                pending.push(target);
            }
        }
    }

    for (const [markdownFile, document] of documents) {
        if (!reachable.has(markdownFile) && !document.optional) {
            errors.push(`${markdownFile}: orphan Markdown document is not reachable from an ownership entry point`);
        }
    }

    return { errors, markdownCount: markdownFiles.length };
}

function run() {
    const root = process.cwd();
    const result = validateDocumentation(root);

    if (result.errors.length > 0) {
        console.error(`Documentation integrity failed with ${result.errors.length} error(s):`);
        for (const error of result.errors) {
            console.error(`- ${error}`);
        }
        process.exitCode = 1;
        return;
    }

    console.log(`Documentation integrity passed for ${result.markdownCount} Markdown files.`);
}

if (require.main === module) {
    run();
}
