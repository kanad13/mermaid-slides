import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Editor } from '../Editor';
import * as parser from '../../../utils/mermaidParser';

/**
 * Background parsing must settle.
 *
 * The editor's effect depended on a function the parser hook recreated on every
 * render, so each parse re-rendered, which re-ran the effect, which scheduled
 * another parse. An audit measured three parses of unchanged text within 750ms,
 * continuing indefinitely — a permanent timer in an idle tab.
 */
describe('background parsing settles', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  it('parses once for one unchanged edit, and then stops', async () => {
    const parseSpy = vi.spyOn(parser, 'parseMermaidDiagrams');
    render(<Editor onViewDiagrams={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/paste your markdown content/i), {
      target: { value: '# T\n\n```mermaid\ngraph TD\n  A-->B\n```\n' }
    });

    // Let the debounce fire and give any self-rescheduling loop several further
    // windows to reveal itself.
    await waitFor(() => expect(parseSpy).toHaveBeenCalled());
    await wait(750);

    expect(parseSpy).toHaveBeenCalledTimes(1);
  });

  it('stays settled while the tab is idle', async () => {
    const parseSpy = vi.spyOn(parser, 'parseMermaidDiagrams');
    render(<Editor onViewDiagrams={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText(/paste your markdown content/i), {
      target: { value: 'prose with no diagrams' }
    });

    await waitFor(() => expect(parseSpy).toHaveBeenCalled());
    const afterFirstSettle = parseSpy.mock.calls.length;

    await wait(750);

    expect(parseSpy).toHaveBeenCalledTimes(afterFirstSettle);
  });

  it('debounces a burst of keystrokes into a single parse', async () => {
    const parseSpy = vi.spyOn(parser, 'parseMermaidDiagrams');
    render(<Editor onViewDiagrams={vi.fn()} />);
    const textarea = screen.getByPlaceholderText(/paste your markdown content/i);

    for (const value of ['a', 'ab', 'abc', 'abcd', 'abcde']) {
      fireEvent.change(textarea, { target: { value } });
    }

    await waitFor(() => expect(parseSpy).toHaveBeenCalled());
    await wait(400);

    expect(parseSpy).toHaveBeenCalledTimes(1);
  });
});
