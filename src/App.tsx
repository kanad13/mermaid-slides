import { useState } from 'react';
import { Editor } from './components/Editor/Editor';
import { Viewer } from './components/Viewer/Viewer';
import { Diagram } from './types/diagram';

function App() {
  const [isViewMode, setIsViewMode] = useState(false);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleViewDiagrams = (extractedDiagrams: Diagram[]) => {
    setDiagrams(extractedDiagrams);
    setIsViewMode(true);
  };

  const handleBackToEditor = () => {
    setIsViewMode(false);
  };

  // Dark mode toggle - can be used later for UI controls
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isViewMode && diagrams.length > 0) {
    return (
      <Viewer
        diagrams={diagrams}
        onBackToEditor={handleBackToEditor}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <Editor
      onViewDiagrams={handleViewDiagrams}
      isDarkMode={isDarkMode}
    />
  );
}

export default App;