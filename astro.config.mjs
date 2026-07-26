// @ts-check
import { defineConfig } from 'astro/config';
import { parse } from 'node-html-parser';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const site = 'https://sherlockdoyle.github.io';

// https://astro.build/config
export default defineConfig({
  site,
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
      name: 'build-sitemap',
      hooks: {
        'astro:build:done': async ({ dir, logger }) => {
          const { default: projects } = await import('./src/components/projects/projects.ts');

          const entries = [{ url: site + '/', date: new Date() }];
          for (const project of projects)
            if (project.url?.startsWith(site)) entries.push({ url: project.url, date: project.date });

          const xml = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            ...entries.map(
              ({ url, date }) =>
                `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date.toISOString().split('T')[0]}</lastmod>\n  </url>`,
            ),
            '</urlset>',
          ].join('\n');

          const outPath = path.join(fileURLToPath(dir), 'sitemap.xml');
          await fs.writeFile(outPath, xml, 'utf-8');
          logger.info(`Sitemap written with ${entries.length} URL(s).`);
        },
      },
    },
  ],
});
