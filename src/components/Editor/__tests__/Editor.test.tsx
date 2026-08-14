import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Editor } from '../Editor';

const markdownWithOneDiagram = ['# Title', '', '```mermaid', 'graph TD', '  A-->B', '```', ''].join(
  '\n'
);

describe('Editor', () => {
  it('presents immediately after content is entered, without waiting for the debounce', async () => {
    const onViewDiagrams = vi.fn();
    render(<Editor onViewDiagrams={onViewDiagrams} />);

    const textarea = screen.getByPlaceholderText(/paste your markdown content/i);
    fireEvent.change(textarea, { target: { value: markdownWithOneDiagram } });

    // No waiting: this is the paste-then-click-instantly case that used to be
    // swallowed, because the click read a diagrams array that had not been
    // populated yet.
    fireEvent.click(screen.getByRole('button', { name: /start slideshow/i }));

    expect(onViewDiagrams).toHaveBeenCalledTimes(1);
    expect(onViewDiagrams.mock.calls[0][0]).toHaveLength(1);
    expect(onViewDiagrams.mock.calls[0][0][0]).toMatchObject({ type: 'flowchart' });
  });

  it('reports when the text contains no diagrams', async () => {
    render(<Editor onViewDiagrams={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/paste your markdown content/i), {
      target: { value: 'Just prose, no diagrams here.' }
    });

    await waitFor(() =>
      expect(screen.getByText(/no mermaid diagrams or images found/i)).toBeInTheDocument()
    );
  });

  it('loads the sample and can present it straight away', () => {
    const onViewDiagrams = vi.fn();
    render(<Editor onViewDiagrams={onViewDiagrams} />);

    fireEvent.click(screen.getByRole('button', { name: /load sample/i }));
    fireEvent.click(screen.getByRole('button', { name: /start slideshow/i }));

    expect(onViewDiagrams).toHaveBeenCalledTimes(1);
    expect(onViewDiagrams.mock.calls[0][0].length).toBeGreaterThan(1);
  });

  it('clears the editor', () => {
    render(<Editor onViewDiagrams={vi.fn()} />);

    const textarea = screen.getByPlaceholderText(/paste your markdown content/i);
    fireEvent.change(textarea, { target: { value: markdownWithOneDiagram } });
    expect(textarea).toHaveValue(markdownWithOneDiagram);

    fireEvent.click(screen.getByRole('button', { name: /clear input/i }));
    expect(textarea).toHaveValue('');
  });
});
