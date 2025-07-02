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
    if (!diagram) {return;}

    const renderContent = async () => {
      const element = document.getElementById(diagram.id);
      if (!element) return;

      try {
        if (diagram.type === 'image') {
          // Handle image rendering with proper centering
          element.innerHTML = `
            <img 
              src="${diagram.src}" 
              alt="${diagram.alt || 'Slide image'}" 
              style="max-width: 90vw; max-height: 80vh; object-fit: contain; display: block; margin: 0 auto;"
              onerror="this.style.display='none'; this.parentNode.innerHTML='<div style=&quot;color: #dc2626; padding: 1rem; border: 1px solid #fca5a5; border-radius: 0.375rem; background-color: #fef2f2; text-align: center;&quot;><p style=&quot;font-weight: 500;&quot;>Error loading image:</p><p style=&quot;font-size: 0.875rem; margin-top: 0.25rem;&quot;>${diagram.src}</p></div>'"
            />
          `;
        } else if (isLoaded) {
          // Handle Mermaid diagram rendering with better centering
          const svgElement = await renderDiagram(diagram.id, diagram.code);
          
          if (svgElement) {
            // Reset any previous styling
            element.style.cssText = '';
            svgElement.style.cssText = '';
            
            // Apply responsive sizing and centering
            svgElement.style.maxWidth = '90vw';
            svgElement.style.maxHeight = '80vh';
            svgElement.style.width = 'auto';
            svgElement.style.height = 'auto';
            svgElement.style.display = 'block';
            svgElement.style.margin = '0 auto';
          }
        }
      } catch (err) {
        console.error('Error rendering content:', err);
        element.innerHTML = `
          <div style="color: #dc2626; padding: 1rem; border: 1px solid #fca5a5; border-radius: 0.375rem; background-color: #fef2f2; text-align: center;">
            <p style="font-weight: 500;">Error rendering content:</p>
            <p style="font-size: 0.875rem; margin-top: 0.25rem;">${err.message}</p>
            <pre style="font-size: 0.75rem; margin-top: 0.5rem; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.375rem; overflow: auto; text-align: left;">${diagram.code || diagram.src}</pre>
          </div>
        `;
      }
    };

    renderContent();
  }, [isLoaded, diagram, renderDiagram, mermaidTheme]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
      <div id={diagram?.id} className="flex items-center justify-center min-h-full w-full">
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>
          {diagram?.type === 'image' ? 'Loading image...' : (isLoaded ? 'Rendering diagram...' : 'Loading Mermaid...')}
        </div>
      </div>
    </div>
  );
};