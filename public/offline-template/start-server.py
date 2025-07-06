#!/usr/bin/env python3
"""
Simple HTTP server for Mermaid Slides offline package.
Works with Python 3.x
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import argparse
from pathlib import Path

# Configuration
PORT = 3000
HOST = '0.0.0.0'  # Bind to all interfaces for Docker compatibility

def find_available_port(start_port=3000):
    """Find an available port starting from the given port."""
    import socket
    port = start_port
    while port < start_port + 100:  # Try up to 100 ports
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((HOST, port))
                return port
        except OSError:
            port += 1
    return None

def main():
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Mermaid Slides Offline Server')
    parser.add_argument('-p', '--port', type=int, default=PORT, 
                       help=f'Port to run the server on (default: {PORT})')
    parser.add_argument('--no-browser', action='store_true',
                       help='Do not automatically open browser')
    args = parser.parse_args()

    # Change to the directory containing this script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)

    print("🧜‍♀️ Mermaid Slides - Offline Server")
    print("=" * 40)

    # Find available port
    port = find_available_port(args.port)
    if port is None:
        print(f"❌ Error: Could not find an available port starting from {args.port}")
        sys.exit(1)

    # Set up the server
    handler = http.server.SimpleHTTPRequestHandler

    try:
        with socketserver.TCPServer((HOST, port), handler) as httpd:
            url = f"http://{HOST}:{port}"
            print(f"✅ Server running at: {url}")
            print(f"📁 Serving files from: {script_dir}")
            print("\n🚀 Opening in your default browser...")
            print("💡 Press Ctrl+C to stop the server\n")

            # Open browser (unless disabled)
            if not args.no_browser:
                webbrowser.open(url)

            # Start serving
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n👋 Server stopped. Thanks for using Mermaid Slides!")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()