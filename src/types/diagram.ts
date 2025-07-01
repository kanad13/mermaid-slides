export interface Diagram {
  id: string;
  code: string;
  type?: DiagramType;
}

export type DiagramType = 'sequence' | 'er' | 'flowchart' | 'diagram' | 'gantt' | 'pie' | 'git' | 'class' | 'state';

export type MermaidTheme = 'default' | 'dark' | 'forest' | 'base' | 'neutral';

export interface FileInfo {
  name: string;
  content: string;
}

export interface ThemeState {
  isDarkMode: boolean;
  mermaidTheme: MermaidTheme;
}