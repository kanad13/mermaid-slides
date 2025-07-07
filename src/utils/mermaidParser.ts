import { Diagram, DiagramType } from '../types/diagram';

export const parseMermaidDiagrams = (text: string): Diagram[] => {
  const diagrams: Diagram[] = [];
  const lines = text.split('\n');
  
  // Track the most recent header for title extraction
  let currentTitle: string | undefined;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for markdown headers (h1-h6)
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      currentTitle = headerMatch[2].trim();
      continue;
    }
    
    // Check for mermaid diagram start
    if (line.trim() === '```mermaid') {
      // Find the end of the mermaid block
      let endIndex = i + 1;
      while (endIndex < lines.length && lines[endIndex].trim() !== '```') {
        endIndex++;
      }
      
      if (endIndex < lines.length) {
        // Extract the mermaid code
        const code = lines.slice(i + 1, endIndex).join('\n').trim();
        diagrams.push({
          code,
          id: `mermaid-${diagrams.length}`,
          type: getDiagramType(code),
          title: currentTitle
        });
        
        // Reset title after use (optional - depends on desired behavior)
        currentTitle = undefined;
        i = endIndex; // Skip to after the closing ```
      }
      continue;
    }
    
    // Check for image markdown
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imageMatch) {
      const alt = imageMatch[1];
      const src = imageMatch[2];
      diagrams.push({
        code: '', // Empty code for images
        id: `image-${diagrams.length}`,
        type: 'image',
        src,
        alt,
        title: currentTitle
      });
      
      // Reset title after use (optional - depends on desired behavior)
      currentTitle = undefined;
    }
  }

  return diagrams;
};

export const getDiagramType = (code: string): DiagramType => {
  if (code.includes('sequenceDiagram')) { return 'sequence'; }
  if (code.includes('erDiagram')) { return 'er'; }
  if (code.includes('graph')) { return 'flowchart'; }
  if (code.includes('gantt')) { return 'gantt'; }
  if (code.includes('pie')) { return 'pie'; }
  if (code.includes('gitGraph')) { return 'git'; }
  if (code.includes('classDiagram')) { return 'class'; }
  if (code.includes('stateDiagram')) { return 'state'; }
  return 'diagram';
};