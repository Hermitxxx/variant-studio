const fs = require('fs');

async function main() {
  const url = 'https://framerusercontent.com/sites/7Kr7Q3mPHFkKHuJPRGA3sS/YFE2cfnKurgeGaNzM_YFMesGEDRSV685L6B8UH6_RNU.Dnl1EfRC.mjs';
  const res = await fetch(url);
  const code = await res.text();
  fs.writeFileSync('scratch/home.mjs', code);
  console.log('Saved home.mjs, length:', code.length);

  // Search for Aldena Studio, preloader, hero, background image, etc.
  console.log('Aldena Studio in home.mjs:', code.indexOf('Aldena Studio'));
  console.log('Creative Agency in home.mjs:', code.indexOf('Creative Agency'));

  const imgMatches = [...code.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'()\s]+/g)].map(m => m[0]);
  console.log('Unique images in home.mjs:', [...new Set(imgMatches)]);
}

main().catch(console.error);
