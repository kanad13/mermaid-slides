import { useEffect, useCallback } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { useLayoutCalculations } from '../../hooks/useLayoutCalculations';
import { DiagramViewerProps } from '../../types/components';

/**
 * DiagramViewer Component
 * 
 * Renders both Mermaid diagrams and image files with consistent layout and responsive sizing.
 * Supports mixed content presentations where diagrams and images can be seamlessly combined.
 * 
 * Features:
 * - Mermaid diagram rendering with theme support
 * - Image file display (PNG, JPEG, GIF, WebP) with automatic scaling
 * - Responsive layout that adapts to screen size and navigation controls
 * - Error handling for both diagram rendering failures and missing images
 * - Consistent centering and spacing for both content types
 */
export const DiagramViewer = ({ 
  diagram, 
  onError,
  showTitles = true
}: DiagramViewerProps) => {
  const { isLoaded, error, renderDiagram } = useMermaid();
  const { availableHeight, availableWidth } = useLayoutCalculations(true);
  
  // Calculate adjusted height when titles are shown
  const getAdjustedHeight = useCallback(() => {
    if (showTitles && diagram?.title) {
      // Title takes approximately 120px (pt-8 + text + border + pb-4)
      const titleHeight = 120;
      return `calc(${availableHeight} - ${titleHeight}px)`;
    }
    return availableHeight;
  }, [showTitles, diagram?.title, availableHeight]);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (!diagram) {
      return;
    }

    const renderContent = async () => {
      const element = document.getElementById(diagram.id);
      if (!element) {
        return;
      }

      try {
        if (diagram.type === 'image') {
          // Handle image rendering with layout-aware sizing
          // Features:
          // - Responsive sizing using calculated available space (accounts for navigation)
          // - object-fit: contain maintains aspect ratio while preventing overflow
          // - Automatic centering with margin: 0 auto
          // - Error fallback displays user-friendly message for broken/missing images
          element.innerHTML = `
            <img
              src="${diagram.src}"
              alt="${diagram.alt || 'Slide image'}"
              style="max-width: ${availableWidth}; max-height: ${getAdjustedHeight()}; object-fit: contain; display: block; margin: 0 auto;"
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
          // Handle Mermaid diagram rendering with layout-aware sizing
          const svgElement = await renderDiagram(diagram.id, diagram.code);
          
          if (svgElement) {
            // Reset any previous styling
            element.style.cssText = '';
            svgElement.style.cssText = '';
            
            // Apply layout-aware sizing and centering
            svgElement.style.maxWidth = availableWidth;
            svgElement.style.maxHeight = getAdjustedHeight();
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (err) {
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
  }, [isLoaded, diagram, renderDiagram, availableHeight, availableWidth, showTitles, getAdjustedHeight]);

  return (
    <div className="flex-1 flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Title Display */}
      {showTitles && diagram?.title && (
        <div className="flex-shrink-0 pt-8 pb-4 px-6 text-center">
          <h1 className="text-3xl font-bold border-b-2 pb-3 inline-block text-blue-600 border-blue-300">
            {diagram.title}
          </h1>
        </div>
      )}
      
      {/* Diagram Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div id={diagram?.id} className="flex items-center justify-center w-full h-full">
          <div className="text-gray-500 text-center">
            {diagram?.type === 'image' ? 'Loading image...' : (isLoaded ? 'Rendering diagram...' : 'Loading Mermaid...')}
          </div>
        </div>
      </div>
    </div>
  );
};