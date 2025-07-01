export const ActionButtons = ({ onLoadSample, isDarkMode }) => {
  return (
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
  );
};