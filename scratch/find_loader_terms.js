const fs = require('fs');

const main = fs.readFileSync('scratch/main.mjs', 'utf8');
const home = fs.readFileSync('scratch/home.mjs', 'utf8');

function findTerms(src, name) {
  const terms = ['preloader', 'loader', 'preload', 'curtain', 'splash', 'intro', 'z-index: 99', 'z-index:99', 'zIndex: 99', 'fixed', '100vh', '100vw'];
  console.log(`=== In ${name} ===`);
  for (const term of terms) {
    let count = 0;
    let idx = 0;
    while ((idx = src.indexOf(term, idx)) !== -1) {
      count++;
      if (count <= 3) {
        console.log(`  Match '${term}' at ${idx}:`, src.substring(Math.max(0, idx - 50), Math.min(src.length, idx + 100)));
      }
      idx += term.length;
    }
    if (count > 3) console.log(`  ... total ${count} matches for '${term}'`);
  }
}

findTerms(main, 'main.mjs');
findTerms(home, 'home.mjs');
