import { useState } from 'react';
import { isValidFile, readFileAsText } from '../utils/fileHandler';

interface FileResult {
  content: string;
  name: string;
}

interface FileSelectionEvent {
  target: {
    files?: ArrayLike<File> | null;
  };
}

interface PreventableEvent {
  preventDefault: () => void;
}

interface FileDropEvent extends PreventableEvent {
  dataTransfer: {
    files: ArrayLike<File>;
  };
}

interface DragEvents {
  onDragOver: (_event: PreventableEvent) => void;
  onDragLeave: (_event: PreventableEvent) => void;
  onDrop: (_event: FileDropEvent, _onFileLoad: (_content: string, _name: string) => void) => Promise<void>;
}

interface UseFileHandlerReturn {
  fileName: string;
  isDragging: boolean;
  handleFileSelect: (_event: FileSelectionEvent, _onFileLoad: (_content: string, _name: string) => void) => Promise<void>;
  handleDragEvents: DragEvents;
  resetFile: () => void;
  setFileName: (_name: string) => void;
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

  const handleFileSelect = async (event: FileSelectionEvent, onFileLoad: (_content: string, _name: string) => void): Promise<void> => {
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
    onDragOver: (e: PreventableEvent) => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: (e: PreventableEvent) => {
      e.preventDefault();
      setIsDragging(false);
    },
    onDrop: async (e: FileDropEvent, onFileLoad: (_content: string, _name: string) => void) => {
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
