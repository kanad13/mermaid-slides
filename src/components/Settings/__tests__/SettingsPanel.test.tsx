import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SettingsPanel } from '../SettingsPanel';
import { MermaidTheme } from '../../../types/diagram';

describe('SettingsPanel Theme Selection', () => {
  const defaultProps = {
    isDarkMode: false,
    mermaidTheme: 'default' as MermaidTheme,
    onThemeChange: vi.fn(),
    autoHideEnabled: false,
    onAutoHideToggle: vi.fn(),
    isExtensionMode: false
  };

  it('should call onThemeChange with correct theme when theme button is clicked', () => {
    const onThemeChangeMock = vi.fn();
    
    render(
      <SettingsPanel 
        {...defaultProps} 
        onThemeChange={onThemeChangeMock}
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Click on 'Dark' theme button
    const darkThemeButton = screen.getByRole('button', { name: 'Dark' });
    fireEvent.click(darkThemeButton);

    // Verify that onThemeChange was called with 'dark'
    expect(onThemeChangeMock).toHaveBeenCalledWith('dark');
  });

  it('should call onThemeChange with correct theme for all theme options', () => {
    const onThemeChangeMock = vi.fn();
    
    render(
      <SettingsPanel 
        {...defaultProps} 
        onThemeChange={onThemeChangeMock}
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Test all theme options
    const themeTests = [
      { buttonName: 'Default', expectedValue: 'default' },
      { buttonName: 'Dark', expectedValue: 'dark' },
      { buttonName: 'Forest', expectedValue: 'forest' },
      { buttonName: 'Base', expectedValue: 'base' },
      { buttonName: 'Neutral', expectedValue: 'neutral' }
    ];

    themeTests.forEach((test, index) => {
      const themeButton = screen.getByRole('button', { name: test.buttonName });
      fireEvent.click(themeButton);
      
      // Verify that onThemeChange was called with the correct value
      expect(onThemeChangeMock).toHaveBeenNthCalledWith(index + 1, test.expectedValue);
    });

    // Verify that onThemeChange was called 5 times total
    expect(onThemeChangeMock).toHaveBeenCalledTimes(5);
  });

  it('should highlight the currently selected theme', () => {
    render(
      <SettingsPanel 
        {...defaultProps} 
        mermaidTheme="dark"
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // The 'Dark' button should have active styling
    const darkThemeButton = screen.getByRole('button', { name: 'Dark' });
    expect(darkThemeButton.className).toContain('bg-blue-50');
  });

  it('should have correct theme option values and labels', () => {
    render(
      <SettingsPanel 
        {...defaultProps}
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Check that all expected theme buttons are present
    const expectedThemes = ['Default', 'Dark', 'Forest', 'Base', 'Neutral'];
    
    expectedThemes.forEach(themeName => {
      const themeButton = screen.getByRole('button', { name: themeName });
      expect(themeButton).toBeInTheDocument();
    });
  });
});