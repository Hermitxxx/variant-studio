const fs = require('fs');

const code = fs.readFileSync('scratch/main.mjs', 'utf8');

// Check import statements
const imports = [...code.matchAll(/import[^'"]+['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Static imports count:', imports.length);
console.log('Imports:', imports);

// Check dynamic imports
const dynImports = [...code.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g)].map(m => m[1]);
console.log('Dynamic imports:', dynImports);

// Check routes or page mappings
const routes = [...code.matchAll(/\"\/[^\"]*\"/g)].map(m => m[0]);
console.log('Routes snippet:', routes.slice(0, 20));
