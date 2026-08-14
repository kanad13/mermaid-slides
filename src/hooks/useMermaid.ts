import { useState, useEffect, useCallback } from 'react';

interface UseMermaidReturn {
  isLoaded: boolean;
  error: string | null;
  renderDiagram: (_elementId: string, _code: string) => Promise<SVGElement | null>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MermaidApi = any;

/**
 * One Mermaid instance for the whole app.
 *
 * The hook is called by both DiagramViewer and GridView. With per-component
 * state each mount re-imported the library and called initialize() again, so
 * simply switching between single and grid view paid for the whole setup twice.
 * The promise is created once and every caller awaits the same one.
 */
let mermaidPromise: Promise<MermaidApi> | null = null;

const loadMermaid = (): Promise<MermaidApi> => {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose'
      });
      return mermaid;
    });
  }
  return mermaidPromise;
};

/**
 * Rendered SVG, keyed by diagram source.
 *
 * Rendering is the expensive part, and the same diagram is rendered repeatedly:
 * once in the grid, once in the single view, again on every toggle between
 * them. The source fully determines the output, so it is the key.
 *
 * Bounded because a long editing session can pass a lot of distinct sources
 * through here; oldest out first, which matches how decks are read.
 */
const MAX_CACHED_DIAGRAMS = 100;
const svgCache = new Map<string, string>();

const cacheSvg = (code: string, svg: string): void => {
  if (svgCache.size >= MAX_CACHED_DIAGRAMS) {
    const oldest = svgCache.keys().next().value;
    if (oldest !== undefined) {
      svgCache.delete(oldest);
    }
  }
  svgCache.set(code, svg);
};

/** Exposed for tests; the app has no reason to call this. */
export const clearMermaidCache = (): void => {
  svgCache.clear();
};

export const useMermaid = (): UseMermaidReturn => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    loadMermaid()
      .then(() => {
        if (!active) {
          return;
        }
        setIsLoaded(true);
        setError(null);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        // A failed import is not retried by clearing the promise: every caller
        // would then race to re-import a module that is not going to load.
        setError('Failed to initialize Mermaid library');
        setIsLoaded(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const renderDiagram = useCallback(
    async (elementId: string, code: string): Promise<SVGElement | null> => {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      const cached = svgCache.get(code);
      if (cached) {
        element.innerHTML = cached;
        return element.querySelector('svg');
      }

      const mermaid = await loadMermaid();
      const uniqueId = `${elementId}-${Date.now()}`;
      const { svg } = await mermaid.render(uniqueId, code);

      cacheSvg(code, svg);
      element.innerHTML = svg;

      return element.querySelector('svg');
    },
    []
  );

  return { isLoaded, error, renderDiagram };
};
