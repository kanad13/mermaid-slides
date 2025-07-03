import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useViewerNavigation } from '../useViewerNavigation'

describe('useViewerNavigation', () => {
  const totalItems = 5

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isGridView).toBe(false)
  })

  it('navigates to next diagram correctly', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    act(() => {
      result.current.goToNext()
    })
    
    expect(result.current.currentIndex).toBe(1)
  })

  it('wraps to first diagram when at last diagram', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    // Go to last diagram
    act(() => {
      result.current.goToLast()
    })
    
    expect(result.current.currentIndex).toBe(4)
    
    // Go to next should wrap to first
    act(() => {
      result.current.goToNext()
    })
    
    expect(result.current.currentIndex).toBe(0)
  })

  it('navigates to previous diagram correctly', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    // Start at index 2
    act(() => {
      result.current.goToIndex(2)
    })
    
    act(() => {
      result.current.goToPrevious()
    })
    
    expect(result.current.currentIndex).toBe(1)
  })

  it('wraps to last diagram when at first diagram', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    // Should start at 0, go previous should wrap to last
    act(() => {
      result.current.goToPrevious()
    })
    
    expect(result.current.currentIndex).toBe(4)
  })

  it('navigates to first and last diagrams', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    act(() => {
      result.current.goToLast()
    })
    
    expect(result.current.currentIndex).toBe(4)
    
    act(() => {
      result.current.goToFirst()
    })
    
    expect(result.current.currentIndex).toBe(0)
  })

  it('navigates to specific index', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    act(() => {
      result.current.goToIndex(3)
    })
    
    expect(result.current.currentIndex).toBe(3)
  })

  it('ignores invalid index navigation', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    act(() => {
      result.current.goToIndex(-1)
    })
    
    expect(result.current.currentIndex).toBe(0)
    
    act(() => {
      result.current.goToIndex(10)
    })
    
    expect(result.current.currentIndex).toBe(0)
  })

  it('toggles grid view', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    act(() => {
      result.current.toggleGridView()
    })
    
    expect(result.current.isGridView).toBe(true)
    
    act(() => {
      result.current.toggleGridView()
    })
    
    expect(result.current.isGridView).toBe(false)
  })

  it('handles diagram selection', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    // Enable grid view first
    act(() => {
      result.current.toggleGridView()
    })
    
    expect(result.current.isGridView).toBe(true)
    
    // Select diagram should set index and exit grid view
    act(() => {
      result.current.handleDiagramSelect(2)
    })
    
    expect(result.current.currentIndex).toBe(2)
    expect(result.current.isGridView).toBe(false)
  })

  it('resets navigation state', () => {
    const { result } = renderHook(() => useViewerNavigation(totalItems))
    
    // Set some state
    act(() => {
      result.current.goToIndex(3)
      result.current.toggleGridView()
    })
    
    expect(result.current.currentIndex).toBe(3)
    expect(result.current.isGridView).toBe(true)
    
    // Reset
    act(() => {
      result.current.resetNavigation()
    })
    
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isGridView).toBe(false)
  })
})