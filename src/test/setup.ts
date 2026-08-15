import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock mermaid module to avoid initialization issues in tests
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg>test</svg>' }),
    mermaidAPI: {
      render: vi.fn().mockResolvedValue('<svg>test</svg>')
    }
  }
}))

// Mock file operations for testing
Object.defineProperty(window, 'File', {
  value: class MockFile {
    parts: BlobPart[]
    name: string
    options?: FilePropertyBag

    constructor(parts: BlobPart[], name: string, options?: FilePropertyBag) {
      this.parts = parts
      this.name = name
      this.options = options
    }

    text() {
      return Promise.resolve(this.parts.join(''))
    }
  }
})

Object.defineProperty(window, 'FileReader', {
  value: class MockFileReader {
    result: string | null = null
    onload: ((_event: ProgressEvent<FileReader>) => void) | null = null

    readAsText(_file: File) {
      setTimeout(() => {
        this.result = 'mock file content'
        if (this.onload) {
          const mockEvent = new ProgressEvent('load') as ProgressEvent<FileReader>
          Object.defineProperty(mockEvent, 'target', { value: this })
          this.onload(mockEvent)
        }
      }, 0)
    }
  }
})
