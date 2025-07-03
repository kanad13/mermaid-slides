import { describe, it, expect } from 'vitest'
import { parseMermaidDiagrams, getDiagramType } from '../mermaidParser'

describe('mermaidParser', () => {
  describe('parseMermaidDiagrams', () => {
    it('extracts mermaid diagrams from markdown text', () => {
      const markdown = `
# Title

Some text

\`\`\`mermaid
graph TD
    A --> B
\`\`\`

More text

\`\`\`mermaid
sequenceDiagram
    A->>B: Hello
\`\`\`
      `
      
      const diagrams = parseMermaidDiagrams(markdown)
      
      expect(diagrams).toHaveLength(2)
      expect(diagrams[0].code).toBe('graph TD\n    A --> B')
      expect(diagrams[0].type).toBe('flowchart')
      expect(diagrams[1].code).toBe('sequenceDiagram\n    A->>B: Hello')
      expect(diagrams[1].type).toBe('sequence')
    })

    it('extracts image references from markdown', () => {
      const markdown = `
# Title

![Alt text](image1.png)

Some text

![Another image](path/to/image2.jpg)
      `
      
      const diagrams = parseMermaidDiagrams(markdown)
      
      expect(diagrams).toHaveLength(2)
      expect(diagrams[0].type).toBe('image')
      expect(diagrams[0].src).toBe('image1.png')
      expect(diagrams[0].alt).toBe('Alt text')
      expect(diagrams[1].src).toBe('path/to/image2.jpg')
    })

    it('returns empty array for text without diagrams', () => {
      const markdown = 'Just some plain text without any diagrams'
      const diagrams = parseMermaidDiagrams(markdown)
      
      expect(diagrams).toHaveLength(0)
    })
  })

  describe('getDiagramType', () => {
    it('correctly identifies sequence diagrams', () => {
      expect(getDiagramType('sequenceDiagram\nA->>B: Hello')).toBe('sequence')
    })

    it('correctly identifies flowchart diagrams', () => {
      expect(getDiagramType('graph TD\nA --> B')).toBe('flowchart')
    })

    it('correctly identifies ER diagrams', () => {
      expect(getDiagramType('erDiagram\nUSER { id int }')).toBe('er')
    })

    it('defaults to diagram for unknown types', () => {
      expect(getDiagramType('unknown diagram type')).toBe('diagram')
    })
  })
})