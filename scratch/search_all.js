const fs = require('fs');

const files = fs.readdirSync('scratch').filter(f => f.endsWith('.mjs') || f.endsWith('.html'));

for (const f of files) {
  const content = fs.readFileSync(`scratch/${f}`, 'utf8');
  let idx = 0;
  while ((idx = content.indexOf('Aldena Studio', idx)) !== -1) {
    console.log(`=== In ${f} at ${idx} ===`);
    console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 200)));
    idx += 13;
  }
}
