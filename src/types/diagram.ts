export interface Diagram {
  id: string;
  code: string;
}

export type DiagramType = 'sequence' | 'er' | 'flowchart' | 'diagram';