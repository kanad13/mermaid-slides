import { useEffect } from 'react';
import { useMermaid } from '../../hooks/useMermaid';
import { getDiagramType } from '../../utils/mermaidParser';

export const GridView = ({ 
  diagrams, 
  currentIndex, 
  isDarkMode, 
  onDiagramSelect,
  isExtensionMode = false
}) => {
  const { isLoaded, renderDiagram } = useMermaid();

  useEffect(() => {
    if (diagrams.length === 0) {return;}

    const renderGridContent = async () => {
      for (let i = 0; i < diagrams.length; i++) {
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
                  onerror="this.style.display='none'; this.parentNode.innerHTML='<div class=&quot;w-full h-full flex items-center justify-center&quot;><div class=&quot;text-red-500 text-xs&quot;>Image Error</div></div>'"
                />
              </div>
            `;
          } else if (isLoaded) {
            // Render Mermaid diagram
            const svgElement = await renderDiagram(gridId, diagram.code);
            
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.maxHeight = '100%';
              svgElement.style.transform = 'scale(0.8)';
              svgElement.style.transformOrigin = 'center center';
            }
          }
        } catch (err) {
          console.error(`Error rendering grid content ${i}:`, err);
          element.innerHTML = `<div class="text-red-500 text-xs">Error</div>`;
        }
      }
    };

    setTimeout(renderGridContent, 100);
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
                : isDarkMode
                ? 'border-gray-600 hover:border-gray-500 bg-gray-800'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
            onClick={() => onDiagramSelect(index)}
          >
            <div className="mb-3">
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {diagram.type === 'image' ? 'Image' : 'Diagram'} {index + 1}
              </span>
              <span className={`ml-2 text-xs px-2 py-1 rounded ${
                isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
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