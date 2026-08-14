import { useEffect, useState } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { getDiagramType } from '../../utils/mermaidParser';
import { GridViewProps } from '../../types/components';
import { Diagram } from '../../types/diagram';

/**
 * Thumbnail for one slide.
 *
 * Images are React elements so that nothing derived from the markdown is parsed
 * as markup. Mermaid diagrams get an empty container that the parent effect
 * fills with Mermaid's own sanitised SVG.
 */
const GridPreview = ({ diagram }: { diagram: Diagram }) => {
  const [failed, setFailed] = useState(false);

  if (diagram.type !== 'image') {
    return (
      <div id={`grid-${diagram.id}`} className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading preview...</div>
      </div>
    );
  }

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500 text-xs">Image Error</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={diagram.src}
        alt={diagram.alt || 'Image preview'}
        onError={() => setFailed(true)}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export const GridView = ({
  diagrams,
  currentIndex,
  onDiagramSelect,
  isExtensionMode = false,
  showTitles = true
}: GridViewProps) => {
  const { isLoaded, renderDiagram } = useMermaid();

  useEffect(() => {
    if (diagrams.length === 0 || !isLoaded) {
      return undefined;
    }

    // This effect re-runs when `isLoaded` flips as Mermaid finishes loading.
    // Without cancellation the first pass keeps going, and since rendering
    // awaits between diagrams the two passes interleave — each clearing the
    // container the other is midway through filling. That is what left previews
    // stuck on "Loading preview…".
    let cancelled = false;

    const renderGridContent = async () => {
      for (const diagram of diagrams) {
        if (cancelled) {
          return;
        }

        // Images are rendered by GridPreview; nothing to do here.
        if (diagram.type === 'image') {
          continue;
        }

        const gridId = `grid-${diagram.id}`;
        const element = document.getElementById(gridId);
        if (!element) {
          continue;
        }

        try {
          const svgElement = await renderDiagram(gridId, diagram.code);

          // Another pass may have taken over during the await; leave its work
          // alone rather than styling a node it is about to replace.
          if (cancelled) {
            return;
          }

          if (svgElement) {
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
            svgElement.style.transform = 'scale(0.8)';
            svgElement.style.transformOrigin = 'center center';
          }
        } catch {
          if (cancelled) {
            return;
          }
          // Mermaid already logs the parse failure; a thumbnail only needs to
          // say that this one will not draw.
          element.replaceChildren(
            Object.assign(document.createElement('div'), {
              className: 'text-red-500 text-xs',
              textContent: 'Error'
            })
          );
        }
      }
    };

    const timer = setTimeout(renderGridContent, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isLoaded, diagrams, renderDiagram]);

  return (
    <div className={`${isExtensionMode ? 'h-[80vh] overflow-y-auto' : 'flex-1 overflow-auto'} p-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagrams.map((diagram, index) => (
          <div
            key={diagram.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
              currentIndex === index
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
            onClick={() => onDiagramSelect(index)}
          >
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">
                {showTitles && diagram.title
                  ? diagram.title
                  : `${diagram.type === 'image' ? 'Image' : 'Diagram'} ${index + 1}`}
              </span>
              <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                {diagram.type === 'image' ? 'image' : getDiagramType(diagram.code)}
              </span>
            </div>
            <div className="h-48 flex items-center justify-center border rounded bg-gray-50 overflow-hidden">
              <GridPreview diagram={diagram} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
