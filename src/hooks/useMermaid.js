import { useState, useEffect, useCallback } from 'react';

export const useMermaid = (theme = 'default') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMermaid = async () => {
      try {
        if (!window.mermaid) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.6.1/mermaid.min.js';
          
          const loadPromise = new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
          
          document.head.appendChild(script);
          await loadPromise;
        }

        window.mermaid.initialize({
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

  const renderDiagram = useCallback(async (elementId, code) => {
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