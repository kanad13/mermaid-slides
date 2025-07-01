import { useState } from 'react';
import { isValidFile, readFileAsText } from '../utils/fileHandler';

interface FileResult {
  content: string;
  name: string;
}

interface DragEvents {
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, onFileLoad: (content: string, name: string) => void) => Promise<void>;
}

interface UseFileHandlerReturn {
  fileName: string;
  isDragging: boolean;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>, onFileLoad: (content: string, name: string) => void) => Promise<void>;
  handleDragEvents: DragEvents;
  resetFile: () => void;
  setFileName: (name: string) => void;
}

export const useFileHandler = (): UseFileHandlerReturn => {
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileRead = async (file: File): Promise<FileResult> => {
    if (!isValidFile(file)) {
      throw new Error('Please select a markdown (.md or .markdown) file.');
    }
    
    const content = await readFileAsText(file);
    return { content, name: file.name };
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>, onFileLoad: (content: string, name: string) => void): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const { content, name } = await handleFileRead(file);
        setFileName(name);
        onFileLoad(content, name);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('File upload error:', errorMessage);
      }
    }
  };

  const handleDragEvents: DragEvents = {
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    onDrop: async (e: React.DragEvent<HTMLDivElement>, onFileLoad: (content: string, name: string) => void) => {
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
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('File drop error:', errorMessage);
        }
      }
    }
  };

  const resetFile = (): void => {
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