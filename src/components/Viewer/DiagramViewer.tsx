import { useEffect } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { DiagramViewerProps } from '../../types/components';

/**
 * Renders one slide: either a Mermaid diagram or an image.
 *
 * Sizing is done by the layout, not by arithmetic. The component fills the
 * height its parent gives it, the title takes what it needs, and the diagram
 * gets the rest — so it stays correct at any viewport and with or without a
 * title. An earlier version subtracted a hardcoded 120px for the header, which
 * actually measures 109px on a wide screen and 157px on a narrow one, and a
 * further hardcoded 120px for the title.
 */
export const DiagramViewer = ({
  diagram,
  onError,
  showTitles = true
}: DiagramViewerProps) => {
  const { isLoaded, error, renderDiagram } = useMermaid();

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (!diagram) {
      return undefined;
    }

    let cancelled = false;

    const renderContent = async () => {
      const element = document.getElementById(diagram.id);
      if (!element) {
        return;
      }

      try {
        if (diagram.type === 'image') {
          element.innerHTML = `
            <img
              src="${diagram.src}"
              alt="${diagram.alt || 'Slide image'}"
              style="max-width: 100%; max-height: 100%; object-fit: contain; display: block; margin: 0 auto;"
            />
          `;

          // The fallback is attached as a listener rather than written as an
          // inline onerror attribute: the Content-Security-Policy blocks inline
          // handlers, so an attribute here would fail silently and a broken
          // image would show nothing at all.
          element.querySelector('img')?.addEventListener('error', () => {
            const card = document.createElement('div');
            card.style.cssText =
              'color: #dc2626; padding: 1rem; border: 1px solid #fca5a5; ' +
              'border-radius: 0.375rem; background-color: #fef2f2; text-align: center;';

            const heading = document.createElement('p');
            heading.style.fontWeight = '500';
            heading.textContent = 'Error loading image:';

            const source = document.createElement('p');
            source.style.cssText = 'font-size: 0.875rem; margin-top: 0.25rem;';
            source.textContent = diagram.src ?? '';

            card.append(heading, source);
            element.replaceChildren(card);
          });
        } else if (isLoaded) {
          const svgElement = await renderDiagram(diagram.id, diagram.code);

          // A newer render may have taken over during the await.
          if (cancelled) {
            return;
          }

          if (svgElement) {
            svgElement.style.cssText = '';
            svgElement.style.maxWidth = '100%';
            svgElement.style.maxHeight = '100%';
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        const message = err instanceof Error ? err.message : String(err);
        console.error('Error rendering content:', err);
        element.innerHTML = `
          <div style="color: #dc2626; padding: 1rem; border: 1px solid #fca5a5; border-radius: 0.375rem; background-color: #fef2f2; text-align: center;">
            <p style="font-weight: 500;">Error rendering content:</p>
            <p style="font-size: 0.875rem; margin-top: 0.25rem;">${message}</p>
            <pre style="font-size: 0.75rem; margin-top: 0.5rem; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.375rem; overflow: auto; text-align: left;">${diagram.code || diagram.src}</pre>
          </div>
        `;
      }
    };

    renderContent();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, diagram, renderDiagram]);

  return (
    <div className="h-full flex flex-col">
      {showTitles && diagram?.title && (
        <div className="flex-shrink-0 pt-8 pb-4 px-6 text-center">
          <h1 className="text-3xl font-bold border-b-2 pb-3 inline-block text-blue-600 border-blue-300">
            {diagram.title}
          </h1>
        </div>
      )}

      {/* min-h-0 lets this shrink below its content, which is what keeps a tall
          diagram inside the viewport instead of pushing the page taller. */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4">
        <div
          id={diagram?.id}
          className="flex items-center justify-center w-full h-full overflow-hidden"
        >
          <div className="text-gray-500 text-center">
            {diagram?.type === 'image'
              ? 'Loading image...'
              : isLoaded
                ? 'Rendering diagram...'
                : 'Loading Mermaid...'}
          </div>
        </div>
      </div>
    </div>
  );
};
