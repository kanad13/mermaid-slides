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
    constructor(public parts: BlobPart[], public name: string, public options?: FilePropertyBag) {}
    text() {
      return Promise.resolve(this.parts.join(''))
    }
  }
})

Object.defineProperty(window, 'FileReader', {
  value: class MockFileReader {
    result: string | null = null
    readAsText(file: File) {
      setTimeout(() => {
        this.result = 'mock file content'
        this.onload?.({ target: this } as any)
      }, 0)
    }
    onload: ((event: ProgressEvent<FileReader>) => void) | null = null
  }
})