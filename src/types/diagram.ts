export interface Diagram {
  id: string;
  code: string;
  type?: DiagramType;
  src?: string; // For image diagrams
  alt?: string; // For image alt text
}

export type DiagramType = 'sequence' | 'er' | 'flowchart' | 'diagram' | 'gantt' | 'pie' | 'git' | 'class' | 'state' | 'image';

export interface FileInfo {
  name: string;
  content: string;
}