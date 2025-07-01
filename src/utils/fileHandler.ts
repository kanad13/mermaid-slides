export const isValidFile = (file: File): boolean => {
  return file.type === 'text/markdown' || 
         file.name.endsWith('.md') || 
         file.name.endsWith('.markdown') ||
         file.type === 'text/plain' ||
         file.name.endsWith('.txt');
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('File content is not text'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};