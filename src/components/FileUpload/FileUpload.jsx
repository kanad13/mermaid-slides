import { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { isValidFile, readFileAsText } from '../../utils/fileHandler';

export const FileUpload = ({ onFileLoad, fileName, isDarkMode, onLoadSample }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileRead = async (file) => {
    try {
      if (!isValidFile(file)) {
        throw new Error('Please select a markdown (.md) or text (.txt) file.');
      }
      
      const content = await readFileAsText(file);
      onFileLoad(content, file.name);
    } catch (error) {
      throw error;
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await handleFileRead(file);
      } catch (error) {
        console.error('File upload error:', error.message);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];

    if (file) {
      try {
        await handleFileRead(file);
      } catch (error) {
        console.error('File drop error:', error.message);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : isDarkMode
            ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
            : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <Upload 
            size={48} 
            className={`${
              isDragging 
                ? 'text-blue-500' 
                : isDarkMode 
                ? 'text-gray-400' 
                : 'text-gray-400'
            }`} 
          />
          <div>
            <p className={`text-lg font-medium ${
              isDragging 
                ? 'text-blue-700' 
                : isDarkMode 
                ? 'text-gray-200' 
                : 'text-gray-700'
            }`}>
              {isDragging ? 'Drop your file here' : 'Drop markdown file here or click to browse'}
            </p>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Supports .md and .txt files
            </p>
          </div>
          <input
            type="file"
            accept=".md,.txt,.markdown"
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
          />
          <div className="flex space-x-3">
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              Choose File
            </label>
            <button
              onClick={onLoadSample}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Load Sample
            </button>
          </div>
        </div>
      </div>

      {fileName && (
        <div className={`flex items-center space-x-2 text-sm px-3 py-2 rounded-lg ${
          isDarkMode
            ? 'text-gray-300 bg-gray-700'
            : 'text-gray-600 bg-gray-50'
        }`}>
          <FileText size={16} />
          <span>Current file: <strong>{fileName}</strong></span>
        </div>
      )}
    </div>
  );
};