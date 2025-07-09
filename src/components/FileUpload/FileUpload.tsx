import React from 'react';
import { useFileHandler } from '../../hooks/useFileHandler';
import { DropZone } from './FileUploadComponents/DropZone';
import { FileInput } from './FileUploadComponents/FileInput';
import { ActionButtons } from './FileUploadComponents/ActionButtons';
import { FileUploadProps } from '../../types/components';

export const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, onLoadSample, onViewDiagrams, onClear, hasMarkdown }) => {
  const { isDragging, handleFileSelect, handleDragEvents } = useFileHandler();

  const handleFileSelectWrapper = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleFileSelect(event, onFileLoad);
  };

  const handleDropWrapper = (e: React.DragEvent<HTMLDivElement>): void => {
    handleDragEvents.onDrop(e, onFileLoad);
  };

  return (
    <div className="space-y-4">
      <DropZone 
        isDragging={isDragging}
        onDragOver={handleDragEvents.onDragOver}
        onDragLeave={handleDragEvents.onDragLeave}
        onDrop={handleDropWrapper}
      >
        <FileInput onFileSelect={handleFileSelectWrapper} />
        <ActionButtons 
          onLoadSample={onLoadSample}
          onViewDiagrams={onViewDiagrams}
          onClear={onClear}
          hasMarkdown={hasMarkdown}
        />
      </DropZone>

    </div>
  );
};