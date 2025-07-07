export const StatusMessages = ({ error, isDarkMode }) => {
  return (
    <>
      {/* Error Display */}
      {error && (
        <div className={`mt-4 p-4 border rounded-lg ${
          isDarkMode
            ? 'bg-red-900 border-red-700 text-red-200'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="text-sm">{error}</p>
        </div>
      )}

    </>
  );
};