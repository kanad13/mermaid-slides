#!/usr/bin/env node

/**
 * Simple HTTP server for Mermaid Slides offline package.
 * Works with Node.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const HOST = 'localhost';
const DEFAULT_PORT = 3000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function findAvailablePort(startPort = DEFAULT_PORT) {
  return new Promise((resolve, reject) => {
    const net = require('net');
    const port = startPort;
    
    const server = net.createServer();
    
    server.listen(port, HOST, () => {
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      if (port < startPort + 100) {
        findAvailablePort(port + 1).then(resolve).catch(reject);
      } else {
        reject(new Error('No available port found'));
      }
    });
  });
}

function openBrowser(url) {
  const platform = process.platform;
  let command;
  
  if (platform === 'darwin') {
    command = `open "${url}"`;
  } else if (platform === 'win32') {
    command = `start "${url}"`;
  } else {
    command = `xdg-open "${url}"`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.log('💡 Please open your browser and navigate to:', url);
    }
  });
}

function createServer(port) {
  const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          res.writeHead(404);
          res.end('File not found');
        } else {
          res.writeHead(500);
          res.end('Server error: ' + error.code);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
  
  return server;
}

async function main() {
  console.log('🧜‍♀️ Mermaid Slides - Offline Server');
  console.log('=' + '='.repeat(39));
  
  try {
    const port = await findAvailablePort(DEFAULT_PORT);
    const server = createServer(port);
    
    server.listen(port, HOST, () => {
      const url = `http://${HOST}:${port}`;
      console.log(`✅ Server running at: ${url}`);
      console.log(`📁 Serving files from: ${__dirname}`);
      console.log('\n🚀 Opening in your default browser...');
      console.log('💡 Press Ctrl+C to stop the server\n');
      
      openBrowser(url);
    });
    
    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n👋 Server stopped. Thanks for using Mermaid Slides!');
      server.close(() => {
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    process.exit(1);
  }
}

main();