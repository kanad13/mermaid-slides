import { useState, useEffect, useCallback } from 'react';

interface UseMermaidReturn {
  isLoaded: boolean;
  error: string | null;
  renderDiagram: (elementId: string, code: string) => Promise<SVGElement | null>;
}

export const useMermaid = (): UseMermaidReturn => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mermaidInstance, setMermaidInstance] = useState<any>(null);

  useEffect(() => {
    const initializeMermaid = async (): Promise<void> => {
      try {
        // Dynamic import of Mermaid to enable code splitting
        const { default: mermaid } = await import('mermaid');
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose'
        });

        setMermaidInstance(mermaid);
        setIsLoaded(true);
        setError(null);
      } catch {
        setError('Failed to initialize Mermaid library');
        setIsLoaded(false);
      }
    };

    initializeMermaid();
  }, []);

  const renderDiagram = useCallback(async (elementId: string, code: string): Promise<SVGElement | null> => {
    if (!isLoaded || !mermaidInstance) {
      throw new Error('Mermaid not loaded');
    }

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    element.innerHTML = '';
    const uniqueId = `${elementId}-${Date.now()}`;
    const { svg } = await mermaidInstance.render(uniqueId, code);
    element.innerHTML = svg;

    return element.querySelector('svg');
  }, [isLoaded, mermaidInstance]);

  return { isLoaded, error, renderDiagram };
};