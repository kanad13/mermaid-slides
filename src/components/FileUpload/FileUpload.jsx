import { useFileHandler } from '../../hooks/useFileHandler';
import { DropZone } from './FileUploadComponents/DropZone';
import { FileInput } from './FileUploadComponents/FileInput';
import { ActionButtons } from './FileUploadComponents/ActionButtons';
import { CurrentFileDisplay } from './FileUploadComponents/CurrentFileDisplay';

export const FileUpload = ({ onFileLoad, fileName, isDarkMode, onLoadSample }) => {
  const { isDragging, handleFileSelect, handleDragEvents } = useFileHandler();

  const handleFileSelectWrapper = (event) => {
    handleFileSelect(event, onFileLoad);
  };

  const handleDropWrapper = (e) => {
    handleDragEvents.onDrop(e, onFileLoad);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <DropZone 
          isDragging={isDragging}
          isDarkMode={isDarkMode}
          onDragOver={handleDragEvents.onDragOver}
          onDragLeave={handleDragEvents.onDragLeave}
          onDrop={handleDropWrapper}
        />
        
        <FileInput onFileSelect={handleFileSelectWrapper} />
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <ActionButtons 
            onLoadSample={onLoadSample}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <CurrentFileDisplay 
        fileName={fileName}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};