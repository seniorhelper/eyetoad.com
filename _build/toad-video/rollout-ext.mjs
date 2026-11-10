// node rollout-ext.mjs <siteDir> <anchor> <KICK> <H2> <SUB>  — CSP-safe variant (external css/js, eyetoad-hosted media)
import fs from 'fs'; import path from 'path'; import { execFileSync } from 'child_process';
const [dir, anchor, KICK, H2, SUB] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
for (const f of ['toad-video.css', 'toad-video.js']) fs.copyFileSync(path.join(here, f), path.join(dir, 'assets', f));
const idx = path.join(dir, 'index.html');
execFileSync('node', [path.join(here, 'insert.mjs'), idx, anchor, 'https://eyetoad.com/media/toad', KICK, H2, SUB], { env: { ...process.env, TPL: './snippet-ext.html' }, stdio: 'inherit' });
let h = fs.readFileSync(idx, 'utf8');
if (!h.includes('/assets/toad-video.css')) {
  const links = [...h.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)]; const last = links[links.length - 1];
  const at = last.index + last[0].length; h = h.slice(0, at) + '\n<link rel="stylesheet" href="/assets/toad-video.css?v=1">' + h.slice(at);
}
h = h.replace(/(Content-Security-Policy" content="[^"]*)/, csp => csp
  .replace(/img-src ([^;]*)/, (m, v) => v.includes('https://eyetoad.com') ? m : `img-src ${v} https://eyetoad.com`)
  .replace(/media-src ([^;]*)/, (m, v) => v.includes('https://eyetoad.com') ? m : `media-src ${v} https://eyetoad.com`));
fs.writeFileSync(idx, h); console.log('done ' + dir);
