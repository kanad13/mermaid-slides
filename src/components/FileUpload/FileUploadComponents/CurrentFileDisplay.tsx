import { FileText } from 'lucide-react';

export const CurrentFileDisplay = ({ fileName }) => {
  if (!fileName) {return null;}

  return (
    <div className="flex items-center space-x-2 text-sm px-3 py-2 rounded-lg text-gray-600 bg-gray-50">
      <FileText size={16} />
      <span>Current file: <strong>{fileName}</strong></span>
    </div>
  );
};