export const EditorHeader = ({ isDarkMode }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Mermaid Slides
        </h1>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Transform your markdown mermaid diagrams into beautiful presentation slides.
        </p>
      </div>
    </div>
  );
};