import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders editor by default', () => {
    render(<App />)
    
    // Should render the editor component initially
    expect(screen.getByText(/choose file/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /parse diagrams/i })).toBeInTheDocument()
  })

  it('has correct initial state', () => {
    render(<App />)
    
    // App should start in editor mode, not view mode
    expect(screen.queryByText(/back to editor/i)).not.toBeInTheDocument()
  })
})