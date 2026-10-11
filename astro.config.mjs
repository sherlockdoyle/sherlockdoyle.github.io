// @ts-check
import { defineConfig } from 'astro/config';
import { transform } from 'esbuild';
import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';

const themesPath = './src/components/themes/css';

// https://astro.build/config
export default defineConfig({
  site: 'https://sherlockdoyle.github.io',
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
    {
      name: 'theme-compiler',
      hooks: {
        'astro:server:setup': ({ server }) => {
          server.middlewares.use('/themes', async (req, res) => {
            const raw = await fs.readFile(`${themesPath}${req.url}`, 'utf-8');
            res.setHeader('Content-Type', 'text/css');
            res.end(raw);
          });
        },
        'astro:build:done': async ({ dir }) => {
          const outDir = new URL('./themes/', dir);
          await fs.mkdir(outDir, { recursive: true });
          for (const file of await fs.readdir(themesPath)) {
            const raw = await fs.readFile(`${themesPath}/${file}`, 'utf-8');
            const minified = await transform(raw, { loader: 'css', minify: true });
            fs.writeFile(new URL(file, outDir), minified.code);
          }
        },
      },
    },
  ],
});
