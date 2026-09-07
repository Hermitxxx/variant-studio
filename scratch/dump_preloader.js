const fs = require('fs');

const code = fs.readFileSync('scratch/main.mjs', 'utf8');

const preloaderSnippet = code.substring(59000, 66000);
fs.writeFileSync('scratch/preloader_snippet.js', preloaderSnippet);

console.log('Saved preloader_snippet.js, length:', preloaderSnippet.length);
