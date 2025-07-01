export const parseMermaidDiagrams = (text) => {
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
  const foundDiagrams = [];
  let match;

  while ((match = mermaidRegex.exec(text)) !== null) {
    foundDiagrams.push({
      code: match[1].trim(),
      id: `mermaid-${foundDiagrams.length}`
    });
  }

  return foundDiagrams;
};

export const getDiagramType = (code) => {
  if (code.includes('sequenceDiagram')) {return 'sequence';}
  if (code.includes('erDiagram')) {return 'er';}
  if (code.includes('graph')) {return 'flowchart';}
  return 'diagram';
};