export const FileInput = ({ onFileSelect }) => {
  return (
    <input
      type="file"
      accept=".md,.markdown"
      onChange={onFileSelect}
      className="hidden"
      id="fileInput"
    />
  );
};