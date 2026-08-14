import { useEffect, useState } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { DiagramViewerProps } from '../../types/components';

/**
 * Renders one slide: either a Mermaid diagram or an image.
 *
 * Sizing is done by the layout, not by arithmetic. The component fills the
 * height its parent gives it, the title takes what it needs, and the diagram
 * gets the rest — so it stays correct at any viewport and with or without a
 * title. An earlier version subtracted a hardcoded 120px for the header, which
 * actually measures 109px on a wide screen and 157px on a narrow one.
 *
 * Nothing derived from the markdown is ever written as markup. Images and error
 * states are React elements, so their attributes are set as values rather than
 * parsed as HTML. Only Mermaid's own SVG output goes through innerHTML, and
 * only after Mermaid has sanitised it.
 */
export const DiagramViewer = ({
  diagram,
  onError,
  showTitles = true
}: DiagramViewerProps) => {
  const { isLoaded, error, renderDiagram } = useMermaid();
  const [renderError, setRenderError] = useState<string | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  // Reset per-slide failure state when the slide changes, so an error on one
  // slide does not persist onto the next.
  useEffect(() => {
    setRenderError(null);
    setImageFailed(false);
  }, [diagram?.id]);

  useEffect(() => {
    // Images are rendered by React below; this effect is only for Mermaid.
    if (!diagram || diagram.type === 'image' || !isLoaded) {
      return undefined;
    }

    let cancelled = false;

    const renderContent = async () => {
      const element = document.getElementById(diagram.id);
      if (!element) {
        return;
      }

      try {
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
      } catch (err) {
        if (cancelled) {
          return;
        }
        setRenderError(err instanceof Error ? err.message : String(err));
      }
    };

    renderContent();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, diagram, renderDiagram]);

  const renderSlideBody = () => {
    if (!diagram) {
      return null;
    }

    if (diagram.type === 'image') {
      if (imageFailed) {
        return (
          <div className="text-red-600 p-4 border border-red-300 rounded-md bg-red-50 text-center">
            <p className="font-medium">Error loading image:</p>
            <p className="text-sm mt-1 break-all">{diagram.src}</p>
          </div>
        );
      }

      return (
        <img
          src={diagram.src}
          alt={diagram.alt || 'Slide image'}
          onError={() => setImageFailed(true)}
          className="max-w-full max-h-full object-contain block mx-auto"
        />
      );
    }

    if (renderError) {
      return (
        <div className="text-red-600 p-4 border border-red-300 rounded-md bg-red-50 text-center max-w-full overflow-auto">
          <p className="font-medium">Error rendering content:</p>
          <p className="text-sm mt-1">{renderError}</p>
          <pre className="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto text-left">
            {diagram.code || diagram.src}
          </pre>
        </div>
      );
    }

    return (
      <div
        id={diagram.id}
        className="flex items-center justify-center w-full h-full overflow-hidden"
      >
        <div className="text-gray-500 text-center">
          {isLoaded ? 'Rendering diagram...' : 'Loading Mermaid...'}
        </div>
      </div>
    );
  };

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
        {renderSlideBody()}
      </div>
    </div>
  );
};
