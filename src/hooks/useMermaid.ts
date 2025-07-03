import { useState, useEffect, useCallback } from 'react';
import mermaid from 'mermaid';
import { MermaidTheme } from '../types/diagram';



interface UseMermaidReturn {
  isLoaded: boolean;
  error: string | null;
  renderDiagram: (elementId: string, code: string) => Promise<SVGElement | null>;
}

export const useMermaid = (theme: MermaidTheme = 'default'): UseMermaidReturn => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMermaid = (): void => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme,
          securityLevel: 'loose'
        });

        setIsLoaded(true);
        setError(null);
      } catch {
        setError('Failed to initialize Mermaid library');
        setIsLoaded(false);
      }
    };

    initializeMermaid();
  }, [theme]);

  const renderDiagram = useCallback(async (elementId: string, code: string): Promise<SVGElement | null> => {
    if (!isLoaded) {
      throw new Error('Mermaid not loaded');
    }

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    element.innerHTML = '';
    const uniqueId = `${elementId}-${Date.now()}`;
    const { svg } = await mermaid.render(uniqueId, code);
    element.innerHTML = svg;

    return element.querySelector('svg');
  }, [isLoaded]);

  return { isLoaded, error, renderDiagram };
};