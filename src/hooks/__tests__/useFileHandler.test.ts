import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileHandler } from '../useFileHandler'

// Mock the fileHandler utilities
vi.mock('../../utils/fileHandler', () => ({
  isValidFile: vi.fn().mockReturnValue(true),
  readFileAsText: vi.fn().mockResolvedValue('mock file content')
}))

describe('useFileHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useFileHandler())
    
    expect(result.current.fileName).toBe('')
    expect(result.current.isDragging).toBe(false)
  })

  it('handles file selection correctly', async () => {
    const { result } = renderHook(() => useFileHandler())
    const mockOnFileLoad = vi.fn()
    
    const mockFile = new File(['test content'], 'test.md', { type: 'text/markdown' })
    const mockEvent = {
      target: { files: [mockFile] }
    } as any

    await act(async () => {
      await result.current.handleFileSelect(mockEvent, mockOnFileLoad)
    })

    expect(result.current.fileName).toBe('test.md')
    expect(mockOnFileLoad).toHaveBeenCalledWith('mock file content', 'test.md')
  })

  it('handles drag events correctly', () => {
    const { result } = renderHook(() => useFileHandler())
    
    const mockEvent = { preventDefault: vi.fn() } as any

    act(() => {
      result.current.handleDragEvents.onDragOver(mockEvent)
    })
    
    expect(result.current.isDragging).toBe(true)
    expect(mockEvent.preventDefault).toHaveBeenCalled()

    act(() => {
      result.current.handleDragEvents.onDragLeave(mockEvent)
    })
    
    expect(result.current.isDragging).toBe(false)
  })

  it('handles file drop correctly', async () => {
    const { result } = renderHook(() => useFileHandler())
    const mockOnFileLoad = vi.fn()
    
    const mockFile = new File(['test content'], 'dropped.md', { type: 'text/markdown' })
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { files: [mockFile] }
    } as any

    await act(async () => {
      await result.current.handleDragEvents.onDrop(mockEvent, mockOnFileLoad)
    })

    expect(result.current.fileName).toBe('dropped.md')
    expect(result.current.isDragging).toBe(false)
    expect(mockOnFileLoad).toHaveBeenCalledWith('mock file content', 'dropped.md')
  })

  it('resets file state', () => {
    const { result } = renderHook(() => useFileHandler())
    
    // First set some state
    act(() => {
      result.current.setFileName('test.md')
    })
    
    expect(result.current.fileName).toBe('test.md')
    
    // Then reset
    act(() => {
      result.current.resetFile()
    })
    
    expect(result.current.fileName).toBe('')
    expect(result.current.isDragging).toBe(false)
  })
})