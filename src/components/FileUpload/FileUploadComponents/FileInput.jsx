export const FileInput = ({ onFileSelect }) => {
  return (
    <input
      type="file"
      accept=".md,.txt,.markdown"
      onChange={onFileSelect}
      className="hidden"
      id="fileInput"
    />
  );
};