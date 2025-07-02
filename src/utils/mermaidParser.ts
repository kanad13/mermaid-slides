import { Diagram, DiagramType } from '../types/diagram';

export const parseMermaidDiagrams = (text: string): Diagram[] => {
  const diagrams: Diagram[] = [];
  
  // Parse Mermaid diagrams
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  let mermaidMatch: RegExpExecArray | null;

  while ((mermaidMatch = mermaidRegex.exec(text)) !== null) {
    const code = mermaidMatch[1].trim();
    diagrams.push({
      code,
      id: `mermaid-${diagrams.length}`,
      type: getDiagramType(code)
    });
  }

  // Parse image tags
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let imageMatch: RegExpExecArray | null;

  while ((imageMatch = imageRegex.exec(text)) !== null) {
    const alt = imageMatch[1];
    const src = imageMatch[2];
    diagrams.push({
      code: '', // Empty code for images
      id: `image-${diagrams.length}`,
      type: 'image',
      src,
      alt
    });
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