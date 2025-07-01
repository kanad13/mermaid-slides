import { useState, useCallback, useMemo } from 'react';
import { MermaidTheme } from '../types/diagram';

interface ThemeOption {
  value: MermaidTheme;
  label: string;
}

interface UseThemeReturn {
  mermaidTheme: MermaidTheme;
  isDarkMode: boolean;
  themeOptions: ThemeOption[];
  setMermaidTheme: (theme: MermaidTheme) => void;
  setIsDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;
  getSelectedTheme: () => ThemeOption | undefined;
}

export const useTheme = (initialTheme: MermaidTheme = 'default'): UseThemeReturn => {
  const [mermaidTheme, setMermaidTheme] = useState<MermaidTheme>(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const themeOptions = useMemo<ThemeOption[]>(() => [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'forest', label: 'Forest' },
    { value: 'base', label: 'Base' },
    { value: 'neutral', label: 'Neutral' }
  ], []);

  const toggleDarkMode = useCallback((): void => {
    setIsDarkMode(prev => !prev);
  }, []);

  const changeMermaidTheme = useCallback((theme: MermaidTheme): void => {
    setMermaidTheme(theme);
  }, []);

  const getSelectedTheme = useCallback((): ThemeOption | undefined => {
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