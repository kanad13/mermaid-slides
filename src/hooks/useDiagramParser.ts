import { useCallback, useState } from 'react';
import { parseMermaidDiagrams } from '../utils/mermaidParser';

interface UseDiagramParserReturn {
  /** Message to show the author about the text they are editing, or '' if it is fine. */
  error: string;
  checkDiagrams: (_markdownText: string) => void;
  clearError: () => void;
}

/**
 * Reports whether some markdown will produce a slideshow.
 *
 * This exists only to drive the editor's status message. It deliberately does
 * not hold the parsed diagrams: presenting parses the current text directly,
 * because reading a debounced result made "paste, then click immediately" do
 * nothing at all.
 *
 * `checkDiagrams` is stable. When it was recreated on each render, the editor's
 * effect depended on a new function every time, so parsing rescheduled itself
 * indefinitely — an audit measured three parses of unchanged text in 750ms,
 * continuing forever. Keeping only a string in state matters for the same
 * reason: React bails out of a re-render when a string is unchanged, whereas a
 * freshly parsed array is never equal to the previous one.
 */
export const useDiagramParser = (): UseDiagramParserReturn => {
  const [error, setError] = useState<string>('');

  const checkDiagrams = useCallback((markdownText: string): void => {
    if (!markdownText.trim()) {
      setError('');
      return;
    }

    try {
      const extracted = parseMermaidDiagrams(markdownText);
      setError(
        extracted.length === 0
          ? 'No mermaid diagrams or images found in the markdown text.'
          : ''
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError('Error parsing markdown: ' + message);
    }
  }, []);

  const clearError = useCallback((): void => {
    setError('');
  }, []);

  return { error, checkDiagrams, clearError };
};
