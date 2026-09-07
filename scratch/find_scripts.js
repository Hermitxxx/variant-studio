const fs = require('fs');

const html = fs.readFileSync('scratch/aldena.html', 'utf8');

const scriptTags = [...html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
console.log('Script tags:', scriptTags);

const inlineScripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log('Inline scripts count:', inlineScripts.length);
inlineScripts.forEach((s, i) => {
  console.log(`Inline script #${i} length:`, s.length);
  if (s.includes('chunk') || s.includes('framerusercontent') || s.includes('script')) {
    console.log(`Snippet #${i}:`, s.slice(0, 300));
  }
});
