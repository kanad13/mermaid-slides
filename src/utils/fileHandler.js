export const isValidFile = (file) => {
  return file.type === 'text/markdown' || 
         file.name.endsWith('.md') || 
         file.name.endsWith('.markdown');
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};