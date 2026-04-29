import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EditorHeader } from '../EditorHeader';

describe('EditorHeader', () => {
  it('shows the VS Code tools section', () => {
    render(<EditorHeader />);

    expect(screen.getByText(/vs code tools/i)).toBeInTheDocument();
    expect(
      screen.getByText(/present mermaid-only or full markdown decks inside vs code/i)
    ).toBeInTheDocument();
  });

  it('links to the live VS Code presentation tools', () => {
    render(<EditorHeader />);

    expect(
      screen.getByRole('link', { name: 'Mermaid Slideshow' })
    ).toHaveAttribute(
      'href',
      'https://marketplace.visualstudio.com/items?itemName=KunalPathak.mermaid-slideshow'
    );

    expect(
      screen.getByRole('link', { name: 'Markdown Presentation Tool' })
    ).toHaveAttribute(
      'href',
      'https://marketplace.visualstudio.com/items?itemName=KunalPathak.markdown-presentation-tool'
    );
  });
});
