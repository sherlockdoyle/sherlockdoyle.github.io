import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { encrypt, toBase38 } from '../src/utils/coder.ts';

const DIARIES_DIR = new URL('../diaries', import.meta.url).pathname;
const OUTPUT_DIR = new URL('../public/s', import.meta.url).pathname;

await mkdir(OUTPUT_DIR, { recursive: true });

async function encodeFile(file: string, key?: string) {
  const inStem = basename(file, extname(file));
  const key1 = key ?? inStem;
  const outName = encrypt(inStem, key1),
    outName_38 = toBase38(outName);
  const key2 = encrypt(outName, key1);
  const content = await readFile(join(DIARIES_DIR, file), 'utf-8');
  const encoded = encrypt(content, key2);
  await writeFile(join(OUTPUT_DIR, outName_38), encoded, 'utf-8');

  console.log(`  Encrypted ${file} to [[${new URLSearchParams({ [outName_38]: toBase38(key2) }).toString()}]]`);
}

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');

// Mode 1: --file <name> [--key <key>]
if (fileIdx !== -1) {
  const file = args[fileIdx + 1];
  if (!file) {
    console.error('Usage: build-diaries --file <filename> [--key <key>]');
    process.exit(1);
  }
  const keyIdx = args.indexOf('--key');
  const key = keyIdx !== -1 ? args[keyIdx + 1] : undefined;
  await encodeFile(file, key);
  process.exit(0);
}

const allFiles = await readdir(DIARIES_DIR);

// Mode 2: --interactive / -i
if (args.includes('--interactive') || args.includes('-i')) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  console.log('\nAvailable diary files:');
  allFiles.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));

  const selection = await rl.question('\nSelect files (e.g. 1,2  or  1 2  or  * for all): ');
  let selected: string[];
  if (selection.trim() === '*') selected = allFiles;
  else {
    const indices = selection
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    selected = indices.map(i => allFiles[i - 1]).filter(Boolean);
  }

  if (selected.length === 0) {
    console.log('No valid files selected.');
    rl.close();
    process.exit(0);
  }

  console.log();
  for (const file of selected) {
    const answer = await rl.question(`  Key for "${file}" (leave blank to use filename stem): `);
    await encodeFile(file, answer.trim() || undefined);
  }

  rl.close();
  console.log(`\nBuilt ${selected.length} diary file(s) → public/s`);
  process.exit(0);
}

// Mode 3: encode all (default)
await Promise.all(allFiles.map(file => encodeFile(file)));
console.log(`\nBuilt ${allFiles.length} diary file(s) → public/s`);
