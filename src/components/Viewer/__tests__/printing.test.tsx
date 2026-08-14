import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Viewer } from '../Viewer';
import { parseMermaidDiagrams } from '../../../utils/mermaidParser';

const deck = parseMermaidDiagrams(
  [
    '# First',
    '',
    '```mermaid',
    'graph TD',
    '  A-->B',
    '```',
    '',
    '# Second',
    '',
    '![a picture](local.png)',
    ''
  ].join('\n')
);

const printButton = () => screen.getByRole('button', { name: /print or save the deck as pdf/i });

describe('printing the deck', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.removeAttribute('data-print-ready');
  });

  it('does not build the print deck until asked', () => {
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    expect(document.querySelector('.print-deck')).not.toBeInTheDocument();
    // The print stylesheet keys off this attribute, so a stray Ctrl+P before
    // preparing prints the current slide rather than a blank page.
    expect(document.documentElement.hasAttribute('data-print-ready')).toBe(false);
  });

  it('lays out every slide, one section per page', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    fireEvent.click(printButton());

    await waitFor(() => expect(document.querySelector('.print-deck')).toBeInTheDocument());
    await waitFor(() =>
      expect(document.querySelectorAll('.print-slide')).toHaveLength(deck.length)
    );
  });

  it('carries slide titles and images into the printed deck', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    fireEvent.click(printButton());

    await waitFor(() => expect(document.querySelector('.print-deck')).toBeInTheDocument());

    const titles = [...document.querySelectorAll('.print-slide-title')].map((n) => n.textContent);
    expect(titles).toContain('First');
    expect(titles).toContain('Second');

    const img = document.querySelector('.print-slide-body img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('local.png');
  });

  it('opens the print dialog once the deck is ready, and marks the document', async () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    fireEvent.click(printButton());

    await waitFor(() =>
      expect(document.documentElement.hasAttribute('data-print-ready')).toBe(true)
    );
    await waitFor(() => expect(printSpy).toHaveBeenCalledTimes(1), { timeout: 3000 });
  });

  it('tears the deck down again when the dialog closes', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    fireEvent.click(printButton());
    await waitFor(() =>
      expect(document.documentElement.hasAttribute('data-print-ready')).toBe(true)
    );

    act(() => {
      window.dispatchEvent(new Event('afterprint'));
    });

    await waitFor(() => expect(document.querySelector('.print-deck')).not.toBeInTheDocument());
    expect(document.documentElement.hasAttribute('data-print-ready')).toBe(false);
  });

  it('disables the button while the deck is being prepared', async () => {
    vi.spyOn(window, 'print').mockImplementation(() => {});
    render(<Viewer diagrams={deck} onBackToEditor={() => {}} />);

    fireEvent.click(printButton());

    await waitFor(() => expect(printButton()).toBeDisabled());
  });
});
