import { useEffect } from 'react';
import { useMermaid } from '../../hooks/useMermaid';

export const DiagramViewer = ({ 
  diagram, 
  isDarkMode, 
  mermaidTheme,
  onError 
}) => {
  const { isLoaded, error, renderDiagram } = useMermaid(mermaidTheme);

  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  useEffect(() => {
    if (!isLoaded || !diagram) {return;}

    const renderWithScaling = async () => {
      try {
        const svgElement = await renderDiagram(diagram.id, diagram.code);
        
        if (svgElement) {
          // Get the SVG's natural dimensions
          const svgRect = svgElement.getBoundingClientRect();
          const naturalWidth = svgRect.width;
          const naturalHeight = svgRect.height;

          // Get available space
          const availableWidth = window.innerWidth * 0.85;
          const availableHeight = window.innerHeight * 0.6;

          // Calculate scale to fit within available space
          const scaleX = availableWidth / naturalWidth;
          const scaleY = availableHeight / naturalHeight;
          const scale = Math.min(scaleX, scaleY, 2.5);

          // Apply scaling if beneficial
          if (scale > 1.1) {
            const element = document.getElementById(diagram.id);
            svgElement.style.transform = `scale(${scale})`;
            svgElement.style.transformOrigin = 'center center';

            element.style.width = 'auto';
            element.style.height = 'auto';
            element.style.overflow = 'visible';
            element.style.display = 'inline-block';

            const margin = Math.max(
              naturalWidth * (scale - 1) / 2, 
              naturalHeight * (scale - 1) / 2
            );
            element.style.margin = `${margin}px`;
          }
        }
      } catch (err) {
        console.error('Error rendering diagram:', err);
        const element = document.getElementById(diagram.id);
        if (element) {
          element.innerHTML = `
            <div class="text-red-600 p-4 border border-red-300 rounded bg-red-50">
              <p class="font-medium">Error rendering diagram:</p>
              <p class="text-sm mt-1">${err.message}</p>
              <pre class="text-xs mt-2 bg-gray-100 p-2 rounded overflow-auto">${diagram.code}</pre>
            </div>
          `;
        }
      }
    };

    renderWithScaling();
  }, [isLoaded, diagram, renderDiagram, mermaidTheme]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
      <div className="flex items-center justify-center" style={{ minHeight: '100%', minWidth: '100%' }}>
        <div id={diagram?.id} className="text-center">
          <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {isLoaded ? 'Rendering diagram...' : 'Loading Mermaid...'}
          </div>
        </div>
      </div>
    </div>
  );
};