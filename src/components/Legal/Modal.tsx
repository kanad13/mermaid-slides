import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  onClose: () => void;
  /** Tailwind max-width class; policy text wants more room than a notice does. */
  widthClassName?: string;
  children: React.ReactNode;
}

/**
 * Dialog shell for the legal documents.
 *
 * Escape closes it, which the previous hand-built version did not support. A
 * full focus trap is deliberately not implemented here; that belongs with the
 * wider accessibility pass rather than being half-done in one component.
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  onClose,
  widthClassName = 'max-w-2xl',
  children
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        // The viewer also listens for Escape to leave presentation mode. The
        // modal is only ever open over the editor, but stopping propagation
        // keeps that from becoming a surprise later.
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`bg-white rounded-lg shadow-lg ${widthClassName} max-h-[80vh] overflow-y-auto m-4 text-gray-900`}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="text-gray-500 hover:text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};
