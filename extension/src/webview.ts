import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class MermaidSlidesProvider {
    private webviewPanels: Set<vscode.WebviewPanel> = new Set();

    constructor(private readonly extensionUri: vscode.Uri) {}

    public createWebviewPanel(markdownContent: string, fileName: string): void {
        const column = vscode.ViewColumn.Beside;
        const panel = vscode.window.createWebviewPanel(
            'mermaidSlides',
            `Mermaid Slides - ${path.basename(fileName)}`,
            column,
            {
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(this.extensionUri, 'assets'),
                    vscode.Uri.joinPath(this.extensionUri, 'dist')
                ]
            }
        );

        // Store reference to webview panel
        this.webviewPanels.add(panel);

        // Remove panel from set when it's disposed
        panel.onDidDispose(() => {
            this.webviewPanels.delete(panel);
        });

        // Set the webview content
        panel.webview.html = this.getWebviewContent(panel.webview, markdownContent);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.type) {
                    case 'error':
                        vscode.window.showErrorMessage(message.text);
                        break;
                    case 'info':
                        vscode.window.showInformationMessage(message.text);
                        break;
                    case 'ready':
                        // Send initial content when webview is ready
                        panel.webview.postMessage({
                            type: 'loadContent',
                            content: markdownContent
                        });
                        break;
                }
            },
            undefined,
            []
        );
    }

    public refreshAll(): void {
        // Refresh all open webview panels
        this.webviewPanels.forEach(panel => {
            if (panel.webview) {
                panel.webview.postMessage({
                    type: 'refresh'
                });
            }
        });
    }

    private getWebviewContent(webview: vscode.Webview, markdownContent: string): string {
        // Get configuration
        const config = vscode.workspace.getConfiguration('mermaidSlides');
        const theme = config.get<string>('theme', 'light');

        // Get paths for resources
        const assetsPath = vscode.Uri.joinPath(this.extensionUri, 'assets');
        const assetsUri = webview.asWebviewUri(assetsPath);

        // Generate nonce for security
        const nonce = getNonce();

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src ${webview.cspSource} data: https:; font-src ${webview.cspSource};">
    <title>Mermaid Slides</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            flex-direction: column;
        }
        
        .loading-spinner {
            border: 2px solid var(--vscode-progressBar-background);
            border-top: 2px solid var(--vscode-progressBar-foreground);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .error {
            color: var(--vscode-errorForeground);
            background-color: var(--vscode-inputValidation-errorBackground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 20px;
            margin: 20px;
            border-radius: 4px;
        }
        
        .app-container {
            width: 100%;
            height: 100vh;
            overflow: hidden;
        }
        
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div id="app" class="app-container">
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading Mermaid Slides...</p>
        </div>
    </div>
    
    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        let currentContent = '';
        
        // Initialize the app
        window.addEventListener('DOMContentLoaded', () => {
            initializeApp();
        });
        
        function initializeApp() {
            try {
                // Create iframe to hold the React app
                const iframe = document.createElement('iframe');
                iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(getAppHTML());
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                
                // Replace loading content with iframe
                const appContainer = document.getElementById('app');
                appContainer.innerHTML = '';
                appContainer.appendChild(iframe);
                
                // Set up message handling between iframe and extension
                window.addEventListener('message', (event) => {
                    if (event.source === iframe.contentWindow) {
                        // Handle messages from the React app
                        handleAppMessage(event.data);
                    }
                });
                
                // Send ready message to extension
                vscode.postMessage({ type: 'ready' });
                
            } catch (error) {
                showError('Failed to initialize Mermaid Slides: ' + error.message);
            }
        }
        
        function getAppHTML() {
            // This will contain the embedded React app HTML
            // For now, we'll create a simple placeholder that will be replaced with the actual app
            return \`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Mermaid Slides App</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 20px;
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                            background-color: #f5f5f5;
                        }
                        .container {
                            max-width: 800px;
                            margin: 0 auto;
                            background: white;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        .placeholder {
                            text-align: center;
                            color: #666;
                            padding: 40px;
                        }
                        .code-block {
                            background: #f8f9fa;
                            border: 1px solid #e1e4e8;
                            border-radius: 6px;
                            padding: 16px;
                            font-family: 'SFMono-Regular', Consolas, monospace;
                            white-space: pre-wrap;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="placeholder">
                            <h2>Mermaid Slides Extension</h2>
                            <p>This is a placeholder for the embedded React application.</p>
                            <p>The full React app will be embedded here once the build system is configured.</p>
                            <div class="code-block" id="content-preview"></div>
                        </div>
                    </div>
                    <script>
                        // Listen for content updates from the extension
                        window.addEventListener('message', (event) => {
                            if (event.data.type === 'loadContent') {
                                const contentDiv = document.getElementById('content-preview');
                                contentDiv.textContent = event.data.content.substring(0, 500) + '...';
                            }
                        });
                    </script>
                </body>
                </html>
            \`;
        }
        
        function handleAppMessage(message) {
            // Forward app messages to VS Code extension
            vscode.postMessage(message);
        }
        
        function showError(message) {
            const appContainer = document.getElementById('app');
            appContainer.innerHTML = \`
                <div class="error">
                    <h3>Error</h3>
                    <p>\${message}</p>
                </div>
            \`;
            vscode.postMessage({ type: 'error', text: message });
        }
        
        // Handle messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'loadContent':
                    currentContent = message.content;
                    // Forward to the React app iframe
                    const iframe = document.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                        iframe.contentWindow.postMessage(message, '*');
                    }
                    break;
                case 'refresh':
                    // Refresh the app
                    initializeApp();
                    break;
            }
        });
    </script>
</body>
</html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}