import { Upload } from 'lucide-react';

export const DropZone = ({ 
  isDragging, 
  isDarkMode, 
  onDragOver, 
  onDragLeave, 
  onDrop,
  children
}) => {
  return (
    <div
      className={`border border-dashed rounded-md p-4 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : isDarkMode
          ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
          : 'border-gray-300 hover:border-gray-400 bg-white'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center space-y-2">
        <Upload 
          size={32} 
          className={`${
            isDragging 
              ? 'text-blue-500' 
              : isDarkMode 
              ? 'text-gray-400' 
              : 'text-gray-400'
          }`} 
        />
        <div>
          <p className={`text-base font-medium ${
            isDragging 
              ? 'text-blue-700' 
              : isDarkMode 
              ? 'text-gray-200' 
              : 'text-gray-700'
          }`}>
            {isDragging ? 'Drop your file here' : 'Drop markdown file here or click to browse'}
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supports .md and .markdown files
          </p>
        </div>
        
        {children}
      </div>
    </div>
  );
};