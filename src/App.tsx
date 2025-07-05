import { useState } from 'react';
import { Editor } from './components/Editor/Editor';
import { Viewer } from './components/Viewer/Viewer';
import { Diagram } from './types/diagram';

function App() {
  const [isViewMode, setIsViewMode] = useState(false);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [isDarkMode] = useState(false);

  const handleViewDiagrams = (extractedDiagrams: Diagram[]) => {
    setDiagrams(extractedDiagrams);
    setIsViewMode(true);
  };

  const handleBackToEditor = () => {
    setIsViewMode(false);
  };


  if (isViewMode && diagrams.length > 0) {
    return (
      <Viewer
        diagrams={diagrams}
        onBackToEditor={handleBackToEditor}
        isDarkMode={isDarkMode}
        autoHideEnabled={true}
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