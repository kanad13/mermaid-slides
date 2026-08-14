#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
let PORT = 3000;
let noBrowser = false;

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-p' || args[i] === '--port') {
        PORT = parseInt(args[i + 1]);
        i++; // Skip next argument
    } else if (args[i] === '--no-browser') {
        noBrowser = true;
    } else if (args[i] === '-h' || args[i] === '--help') {
        console.log('Mermaid Slides Offline Server');
        console.log('Usage: node start-server.js [options]');
        console.log('Options:');
        console.log('  -p, --port <number>  Port to run the server on (default: 3000)');
        console.log('  --no-browser         Do not automatically open browser');
        console.log('  -h, --help           Show this help message');
        process.exit(0);
    }
}

const HOST = '0.0.0.0';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Everything served must live inside this directory. Requests are resolved
// against it and then checked, rather than trusted, because a request path is
// attacker-controlled input: `/../../../etc/passwd` is a perfectly valid thing
// for a client to send.
const ROOT = path.resolve(__dirname);

/**
 * Turn a request URL into an absolute path inside ROOT, or null if it escapes.
 *
 * Returning null rather than throwing keeps the caller's error handling in one
 * place: every rejection is answered identically, so a probe cannot tell a
 * malformed path from a blocked one from a missing file.
 */
function resolveWithinRoot(requestUrl) {
    let pathname;

    try {
        // The base is a throwaway; only the pathname is used. Parsing this way
        // discards the query string and fragment, which would otherwise end up
        // in the filename and confuse the extension lookup below.
        pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
    } catch {
        // Malformed percent-encoding, e.g. a stray '%'.
        return null;
    }

    // A null byte can truncate the path inside some system calls.
    if (pathname.indexOf('\0') !== -1) {
        return null;
    }

    // Leading '.' makes the path relative, so resolve() cannot be pushed to the
    // filesystem root by a leading slash.
    const resolved = path.resolve(ROOT, '.' + pathname);

    // The separator check matters: without it, a sibling directory whose name
    // merely starts with ROOT would pass.
    if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) {
        return null;
    }

    return resolved;
}

const server = http.createServer((req, res) => {
    const resolved = resolveWithinRoot(req.url);

    if (resolved === null) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(resolved, (statErr, stats) => {
        if (statErr) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        // A directory serves its index.html, which is also how '/' reaches the
        // application itself.
        const filePath = stats.isDirectory() ? path.join(resolved, 'index.html') : resolved;
        const extname = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(err.code === 'ENOENT' ? 404 : 500);
                res.end(err.code === 'ENOENT' ? 'File not found' : 'Server error');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(PORT, HOST, () => {
    const url = `http://localhost:${PORT}`;
    console.log('🧜‍♀️ Mermaid Slides - Offline Server');
    console.log('='.repeat(40));
    console.log(`✅ Server running at: ${url}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('\n🚀 Opening in your default browser...');
    console.log('💡 Press Ctrl+C to stop the server\n');

    // Open browser (unless disabled)
    if (!noBrowser) {
        const start = process.platform === 'darwin' ? 'open' :
                      process.platform === 'win32' ? 'start' : 'xdg-open';
        exec(`${start} ${url}`);
    }
});