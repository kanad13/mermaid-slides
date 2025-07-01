import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  isActive: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  onEscape?: () => void;
}

export const useKeyboardNavigation = ({
  isActive,
  onPrevious,
  onNext,
  onFirst,
  onLast,
  onEscape
}: UseKeyboardNavigationProps): void => {
  useEffect(() => {
    if (!isActive) { return; }

    const handleKeyPress = (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowLeft': {
          e.preventDefault();
          onPrevious?.();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          onNext?.();
          break;
        }
        case 'Home': {
          e.preventDefault();
          onFirst?.();
          break;
        }
        case 'End': {
          e.preventDefault();
          onLast?.();
          break;
        }
        case 'Escape': {
          e.preventDefault();
          onEscape?.();
          break;
        }
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isActive, onPrevious, onNext, onFirst, onLast, onEscape]);
};