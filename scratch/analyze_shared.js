const fs = require('fs');

const code = fs.readFileSync('scratch/shared-lib.CuTPCzbo.mjs', 'utf8');

// Find occurrences of "Aldena Studio"
let idx = 0;
while ((idx = code.indexOf('Aldena Studio', idx)) !== -1) {
  const start = Math.max(0, idx - 400);
  const end = Math.min(code.length, idx + 400);
  console.log('=== MATCH IN shared-lib AT', idx, '===');
  console.log(code.substring(start, end));
  idx += 13;
}

// Let's also check imports in shared-lib
const imports = [...code.matchAll(/import[^'"]+['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Imports in shared-lib:', imports);
