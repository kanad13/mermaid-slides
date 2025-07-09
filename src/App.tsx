import { useState } from 'react';
import { Editor } from './components/Editor/Editor';
import { Viewer } from './components/Viewer/Viewer';
import { Diagram } from './types/diagram';

function App() {
  const [isViewMode, setIsViewMode] = useState(false);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);

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
        autoHideEnabled={false}
      />
    );
  }

  return (
    <Editor
      onViewDiagrams={handleViewDiagrams}
    />
  );
}

export default App;