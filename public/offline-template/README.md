# Mermaid Slides Offline Package

This package contains the built application, example files, and convenience launchers. It needs one
local runtime: Python 3 or Node.js.

## Start

### macOS or Linux launcher

```bash
chmod +x start-server.sh
./start-server.sh
```

### Python

```bash
python3 start-server.py
python3 start-server.py --port 8080
python3 start-server.py --no-browser
```

### Node.js

```bash
node start-server.js
node start-server.js --port 8080
node start-server.js --no-browser
```

### Windows

Run `start-server.bat`, or run the Python/Node commands above from Command Prompt or PowerShell.

Open `http://localhost:3000` unless the launcher reports another port.

## What is offline

Application JavaScript, CSS, dependencies, and bundled examples are served from this directory. The
app does not upload Markdown or Mermaid source.

Image URLs in a Markdown document are still loaded by the browser. A remote image therefore requires
network access and sends an ordinary image request to its host.

## Security

The bundled launchers are convenience development servers. They currently listen on all network
interfaces and are not intended for public hosting. Use them on a trusted machine and network, keep
your firewall enabled, and do not expose the port to the internet or an untrusted LAN.

Use the Docker image or another reviewed static-file server when the application must be made
available to other machines.

## Troubleshooting

- **Port busy:** pass `--port 8080` or another available port.
- **Browser did not open:** visit the URL printed by the launcher.
- **Python/Node not found:** install either Python 3 or Node.js and restart the terminal.
- **Permission denied on macOS/Linux:** run `chmod +x start-server.sh start-server.py`.
- **Stop the server:** press `Ctrl+C` in its terminal.

Web app: <https://mermaid-slides.com/>
