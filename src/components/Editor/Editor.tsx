import React, { useState, useEffect } from 'react';
import { FileUpload } from '../FileUpload/FileUpload';
import { sampleMarkdown } from '../../utils/sampleData';
import { useDiagramParser } from '../../hooks/useDiagramParser';
import { useFileHandler } from '../../hooks/useFileHandler';
import { EditorHeader } from './EditorComponents/EditorHeader';
import { MarkdownTextarea } from './EditorComponents/MarkdownTextarea';
import { StatusMessages } from './EditorComponents/StatusMessages';
import { Instructions } from './EditorComponents/Instructions';
import { Diagram } from '../../types/diagram';

interface EditorProps {
  onViewDiagrams: (_diagrams: Diagram[]) => void;
}

export const Editor: React.FC<EditorProps> = ({ 
  onViewDiagrams
}) => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const { setFileName } = useFileHandler();
  const { diagrams, error, processDiagrams } = useDiagramParser();

  const handleFileLoad = (content: string, name: string): void => {
    setMarkdownText(content);
    setFileName(name);
  };

  const loadSample = (): void => {
    setMarkdownText(sampleMarkdown);
    setFileName('Sample Document');
  };

  const handleViewDiagrams = (): void => {
    onViewDiagrams(diagrams);
  };

  const handleClear = (): void => {
    setMarkdownText('');
    setFileName('');
  };

  // Auto-process diagrams when markdown content changes
  useEffect(() => {
    if (markdownText.trim()) {
      processDiagrams(markdownText);
    }
  }, [markdownText, processDiagrams]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-lg shadow-lg p-6 bg-white">
          <EditorHeader />

          <div className="space-y-4">
            <FileUpload
              onFileLoad={handleFileLoad}
              onLoadSample={loadSample}
              onViewDiagrams={handleViewDiagrams}
              onClear={handleClear}
              hasMarkdown={markdownText.trim().length > 0}
            />

            <MarkdownTextarea 
              markdownText={markdownText}
              onTextChange={setMarkdownText}
            />

          </div>

          <StatusMessages 
            error={error}
          />

          <Instructions />
        </div>
        
        {/* Footer */}
        <div className="mt-8 pt-4 border-t text-center text-sm border-gray-200 text-gray-500">
          <div className="flex justify-center space-x-6">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Create and show privacy policy modal
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
                modal.innerHTML = `
                  <div class="bg-white rounded-lg shadow-lg max-w-4xl max-h-[80vh] overflow-y-auto m-4 text-gray-900">
                    <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                      <h2 class="text-lg font-semibold">Privacy Policy</h2>
                      <button id="close-privacy" class="text-gray-500 hover:text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div class="px-6 py-4 prose max-w-none">
                      <div class="whitespace-pre-wrap text-sm leading-relaxed">
## Privacy Policy

**Effective Date:** July 6, 2025

### 1. Introduction

Thank you for using Mermaid Slides. Your privacy is important to us. This website is designed with privacy as a core principle: we do not collect or track any personal data from visitors.

### 2. Data Collection

#### a) No Data Collection by Mermaid Slides

- Mermaid Slides does **not** use analytics, tracking, or telemetry.
- No cookies, local storage, or similar technologies are set by the Mermaid Slides web app for tracking or profiling.
- All diagram rendering and processing happens locally in your browser; no content or files are uploaded or sent to any server.

#### b) Hosting and Infrastructure

- This website is hosted on GitHub Pages, a service provided by GitHub, Inc.
- For security, performance, and legal reasons, GitHub may automatically collect technical information such as your IP address and browser details when you access the site. For more information, please see the GitHub Privacy Statement.
- To ensure fast and secure delivery, the site may be served via Cloudflare, a global content delivery network (CDN). Cloudflare may process your IP address and set technically necessary cookies (such as for security and load balancing). These cookies are essential for the operation and security of the website and do not track your activity for marketing purposes. For details, see the Cloudflare Privacy Policy.

### 3. Cookies

- Mermaid Slides does **not** set any cookies for analytics or tracking.
- Cloudflare may set strictly necessary cookies for security and performance (e.g., to distinguish between humans and bots). These cookies are exempt from consent requirements under EU law, but we inform you about their use here.

### 4. Data Transfers

- GitHub and Cloudflare may process data (such as IP addresses) on servers located outside the European Union. Both companies participate in international privacy frameworks and use standard contractual clauses to protect your data.

### 5. Your Rights

Under the General Data Protection Regulation (GDPR), you have the right to:
- Request access to your personal data
- Request correction or deletion of your data
- Object to the processing of your data
- Lodge a complaint with your local data protection authority

If you have any questions or concerns about privacy when using Mermaid Slides, please contact the repository maintainer via GitHub Issues.

### 6. Changes to This Policy

This privacy policy may be updated from time to time. The latest version will always be available on this website.

**Summary:**  
- We do not collect or track your data.
- GitHub and Cloudflare may process technical data for security and delivery.
- No analytics, tracking, or marketing cookies are used.
                      </div>
                    </div>
                  </div>
                `;
                
                document.body.appendChild(modal);
                
                // Close modal handlers
                const closeModal = () => document.body.removeChild(modal);
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    closeModal();
                  }
                });
                modal.querySelector('#close-privacy')?.addEventListener('click', closeModal);
              }}
              className="hover:underline hover:text-gray-700"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                // Create and show legal notice modal
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
                modal.innerHTML = `
                  <div class="bg-white rounded-lg shadow-lg max-w-2xl max-h-[80vh] overflow-y-auto m-4 text-gray-900">
                    <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                      <h2 class="text-lg font-semibold">Legal Notice</h2>
                      <button id="close-legal" class="text-gray-500 hover:text-gray-700">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <div class="px-6 py-4">
                      <div class="text-sm leading-relaxed space-y-4">
                        <div>
                          <h3 class="font-semibold mb-2">Contact</h3>
                          <p>For questions, issues, or feedback regarding this website, please use:</p>
                          <p class="mt-2">
                            <a href="https://github.com/kanad13/mermaid-slides/issues" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="text-blue-600 hover:underline">
                              GitHub Issues
                            </a>
                          </p>
                        </div>
                        <div>
                          <h3 class="font-semibold mb-2">Purpose</h3>
                          <p>This is a non-commercial, open-source educational tool for creating presentation slides from Mermaid diagrams.</p>
                        </div>
                        <div>
                          <h3 class="font-semibold mb-2">Repository</h3>
                          <p>
                            <a href="https://github.com/kanad13/mermaid-slides" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="text-blue-600 hover:underline">
                              https://github.com/kanad13/mermaid-slides
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                
                document.body.appendChild(modal);
                
                // Close modal handlers
                const closeModal = () => document.body.removeChild(modal);
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    closeModal();
                  }
                });
                modal.querySelector('#close-legal')?.addEventListener('click', closeModal);
              }}
              className="hover:underline hover:text-gray-700"
            >
              Legal Notice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};