// @ts-check
import { defineConfig } from 'astro/config';
import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';

// https://astro.build/config
export default defineConfig({
  integrations: [
    {
      name: 'nojs-strip-scripts',
      hooks: {
        'astro:build:done': async ({ assets }) => {
          const fileUrl = assets.get('/nojs')?.find(url => url.pathname.endsWith('index.html'));
          if (!fileUrl) return;

          const root = parse(await fs.readFile(fileUrl, 'utf-8'));
          root.querySelectorAll('head script:not(:first-of-type),body script').forEach(el => el.remove());

          await fs.writeFile(fileUrl, root.toString(), 'utf-8');
        },
      },
    },
  ],
});
