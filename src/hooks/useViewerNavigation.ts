import { useState, useCallback } from 'react';

interface UseViewerNavigationReturn {
  currentIndex: number;
  isGridView: boolean;
  goToPrevious: () => void;
  goToNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
  toggleGridView: () => void;
  handleDiagramSelect: (_index: number) => void;
}

export const useViewerNavigation = (totalItems: number = 0): UseViewerNavigationReturn => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isGridView, setIsGridView] = useState<boolean>(false);

  const goToPrevious = useCallback((): void => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : totalItems - 1);
  }, [totalItems]);

  const goToNext = useCallback((): void => {
    setCurrentIndex(prev => prev < totalItems - 1 ? prev + 1 : 0);
  }, [totalItems]);

  const goToFirst = useCallback((): void => {
    setCurrentIndex(0);
  }, []);

  const goToLast = useCallback((): void => {
    setCurrentIndex(totalItems - 1);
  }, [totalItems]);

  const toggleGridView = useCallback((): void => {
    setIsGridView(prev => !prev);
  }, []);

  const handleDiagramSelect = useCallback((index: number): void => {
    setCurrentIndex(index);
    setIsGridView(false);
  }, []);

  return {
    currentIndex,
    isGridView,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    toggleGridView,
    handleDiagramSelect
  };
};