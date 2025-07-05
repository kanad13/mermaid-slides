import { useState, useEffect, useCallback, useRef } from 'react';

interface UseAutoHideOptions {
  timeout?: number; // milliseconds
  initiallyVisible?: boolean;
}

interface UseAutoHideReturn {
  isVisible: boolean;
  showControls: () => void;
  hideControls: () => void;
  resetTimer: () => void;
}

export const useAutoHide = ({
  timeout = 5000,
  initiallyVisible = true
}: UseAutoHideOptions = {}): UseAutoHideReturn => {
  const [isVisible, setIsVisible] = useState(initiallyVisible);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const hideControls = useCallback(() => {
    setIsVisible(false);
    clearExistingTimeout();
  }, [clearExistingTimeout]);

  const showControls = useCallback(() => {
    setIsVisible(true);
    clearExistingTimeout();
  }, [clearExistingTimeout]);

  const resetTimer = useCallback(() => {
    clearExistingTimeout();
    setIsVisible(true);
    
    // Only set timeout if timeout > 0
    if (timeout > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
    }
  }, [timeout, clearExistingTimeout]);

  // Set up activity listeners
  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
    };

    // Listen for mouse movement, clicks, and key presses
    const events = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Start the initial timer
    resetTimer();

    return () => {
      clearExistingTimeout();
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer, clearExistingTimeout]);

  return {
    isVisible,
    showControls,
    hideControls,
    resetTimer
  };
};