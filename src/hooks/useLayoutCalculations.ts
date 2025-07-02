import { useState, useEffect, useCallback } from 'react';

interface LayoutCalculations {
  availableHeight: string;
  availableWidth: string;
  navigationHeight: number;
}

/**
 * useLayoutCalculations Hook
 * 
 * Calculates optimal content sizing for both Mermaid diagrams and images.
 * Ensures consistent layout by accounting for header and navigation space,
 * preventing content from being obscured by UI elements.
 * 
 * Used by DiagramViewer to provide responsive sizing for mixed content presentations.
 */
export const useLayoutCalculations = (hasNavigation: boolean = true): LayoutCalculations => {
  const [calculations, setCalculations] = useState<LayoutCalculations>({
    availableHeight: '80vh',
    availableWidth: '90vw',
    navigationHeight: 0
  });

  const calculateLayout = useCallback(() => {
    if (!hasNavigation) {
      setCalculations({
        availableHeight: '90vh',
        availableWidth: '95vw',
        navigationHeight: 0
      });
      return;
    }

    // Simple and consistent approach: reserve space for navigation
    // Navigation controls need about 100px (more conservative than before)
    const navigationHeight = 100;

    setCalculations({
      availableHeight: 'calc(100vh - 120px)', // Reserve 120px for header + navigation
      availableWidth: '90vw',
      navigationHeight
    });
  }, [hasNavigation]);

  useEffect(() => {
    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, [calculateLayout]);

  return calculations;
};