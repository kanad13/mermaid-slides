import { FileText } from 'lucide-react';

export const BackButton = ({ onBackToEditor, isDarkMode, isExtensionMode = false }) => {
  const buttonText = isExtensionMode ? 'Focus Editor' : 'Back to Editor';
  
  return (
    <button
      onClick={onBackToEditor}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:scale-105 transform ${
        isDarkMode
          ? 'bg-gray-700 hover:bg-gray-600 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      <FileText size={18} />
      <span className="font-medium">{buttonText}</span>
    </button>
  );
};