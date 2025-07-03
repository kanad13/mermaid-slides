import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  it('initializes with default theme', () => {
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.mermaidTheme).toBe('default')
    expect(result.current.isDarkMode).toBe(false)
  })

  it('initializes with custom theme', () => {
    const { result } = renderHook(() => useTheme('dark'))
    
    expect(result.current.mermaidTheme).toBe('dark')
  })

  it('provides correct theme options', () => {
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.themeOptions).toEqual([
      { value: 'default', label: 'Default' },
      { value: 'dark', label: 'Dark' },
      { value: 'forest', label: 'Forest' },
      { value: 'base', label: 'Base' },
      { value: 'neutral', label: 'Neutral' }
    ])
  })

  it('changes mermaid theme', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setMermaidTheme('forest')
    })
    
    expect(result.current.mermaidTheme).toBe('forest')
  })

  it('toggles dark mode', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.isDarkMode).toBe(true)
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.isDarkMode).toBe(false)
  })

  it('sets dark mode directly', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setIsDarkMode(true)
    })
    
    expect(result.current.isDarkMode).toBe(true)
    
    act(() => {
      result.current.setIsDarkMode(false)
    })
    
    expect(result.current.isDarkMode).toBe(false)
  })

  it('gets selected theme correctly', () => {
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.getSelectedTheme()).toEqual({
      value: 'default',
      label: 'Default'
    })
    
    act(() => {
      result.current.setMermaidTheme('forest')
    })
    
    expect(result.current.getSelectedTheme()).toEqual({
      value: 'forest',
      label: 'Forest'
    })
  })

  it('returns undefined for invalid theme', () => {
    const { result } = renderHook(() => useTheme('invalid' as any))
    
    expect(result.current.getSelectedTheme()).toBeUndefined()
  })
})