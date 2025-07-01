import { Diagram, DiagramType } from '../types/diagram';

export const parseMermaidDiagrams = (text: string): Diagram[] => {
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  const foundDiagrams: Diagram[] = [];
  let match: RegExpExecArray | null;

  while ((match = mermaidRegex.exec(text)) !== null) {
    const code = match[1].trim();
    foundDiagrams.push({
      code,
      id: `mermaid-${foundDiagrams.length}`,
      type: getDiagramType(code)
    });
  }

  return foundDiagrams;
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