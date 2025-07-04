import * as vscode from 'vscode';
import { MermaidSlidesProvider } from './webview';

export function activate(context: vscode.ExtensionContext) {
    console.log('Mermaid Slides extension is now active!');

    // Register webview provider
    const provider = new MermaidSlidesProvider(context.extensionUri);
    
    // Register the preview command
    const previewCommand = vscode.commands.registerCommand(
        'mermaidSlides.previewSlides', 
        async () => {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                vscode.window.showErrorMessage('No active editor found');
                return;
            }

            const document = activeEditor.document;
            if (document.languageId !== 'markdown') {
                vscode.window.showErrorMessage('Please open a markdown file to preview slides');
                return;
            }

            const content = document.getText();
            
            // Check if document contains mermaid diagrams
            const config = vscode.workspace.getConfiguration('mermaidSlides');
            const autoDetect = config.get<boolean>('autoDetect', true);
            
            if (autoDetect && !containsMermaidDiagrams(content)) {
                const result = await vscode.window.showWarningMessage(
                    'No mermaid diagrams detected in this file. Continue anyway?',
                    'Yes', 'No'
                );
                if (result !== 'Yes') {
                    return;
                }
            }

            // Create and show the webview
            provider.createWebviewPanel(content, document.fileName);
        }
    );

    context.subscriptions.push(previewCommand);
    
    // Register configuration change listener
    const configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('mermaidSlides')) {
            // Refresh all open webviews when configuration changes
            provider.refreshAll();
        }
    });
    
    context.subscriptions.push(configChangeListener);
}

export function deactivate() {
    console.log('Mermaid Slides extension is now deactivated');
}

function containsMermaidDiagrams(content: string): boolean {
    // Check for mermaid code blocks
    const mermaidRegex = /```mermaid\s+[\s\S]*?```/g;
    return mermaidRegex.test(content);
}