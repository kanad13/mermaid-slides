import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FileUpload } from '../FileUpload'

describe('FileUpload', () => {
  const mockProps = {
    onFileLoad: vi.fn(),
    onLoadSample: vi.fn(),
    onViewDiagrams: vi.fn(),
    onClear: vi.fn(),
    hasMarkdown: false
  }

  it('renders file upload interface', () => {
    render(<FileUpload {...mockProps} />)
    
    expect(screen.getByText(/choose file/i)).toBeInTheDocument()
    expect(screen.getByText(/load sample/i)).toBeInTheDocument()
  })

})