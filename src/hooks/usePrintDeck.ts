import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePrintDeckReturn {
  /** True while the whole deck is being drawn for print. */
  isPreparing: boolean;
  /** True once every slide has drawn and the print layout should apply. */
  isPrintReady: boolean;
  startPrinting: () => void;
  handleDeckReady: () => void;
}

/**
 * Drives printing the whole deck.
 *
 * Printing is a three-step affair because the browser's print dialog is
 * synchronous and drawing the deck is not. Clicking Print mounts every slide
 * off-screen; when they report back, the print layout is switched on and the
 * dialog opened; afterwards everything is torn down again.
 *
 * That is also why the print stylesheet keys off an attribute rather than
 * applying unconditionally. If it always hid the app, pressing Ctrl+P without
 * going through the button would print a blank page. Instead the browser's own
 * shortcut prints what is on screen — the current slide — which is a reasonable
 * thing to get, and the button is what produces the deck.
 */
export const usePrintDeck = (): UsePrintDeckReturn => {
  const [isPreparing, setIsPreparing] = useState(false);
  const [isPrintReady, setIsPrintReady] = useState(false);
  const printedRef = useRef(false);

  const startPrinting = useCallback(() => {
    printedRef.current = false;
    setIsPreparing(true);
  }, []);

  const handleDeckReady = useCallback(() => {
    // The deck can report ready more than once across render passes; only the
    // first should open a dialog.
    if (printedRef.current) {
      return;
    }
    printedRef.current = true;
    setIsPrintReady(true);
  }, []);

  useEffect(() => {
    if (!isPrintReady) {
      return undefined;
    }

    // A timer rather than requestAnimationFrame: rAF is suspended while a tab
    // is in the background, so the dialog would simply never open. The delay
    // only needs to let the print layout apply before the dialog samples the
    // page.
    const open = setTimeout(() => {
      window.print();
    }, 50);

    const teardown = () => {
      setIsPrintReady(false);
      setIsPreparing(false);
    };

    window.addEventListener('afterprint', teardown);

    return () => {
      clearTimeout(open);
      window.removeEventListener('afterprint', teardown);
    };
  }, [isPrintReady]);

  // Not every browser fires afterprint. Without a fallback the deck would stay
  // mounted off-screen indefinitely, re-rendering on every navigation.
  useEffect(() => {
    if (!isPreparing) {
      return undefined;
    }

    const bail = setTimeout(() => {
      setIsPrintReady(false);
      setIsPreparing(false);
    }, 60000);

    return () => clearTimeout(bail);
  }, [isPreparing]);

  return { isPreparing, isPrintReady, startPrinting, handleDeckReady };
};
