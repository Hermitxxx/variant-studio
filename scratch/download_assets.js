const fs = require('fs');
const path = require('path');

async function download(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  console.log(`Downloading ${url} to ${dest}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log(`Saved ${dest} (${buffer.length} bytes)`);
}

async function main() {
  await download(
    'https://framerusercontent.com/images/9951CPntYdpWiH0n13bQWSiI.png?width=2400&height=1800',
    'public/images/hero-bg.png'
  );
  await download(
    'https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256',
    'public/images/noise.png'
  );
  console.log('All assets downloaded successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
