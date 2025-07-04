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
        // Get paths for the built React app
        const distPath = vscode.Uri.joinPath(this.extensionUri, 'dist');
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(distPath, 'mermaid-slides.js'));
        const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(distPath, 'assets', 'app.css'));

        // Generate nonce for security
        const nonce = getNonce();

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' ${webview.cspSource}; img-src ${webview.cspSource} data: https:; font-src ${webview.cspSource};">
    <title>Mermaid Slides</title>
    <link rel="stylesheet" href="${styleUri}">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            overflow: hidden;
        }
        
        #mermaid-slides-root {
            width: 100%;
            height: 100vh;
            overflow: hidden;
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
    </style>
</head>
<body>
    <div id="mermaid-slides-root">
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Loading Mermaid Slides...</p>
        </div>
    </div>
    
    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        let currentContent = '';
        
        // Handle messages from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            switch (message.type) {
                case 'loadContent':
                    currentContent = message.content;
                    // The React app will handle content loading internally
                    break;
                case 'refresh':
                    // Refresh the page
                    location.reload();
                    break;
            }
        });
        
        // Send ready message once the React app is loaded
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                vscode.postMessage({ type: 'ready' });
            }, 1000);
        });
        
        // Error handling
        window.addEventListener('error', (event) => {
            vscode.postMessage({ 
                type: 'error', 
                text: 'JavaScript Error: ' + event.error?.message || event.message 
            });
        });
    </script>
    
    <script nonce="${nonce}" type="module" src="${scriptUri}"></script>
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