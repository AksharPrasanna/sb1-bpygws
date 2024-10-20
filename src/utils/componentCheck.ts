const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'components');

fs.readdirSync(componentsDir).forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const content = fs.readFileSync(path.join(componentsDir, file), 'utf-8');
    if (!content.includes('export default')) {
      console.error(`Warning: ${file} does not have a default export`);
    }
  }
});

console.log('Component export check completed.');