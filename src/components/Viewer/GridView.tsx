import { useEffect } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { getDiagramType } from '../../utils/mermaidParser';
import { GridViewProps } from '../../types/components';

export const GridView = ({ 
  diagrams, 
  currentIndex, 
  onDiagramSelect,
  isExtensionMode = false,
  showTitles = true
}: GridViewProps) => {
  const { isLoaded, renderDiagram } = useMermaid();

  useEffect(() => {
    if (diagrams.length === 0) {return undefined;}

    // This effect re-runs when Mermaid finishes loading, because `isLoaded`
    // and `renderDiagram` both change at that moment. Without cancellation the
    // first pass keeps going, and since rendering awaits between diagrams the
    // two passes interleave — each one clearing the container the other is
    // midway through filling. That is what left grid previews stuck on
    // "Loading preview…".
    let cancelled = false;

    const renderGridContent = async () => {
      for (let i = 0; i < diagrams.length; i++) {
        if (cancelled) {
          return;
        }

        const diagram = diagrams[i];
        const gridId = `grid-${diagram.id}`;
        const element = document.getElementById(gridId);

        if (!element) {
          continue;
        }

        try {
          if (diagram.type === 'image') {
            // Render image preview
            element.innerHTML = `
              <div class="w-full h-full flex items-center justify-center">
                <img
                  src="${diagram.src}"
                  alt="${diagram.alt || 'Image preview'}"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            `;

            // Listener rather than an inline onerror attribute, which the
            // Content-Security-Policy blocks. See DiagramViewer for the same
            // reasoning in the single-slide view.
            element.querySelector('img')?.addEventListener('error', () => {
              const label = document.createElement('div');
              label.className = 'text-red-500 text-xs';
              label.textContent = 'Image Error';

              const wrapper = document.createElement('div');
              wrapper.className = 'w-full h-full flex items-center justify-center';
              wrapper.append(label);

              element.replaceChildren(wrapper);
            });
          } else if (isLoaded) {
            // Render Mermaid diagram
            const svgElement = await renderDiagram(gridId, diagram.code);

            // Another pass may have taken over during the await; leave its
            // work alone rather than styling a node it is about to replace.
            if (cancelled) {
              return;
            }

            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.maxHeight = '100%';
              svgElement.style.transform = 'scale(0.8)';
              svgElement.style.transformOrigin = 'center center';
            }
          }
        } catch (err) {
          if (cancelled) {
            return;
          }
          console.error(`Error rendering grid content ${i}:`, err);
          element.innerHTML = `<div class="text-red-500 text-xs">Error</div>`;
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
            key={index}
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
                  : `${diagram.type === 'image' ? 'Image' : 'Diagram'} ${index + 1}`
                }
              </span>
              <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                {diagram.type === 'image' ? 'image' : getDiagramType(diagram.code)}
              </span>
            </div>
            <div
              id={`grid-${diagram.id}`}
              className="h-48 flex items-center justify-center border rounded bg-gray-50 overflow-hidden"
            >
              <div className="text-gray-400 text-sm">Loading preview...</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};