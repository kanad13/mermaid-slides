import { useEffect, useState } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { Diagram } from '../../types/diagram';

interface PrintViewProps {
  diagrams: Diagram[];
  showTitles: boolean;
  /** Called once every slide has drawn, or given up. */
  onReady: () => void;
}

/**
 * Every slide at once, laid out one per page, for printing.
 *
 * The on-screen viewer only ever draws the current slide, so printing needs its
 * own pass over the whole deck. Rendering is cheap the second time — useMermaid
 * caches by diagram source and rewrites ids on insertion, so the same diagram
 * can appear here and in the viewer simultaneously without colliding.
 *
 * While preparing, this sits off-screen rather than hidden: Mermaid measures
 * text to lay a diagram out, and an element with `display: none` has no
 * measurements to give. The print stylesheet moves it back into flow.
 */
export const PrintView = ({ diagrams, showTitles, onReady }: PrintViewProps) => {
  const { isLoaded, renderDiagram } = useMermaid();
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

    let cancelled = false;

    const renderAll = async () => {
      let completed = 0;

      for (const diagram of diagrams) {
        if (cancelled) {
          return;
        }

        if (diagram.type === 'image') {
          // Nothing to draw; the browser loads it. Still counted so the
          // progress figure matches the deck.
          completed++;
          setDrawn(completed);
          continue;
        }

        const element = document.getElementById(`print-${diagram.id}`);
        if (!element) {
          completed++;
          continue;
        }

        try {
          const svg = await renderDiagram(`print-${diagram.id}`, diagram.code);
          if (svg) {
            svg.style.cssText = '';
            svg.style.maxWidth = '100%';
            svg.style.maxHeight = '100%';
          }
        } catch {
          // A slide that will not draw must not stop the rest of the deck from
          // printing; the page is simply left with its placeholder.
        }

        completed++;
        if (!cancelled) {
          setDrawn(completed);
        }
      }

      if (!cancelled) {
        onReady();
      }
    };

    renderAll();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, diagrams, renderDiagram, onReady]);

  return (
    <div className="print-deck" aria-hidden="true" data-drawn={drawn}>
      {diagrams.map((diagram) => (
        <section className="print-slide" key={diagram.id}>
          {showTitles && diagram.title && (
            <h2 className="print-slide-title">{diagram.title}</h2>
          )}
          <div className="print-slide-body">
            {diagram.type === 'image' ? (
              <img src={diagram.src} alt={diagram.alt || 'Slide image'} />
            ) : (
              <div id={`print-${diagram.id}`} />
            )}
          </div>
        </section>
      ))}
    </div>
  );
};
