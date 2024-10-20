import { useState, useEffect } from 'react';

export const useMarkdownContent = (contentPath: string | undefined) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (contentPath) {
      fetch(contentPath)
        .then(response => response.text())
        .then(text => {
          // Remove the first heading (title) from the content
          const contentWithoutTitle = text.replace(/^#\s+.*\n/, '');
          setContent(contentWithoutTitle);
        })
        .catch(error => console.error('Error loading markdown:', error));
    }
  }, [contentPath]);

  return content;
};