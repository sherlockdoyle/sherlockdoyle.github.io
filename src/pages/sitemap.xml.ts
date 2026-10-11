import type { APIContext } from 'astro';
import { HTMLElement } from 'node-html-parser';
import projects from '../components/projects/projects';

export async function GET({ site }: APIContext) {
  const entries = [{ url: site!.href, date: new Date() }];
  for (const project of projects)
    if (project.url?.startsWith(site!.href)) entries.push({ url: project.url, date: project.date });

  const urlset = new HTMLElement('urlset', {});
  urlset.setAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  for (const { url, date } of entries) {
    const urlEl = new HTMLElement('url', {});

    const locEl = new HTMLElement('loc', {}),
      lastmodEl = new HTMLElement('lastmod', {});
    locEl.textContent = url;
    lastmodEl.textContent = date.toISOString().split('T')[0];

    urlEl.append(locEl, lastmodEl);
    urlset.append(urlEl);
  }

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${urlset.toString()}`);
}
