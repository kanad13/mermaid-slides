import '@testing-library/jest-dom'

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
          // Create a minimal ProgressEvent-like object for the mock
          const mockEvent = { target: this } as ProgressEvent<FileReader>
          this.onload(mockEvent)
        }
      }, 0)
    }
  }
})