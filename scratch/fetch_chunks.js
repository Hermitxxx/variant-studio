const fs = require('fs');

async function main() {
  const mainUrl = 'https://framerusercontent.com/sites/7Kr7Q3mPHFkKHuJPRGA3sS/script_main.Bs48Mhus.mjs';
  const res = await fetch(mainUrl);
  const code = await res.text();
  fs.writeFileSync('scratch/main.mjs', code);
  console.log('Saved main.mjs, length:', code.length);

  const chunkMatches = [...code.matchAll(/https:\/\/framerusercontent\.com\/[^"'()\s]+\.mjs/g)].map(m => m[0]);
  console.log('Chunk URLs:', [...new Set(chunkMatches)]);
}

main().catch(console.error);
