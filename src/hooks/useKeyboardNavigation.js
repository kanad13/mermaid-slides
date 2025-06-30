import { useEffect } from 'react';

export const useKeyboardNavigation = ({
  isActive,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  onEscape
}) => {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onPrevious?.();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext?.();
          break;
        case 'Home':
          e.preventDefault();
          onFirst?.();
          break;
        case 'End':
          e.preventDefault();
          onLast?.();
          break;
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, onPrevious, onNext, onFirst, onLast, onEscape]);
};