const fs = require('fs');

async function main() {
  const res = await fetch('https://aldena.framer.media/');
  const html = await res.text();
  fs.writeFileSync('scratch/aldena.html', html);
  
  const imgMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/images\/[^"'()\s]+/g)].map(m => m[0]);
  console.log('Unique Images count:', new Set(imgMatches).size);
  fs.writeFileSync('scratch/images.json', JSON.stringify([...new Set(imgMatches)], null, 2));

  const scriptMatches = [...html.matchAll(/https:\/\/framerusercontent\.com\/modules\/[^"'()\s]+\.mjs/g)].map(m => m[0]);
  console.log('Unique modules count:', new Set(scriptMatches).size);
  fs.writeFileSync('scratch/modules.json', JSON.stringify([...new Set(scriptMatches)], null, 2));

  // Let's find fonts and css
  const fontMatches = [...html.matchAll(/https:\/\/[^"'()\s]+\.(?:woff2|woff|ttf)/g)].map(m => m[0]);
  fs.writeFileSync('scratch/fonts.json', JSON.stringify([...new Set(fontMatches)], null, 2));
  
  console.log('Saved aldena.html, images.json, modules.json, fonts.json');
}

main().catch(console.error);
