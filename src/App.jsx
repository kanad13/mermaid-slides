import { useState } from 'react';
import { Editor } from './components/Editor/Editor';
import { Viewer } from './components/Viewer/Viewer';

function App() {
  const [isViewMode, setIsViewMode] = useState(false);
  const [diagrams, setDiagrams] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleViewDiagrams = (extractedDiagrams) => {
    setDiagrams(extractedDiagrams);
    setIsViewMode(true);
  };

  const handleBackToEditor = () => {
    setIsViewMode(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isViewMode && diagrams.length > 0) {
    return (
      <Viewer
        diagrams={diagrams}
        onBackToEditor={handleBackToEditor}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <Editor
      onViewDiagrams={handleViewDiagrams}
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
    />
  );
}

export default App;