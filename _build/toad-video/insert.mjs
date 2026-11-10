// node insert.mjs <file> <anchor-string-before-which-to-insert> <M> <KICK> <H2> <SUB>
import fs from 'fs';
const [file, anchor, M, KICK, H2, SUB] = process.argv.slice(2);
const tpl = fs.readFileSync(new URL(process.env.TPL || './snippet.html', import.meta.url), 'utf8').replace(/^(<!--.*-->\r?\n)+/, '');
let html = fs.readFileSync(file, 'utf8');
if (html.includes('id="toad-video"')) { console.log('already present'); process.exit(0); }
const n = html.split(anchor).length - 1;
if (n !== 1) { console.error('anchor matches ' + n + ' times'); process.exit(1); }
const block = tpl.replaceAll('{{M}}', M).replaceAll('{{KICK}}', KICK).replaceAll('{{H2}}', H2).replaceAll('{{SUB}}', SUB);
fs.writeFileSync(file, html.replace(anchor, block + anchor));
console.log('inserted into ' + file);
