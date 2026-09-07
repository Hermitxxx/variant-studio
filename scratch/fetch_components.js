const fs = require('fs');

const files = [
  'Xv3sINF4z.Bp2ddvwA.mjs',
  'hrCrLMiBW.DDg83aBZ.mjs',
  'hzLZCSpRd.BOV491xp.mjs',
  'NDP4nNH52.CulVhYm5.mjs',
  'wZQtiQe9n.PTHjobrT.mjs',
  'shared-lib.CuTPCzbo.mjs'
];

async function main() {
  const baseUrl = 'https://framerusercontent.com/sites/7Kr7Q3mPHFkKHuJPRGA3sS/';
  for (const f of files) {
    const res = await fetch(baseUrl + f);
    const content = await res.text();
    fs.writeFileSync(`scratch/${f}`, content);
    console.log(`Saved ${f}, size: ${content.length}`);
    if (content.includes('Aldena Studio') || content.includes('Creative Agency')) {
      console.log(`>>> MATCH in ${f}!`);
    }
  }
}

main().catch(console.error);
