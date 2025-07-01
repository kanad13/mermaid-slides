import { useState, useEffect, useCallback } from 'react';
import { MermaidTheme } from '../types/diagram';

interface MermaidAPI {
  initialize: (config: MermaidConfig) => void;
  render: (id: string, code: string) => Promise<{ svg: string }>;
}

interface MermaidConfig {
  startOnLoad: boolean;
  theme: string;
  securityLevel: string;
}

declare global {
  interface Window {
    mermaid?: MermaidAPI;
  }
}

interface UseMermaidReturn {
  isLoaded: boolean;
  error: string | null;
  renderDiagram: (elementId: string, code: string) => Promise<SVGElement | null>;
}

export const useMermaid = (theme: MermaidTheme = 'default'): UseMermaidReturn => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMermaid = async (): Promise<void> => {
      try {
        if (!window.mermaid) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
          
          const loadPromise = new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load script'));
          });
          
          document.head.appendChild(script);
          await loadPromise;
        }

        window.mermaid?.initialize({
          startOnLoad: false,
          theme: theme,
          securityLevel: 'loose'
        });

        setIsLoaded(true);
        setError(null);
      } catch {
        setError('Failed to load Mermaid library');
        setIsLoaded(false);
      }
    };

    loadMermaid();
  }, [theme]);

  const renderDiagram = useCallback(async (elementId: string, code: string): Promise<SVGElement | null> => {
    if (!window.mermaid || !isLoaded) {
      throw new Error('Mermaid not loaded');
    }

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    element.innerHTML = '';
    const uniqueId = `${elementId}-${Date.now()}`;
    const { svg } = await window.mermaid.render(uniqueId, code);
    element.innerHTML = svg;

    return element.querySelector('svg');
  }, [isLoaded]);

  return { isLoaded, error, renderDiagram };
};