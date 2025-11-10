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
    readAsText(_file: File) {
      setTimeout(() => {
        this.result = 'mock file content'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onload?.({ target: this } as any)
      }, 0)
    }
    onload: ((_event: ProgressEvent<FileReader>) => void) | null = null
  }
})