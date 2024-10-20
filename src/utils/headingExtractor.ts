export const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const extractedHeadings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    extractedHeadings.push({
      id: match[2].toLowerCase().replace(/[^\w]+/g, '-'),
      title: match[2],
      level: match[1].length,
    });
  }
  return extractedHeadings;
};