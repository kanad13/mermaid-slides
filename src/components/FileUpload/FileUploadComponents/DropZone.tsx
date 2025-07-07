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
      className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : isDarkMode
          ? 'border-gray-600 hover:border-gray-500'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="text-center">
        {isDragging && (
          <p className="text-sm text-blue-700 mb-4">
            Drop your markdown file here
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};