import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { KeyboardShortcutsHelp } from '../KeyboardShortcutsHelp'

// Mock timers
vi.useFakeTimers()

describe('KeyboardShortcutsHelp', () => {
  beforeEach(() => {
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
    vi.useFakeTimers()
  })

  it('renders navigation hints initially', () => {
    render(<KeyboardShortcutsHelp isDarkMode={false} />)
    
    expect(screen.getByText('← → Navigate • ESC Exit')).toBeInTheDocument()
  })

  it('applies dark mode styles correctly', () => {
    render(<KeyboardShortcutsHelp isDarkMode={true} />)
    
    const hint = screen.getByText('← → Navigate • ESC Exit')
    expect(hint).toHaveClass('bg-gray-800/80', 'border-gray-600', 'text-gray-300')
  })

  it('applies light mode styles correctly', () => {
    render(<KeyboardShortcutsHelp isDarkMode={false} />)
    
    const hint = screen.getByText('← → Navigate • ESC Exit')
    expect(hint).toHaveClass('bg-white/80', 'border-gray-200', 'text-gray-600')
  })

  it('auto-hides after 3 seconds', async () => {
    render(<KeyboardShortcutsHelp isDarkMode={false} />)
    
    // Initially visible
    expect(screen.getByText('← → Navigate • ESC Exit')).toBeInTheDocument()
    
    // Fast-forward time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    
    // Should be hidden (opacity-0 class applied)
    const hint = screen.getByText('← → Navigate • ESC Exit')
    expect(hint).toHaveClass('opacity-0')
  })

  it('has smooth transition classes', () => {
    render(<KeyboardShortcutsHelp isDarkMode={false} />)
    
    const hint = screen.getByText('← → Navigate • ESC Exit')
    expect(hint).toHaveClass('transition-all', 'duration-500')
  })
})