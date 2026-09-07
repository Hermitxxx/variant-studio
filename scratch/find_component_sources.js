const fs = require('fs');

const code = fs.readFileSync('scratch/home.mjs', 'utf8');

const imports = [...code.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)];
for (const imp of imports) {
  if (imp[1].includes('Le')) {
    console.log(`Le imported from: ${imp[2]}`);
  }
  if (imp[1].includes('Ca')) {
    console.log(`Ca imported from: ${imp[2]}`);
  }
  if (imp[1].includes('Da')) {
    console.log(`Da imported from: ${imp[2]}`);
  }
}
