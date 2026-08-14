import { FileInputProps } from '../../../types/components';
export const FileInput = ({ onFileSelect }: FileInputProps) => {
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