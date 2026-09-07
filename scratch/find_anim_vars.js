const fs = require('fs');

const code = fs.readFileSync('scratch/home.mjs', 'utf8');

// Let's find definitions of uo, fo, mo, yo, bo, xo
const varNames = ['uo', 'fo', 'mo', 'yo', 'bo', 'xo', 'ho', 'go', '_o', 'Co'];
for (const v of varNames) {
  const re = new RegExp(`(?:var|let|const)\\s+${v}\\s*=|${v}\\s*=\\s*\\{`, 'g');
  let match;
  while ((match = re.exec(code)) !== null) {
    console.log(`=== DEF of ${v} at ${match.index} ===`);
    console.log(code.substring(match.index, match.index + 300));
  }
}
