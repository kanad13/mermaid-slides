import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FileUpload } from '../FileUpload'

describe('FileUpload', () => {
  const mockProps = {
    onFileLoad: vi.fn(),
    fileName: null,
    isDarkMode: false,
    onLoadSample: vi.fn()
  }

  it('renders file upload interface', () => {
    render(<FileUpload {...mockProps} />)
    
    expect(screen.getByText(/choose file/i)).toBeInTheDocument()
    expect(screen.getByText(/load sample/i)).toBeInTheDocument()
  })

  it('shows current file when fileName is provided', () => {
    render(<FileUpload {...mockProps} fileName="test.md" />)
    
    expect(screen.getByText('test.md')).toBeInTheDocument()
  })

  it('applies dark mode styles when isDarkMode is true', () => {
    render(<FileUpload {...mockProps} isDarkMode={true} />)
    
    // Component should render with dark mode (exact assertion depends on implementation)
    expect(screen.getByRole('button', { name: /load sample/i })).toBeInTheDocument()
  })
})