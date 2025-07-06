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

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('File not found');
        return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server error');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
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