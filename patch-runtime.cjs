const fs = require('fs');
const path = '.vercel/output/functions/fn.func/.vc-config.json';
try {
  const cfg = JSON.parse(fs.readFileSync(path, 'utf8'));
  cfg.runtime = 'nodejs20.x';
  fs.writeFileSync(path, JSON.stringify(cfg, null, '\t') + '\n');
  console.log('Runtime patched to nodejs20.x');
} catch (e) {
  console.error('Failed to patch runtime:', e.message);
}
