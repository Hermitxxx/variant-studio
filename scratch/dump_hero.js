const fs = require('fs');

const code = fs.readFileSync('scratch/home.mjs', 'utf8');

const heroSnippet = code.substring(135000, 148000);
fs.writeFileSync('scratch/hero_snippet.js', heroSnippet);

console.log('Written hero_snippet.js, size:', heroSnippet.length);
