import { useState } from 'react';
import { isValidFile, readFileAsText } from '../utils/fileHandler';

export const useFileHandler = () => {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = async (file) => {
    if (!isValidFile(file)) {
      throw new Error('Please select a markdown (.md or .markdown) file.');
    }
    
    const content = await readFileAsText(file);
    return { content, name: file.name };
  };

  const handleFileSelect = async (event, onFileLoad) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const { content, name } = await handleFileRead(file);
        setFileName(name);
        onFileLoad(content, name);
      } catch (error) {
        console.error('File upload error:', error.message);
      }
    }
  };

  const handleDragEvents = {
    onDragOver: (e) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (e) => {
      e.preventDefault();
      setIsDragging(false);
    },
    onDrop: async (e, onFileLoad) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file) {
        try {
          const { content, name } = await handleFileRead(file);
          setFileName(name);
          onFileLoad(content, name);
        } catch (error) {
          console.error('File drop error:', error.message);
        }
      }
    }
  };

  const resetFile = () => {
    setFileName('');
    setIsDragging(false);
  };

  return {
    fileName,
    isDragging,
    handleFileSelect,
    handleDragEvents,
    resetFile,
    setFileName
  };
};