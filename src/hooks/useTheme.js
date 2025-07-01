import { useState, useCallback, useMemo } from 'react';

export const useTheme = (initialTheme = 'default') => {
  const [mermaidTheme, setMermaidTheme] = useState(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeOptions = useMemo(() => [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'forest', label: 'Forest' },
    { value: 'base', label: 'Base' },
    { value: 'neutral', label: 'Neutral' }
  ], []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const changeMermaidTheme = useCallback((theme) => {
    setMermaidTheme(theme);
  }, []);

  const getSelectedTheme = useCallback(() => {
    return themeOptions.find(option => option.value === mermaidTheme);
  }, [mermaidTheme, themeOptions]);

  return {
    mermaidTheme,
    isDarkMode,
    themeOptions,
    setMermaidTheme: changeMermaidTheme,
    setIsDarkMode,
    toggleDarkMode,
    getSelectedTheme
  };
};