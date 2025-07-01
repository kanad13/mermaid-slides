import { useState, useCallback } from 'react';

export const useViewerNavigation = (totalItems = 0) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGridView, setIsGridView] = useState(false);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : totalItems - 1);
  }, [totalItems]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => prev < totalItems - 1 ? prev + 1 : 0);
  }, [totalItems]);

  const goToFirst = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentIndex(totalItems - 1);
  }, [totalItems]);

  const goToIndex = useCallback((index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [totalItems]);

  const toggleGridView = useCallback(() => {
    setIsGridView(prev => !prev);
  }, []);

  const handleDiagramSelect = useCallback((index) => {
    setCurrentIndex(index);
    setIsGridView(false);
  }, []);

  // Reset when total items changes
  const resetNavigation = useCallback(() => {
    setCurrentIndex(0);
    setIsGridView(false);
  }, []);

  return {
    currentIndex,
    isGridView,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    goToIndex,
    toggleGridView,
    handleDiagramSelect,
    resetNavigation,
    setCurrentIndex,
    setIsGridView
  };
};