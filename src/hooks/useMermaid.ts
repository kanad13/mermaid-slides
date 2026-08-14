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

interface CachedRender {
  svg: string;
  /** The id Mermaid used, which appears throughout the markup it produced. */
  renderId: string;
}

const svgCache = new Map<string, CachedRender>();

const cacheSvg = (code: string, entry: CachedRender): void => {
  if (svgCache.size >= MAX_CACHED_DIAGRAMS) {
    const oldest = svgCache.keys().next().value;
    if (oldest !== undefined) {
      svgCache.delete(oldest);
    }
  }
  svgCache.set(code, entry);
};

/**
 * Give a cached render a fresh set of element ids.
 *
 * Mermaid derives every id in its output from the one it was given — the root
 * svg, arrow markers, filters, node groups and the `url(#…)` references between
 * them. Inserting the same cached string twice therefore produces duplicate
 * ids, which an audit measured at 18 duplicated values for a deck containing
 * two identical diagrams. Rendering survived it, because the duplicated
 * definitions were identical, but `getElementById` and `url(#…)` both resolve
 * to the first match, so it stops being harmless as soon as two copies differ —
 * and printing renders every slide at once.
 *
 * A plain string replacement is exact here: the render id is a unique token
 * that every derived id is prefixed with.
 */
const withFreshIds = (entry: CachedRender, newRenderId: string): string =>
  entry.svg.split(entry.renderId).join(newRenderId);

/**
 * Monotonic, rather than Date.now(): two diagrams rendered inside the same
 * millisecond would otherwise share an id.
 */
let renderCounter = 0;

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

      const uniqueId = `${elementId}-${renderCounter++}`;

      const cached = svgCache.get(code);
      if (cached) {
        element.innerHTML = withFreshIds(cached, uniqueId);
        return element.querySelector('svg');
      }

      const mermaid = await loadMermaid();

      let svg: string;
      try {
        ({ svg } = await mermaid.render(uniqueId, code));
      } finally {
        // Mermaid appends a temporary container to <body> and removes it on
        // success. On failure it is left behind, so every malformed diagram
        // grew the document by an orphaned error graphic — an audit measured
        // six of them, and the page taller each time.
        document.getElementById(`d${uniqueId}`)?.remove();
      }

      cacheSvg(code, { svg, renderId: uniqueId });
      element.innerHTML = svg;

      return element.querySelector('svg');
    },
    []
  );

  return { isLoaded, error, renderDiagram };
};
