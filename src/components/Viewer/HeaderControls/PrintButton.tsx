import { Printer, Loader2 } from 'lucide-react';

interface PrintButtonProps {
  onPrint: () => void;
  isPreparing?: boolean;
}

/**
 * Opens the browser's print dialog with the whole deck laid out one slide per
 * page, which is also how you get a PDF: every browser's print dialog offers
 * "Save as PDF" as a destination.
 *
 * Deliberately not a bespoke PDF generator. Doing it this way keeps the output
 * vector, keeps the text selectable, adds no dependency, and works offline —
 * and the alternative that produces better fidelity, rendering server-side,
 * would mean sending the user's deck somewhere, which this project does not do.
 */
export const PrintButton = ({ onPrint, isPreparing = false }: PrintButtonProps) => (
  <button
    onClick={onPrint}
    disabled={isPreparing}
    aria-label="Print or save the deck as PDF"
    title={isPreparing ? 'Preparing every slide…' : 'Print / Save as PDF'}
    className="flex items-center justify-center w-10 h-10 rounded-lg border transition-colors border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 disabled:opacity-60 disabled:cursor-wait"
  >
    {isPreparing ? (
      <Loader2 size={16} className="text-gray-500 animate-spin" />
    ) : (
      <Printer size={16} className="text-gray-500" />
    )}
  </button>
);
