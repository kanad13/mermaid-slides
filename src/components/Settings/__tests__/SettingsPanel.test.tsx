import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SettingsPanel } from '../SettingsPanel';

describe('SettingsPanel', () => {
  const defaultProps = {
    isDarkMode: false,
    autoHideEnabled: false,
    onAutoHideToggle: vi.fn(),
    isExtensionMode: false
  };

  it('should render settings button', () => {
    render(<SettingsPanel {...defaultProps} />);
    
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    expect(settingsButton).toBeInTheDocument();
  });

  it('should toggle auto-hide setting', () => {
    const onAutoHideToggleMock = vi.fn();
    
    render(
      <SettingsPanel 
        {...defaultProps} 
        onAutoHideToggle={onAutoHideToggleMock}
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Find the auto-hide toggle by test id
    const autoHideToggleButton = screen.getByTestId('auto-hide-toggle');
    fireEvent.click(autoHideToggleButton);
    
    expect(onAutoHideToggleMock).toHaveBeenCalledWith(true);
  });

  it('should show about button', () => {
    render(<SettingsPanel {...defaultProps} />);

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Check for about button
    const aboutButton = screen.getByText('About Mermaid Slides');
    expect(aboutButton).toBeInTheDocument();
  });

  it('should hide auto-hide setting in extension mode', () => {
    render(
      <SettingsPanel 
        {...defaultProps} 
        isExtensionMode={true}
      />
    );

    // Open settings panel
    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    fireEvent.click(settingsButton);

    // Auto-hide setting should not be visible in extension mode
    const autoHideText = screen.queryByText('Auto-hide Header');
    expect(autoHideText).not.toBeInTheDocument();
  });
});