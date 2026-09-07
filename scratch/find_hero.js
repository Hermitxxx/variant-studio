const fs = require('fs');

const html = fs.readFileSync('scratch/aldena.html', 'utf8');

// Find occurrences of "Aldena Studio"
let idx = 0;
while ((idx = html.indexOf('Aldena Studio', idx)) !== -1) {
  const start = Math.max(0, idx - 400);
  const end = Math.min(html.length, idx + 400);
  console.log('=== MATCH AT', idx, '===');
  console.log(html.substring(start, end));
  idx += 13;
}
