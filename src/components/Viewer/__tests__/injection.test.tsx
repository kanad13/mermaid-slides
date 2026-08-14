import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DiagramViewer } from '../DiagramViewer';
import { GridView } from '../GridView';
import { parseMermaidDiagrams } from '../../../utils/mermaidParser';

/**
 * Markdown is untrusted input, so nothing derived from it may be interpreted as
 * markup.
 *
 * The Content-Security-Policy stops injected script from running, but it does
 * not stop injected *markup*. A `<meta http-equiv="refresh">` smuggled through
 * an image alt attribute navigates the page away with no script involved, which
 * is exactly what an audit of the previous string-building implementation
 * found. These tests pin the fix: attributes are set as values, never parsed.
 */
describe('markdown injection', () => {
  const payload =
    '![x"><meta http-equiv="refresh" content="0;url=http://example.invalid/"><span data-y="](broken.png)';

  it('parses the payload into alt and src rather than rejecting it', () => {
    const [diagram] = parseMermaidDiagrams(payload);

    // The parser is permissive by design; safety is the renderer's job.
    expect(diagram.type).toBe('image');
    expect(diagram.alt).toContain('meta http-equiv');
  });

  it('does not create a meta refresh element in the single-slide view', async () => {
    const [diagram] = parseMermaidDiagrams(payload);
    const { container } = render(<DiagramViewer diagram={diagram} />);

    await waitFor(() => expect(container.querySelector('img')).toBeInTheDocument());

    expect(document.querySelectorAll('meta[http-equiv]')).toHaveLength(0);
    expect(container.querySelectorAll('span[data-y]')).toHaveLength(0);
  });

  it('keeps the payload as a literal attribute value, not markup', async () => {
    const [diagram] = parseMermaidDiagrams(payload);
    const { container } = render(<DiagramViewer diagram={diagram} />);

    await waitFor(() => expect(container.querySelector('img')).toBeInTheDocument());

    const img = container.querySelector('img') as HTMLImageElement;
    // The whole injected string survives as text inside the attribute, which is
    // what proves it was never parsed.
    expect(img.getAttribute('alt')).toContain('<meta http-equiv="refresh"');
    expect(img.getAttribute('src')).toBe('broken.png');
  });

  it('does not create a meta refresh element in grid view', async () => {
    const [diagram] = parseMermaidDiagrams(payload);
    const { container } = render(
      <GridView diagrams={[diagram]} currentIndex={0} onDiagramSelect={() => {}} />
    );

    await waitFor(() => expect(container.querySelector('img')).toBeInTheDocument());

    expect(document.querySelectorAll('meta[http-equiv]')).toHaveLength(0);
    expect(container.querySelectorAll('span[data-y]')).toHaveLength(0);
  });

  it('shows the error card, not raw markup, when an image fails to load', async () => {
    const [diagram] = parseMermaidDiagrams('![alt text](does-not-exist.png)');
    const { container } = render(<DiagramViewer diagram={diagram} />);

    const img = (await waitFor(() =>
      container.querySelector('img')
    )) as HTMLImageElement;
    img.dispatchEvent(new Event('error'));

    await waitFor(() =>
      expect(screen.getByText('Error loading image:')).toBeInTheDocument()
    );
    expect(screen.getByText('does-not-exist.png')).toBeInTheDocument();
  });
});
