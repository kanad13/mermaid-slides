import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GridView } from '../../components/Viewer/GridView';
import { clearMermaidCache } from '../useMermaid';
import { parseMermaidDiagrams } from '../../utils/mermaidParser';

/**
 * Tests against the real Mermaid library rather than the stub the rest of the
 * suite uses (see src/test/setup.ts).
 *
 * Scope is deliberately narrow. Mermaid needs SVG layout APIs — getBBox,
 * getComputedTextLength — that jsdom does not implement, so a *successful*
 * render cannot be exercised here; attempts simply hang. Parse failures happen
 * before any of that, which is exactly the path with the cleanup bug worth
 * pinning.
 *
 * Verifying successful rendering needs a real browser. That is tracked in the
 * work plan rather than faked here: a test that cannot fail is worse than no
 * test.
 */
vi.unmock('mermaid');

/** Mermaid appends its scratch container as `d` + the id it was given. */
const mermaidScratchNodes = () =>
  [...document.body.children].filter((n) => /^d(grid-|mermaid-)/.test(n.id));

describe('useMermaid with the real Mermaid library', () => {
  beforeEach(() => {
    clearMermaidCache();
    mermaidScratchNodes().forEach((n) => n.remove());
  });

  it('leaves no scratch container behind when a diagram fails to parse', async () => {
    const diagrams = parseMermaidDiagrams('```mermaid\ngraph TD\n  A --> ((( nonsense\n```');

    render(<GridView diagrams={diagrams} currentIndex={0} onDiagramSelect={() => {}} />);

    await waitFor(() => expect(document.body.textContent).toContain('Error'), {
      timeout: 15000
    });

    // Mermaid removes this itself on success but not on failure, so each
    // malformed diagram used to add an orphaned error graphic to the page.
    expect(mermaidScratchNodes()).toHaveLength(0);
  }, 20000);

  it('does not accumulate scratch containers across repeated failures', async () => {
    const diagrams = parseMermaidDiagrams('```mermaid\ngraph TD\n  A --> ((( nonsense\n```');

    for (let i = 0; i < 3; i++) {
      const view = render(
        <GridView diagrams={diagrams} currentIndex={0} onDiagramSelect={() => {}} />
      );
      await waitFor(() => expect(document.body.textContent).toContain('Error'), {
        timeout: 15000
      });
      view.unmount();
    }

    expect(mermaidScratchNodes()).toHaveLength(0);
  }, 40000);
});
