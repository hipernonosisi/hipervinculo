import { createServer, type Plugin } from 'vite';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
export const MAX_PRERENDER_PAGES = 200;
export function prerenderPlugin(): Plugin {
  let output = '';
  return {
    name: 'hipervinculo-static-pages', apply: 'build', enforce: 'post',
    configResolved(config) { output = path.resolve(config.root, config.build.outDir); },
    async closeBundle() {
      const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom', resolve: { alias: { '@': path.resolve('src') } }, ssr: { noExternal: ['react-helmet-async'] } });
      try {
        const { prerenderPaths, renderPage, legacyRedirects } = await server.ssrLoadModule('/src/prerender.tsx');
        if (prerenderPaths.length > MAX_PRERENDER_PAGES) throw new Error('Prerender page limit exceeded');
        const template = await readFile(path.join(output, 'index.html'), 'utf8');
        const manifest = JSON.parse(await readFile(path.join(output, '.vite/manifest.json'), 'utf8')) as Record<string, { file: string; src?: string }>;
        const assets = Object.entries(manifest).filter(([key]) => key.startsWith('src/assets/'));
        // index.html is also the real home document, so it cannot be a separate redirect file.
        const redirectPaths = Object.keys(legacyRedirects).filter(url => url !== '/index.html');
        for (const url of [...prerenderPaths, ...redirectPaths]) {
          const rendered = await renderPage(url);
          // Helmet owns all route metadata. Preserve only non-route platform/font tags.
          let page = template.replace(/<title[^>]*>[\s\S]*?<\/title>/g, '').replace(/<meta\s[^>]*(?:name|property)=["'](?:title|description|keywords|robots|language|og:[^"']+|twitter:[^"']+)["'][^>]*>/g, '').replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, '').replace(/<link[^>]*rel="canonical"[^>]*>/g, '');
          page = page.replace('<html lang="en">', `<html lang="${rendered.language}">`).replace('</head>', `${rendered.head}\n</head>`).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${rendered.html}</div>`);
          for (const [source, entry] of assets) page = page.split(`/${source}`).join(`/${entry.file}`);
          // Make animations visual only: content must remain visible without JS.
          page = page.replace('</head>', '<noscript><style>[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}[data-state="closed"][role="region"]{display:block!important}</style></noscript></head>');
          if (legacyRedirects[url]) page = page.replace('</head>', `<meta http-equiv="refresh" content="0;url=${legacyRedirects[url]}" /></head>`);
          const file = path.join(output, url === '/' ? 'index.html' : `${url.replace(/^\//, '').replace(/\/$/, '')}/index.html`);
          await mkdir(path.dirname(file), { recursive: true });
          await writeFile(file, page);
          // Conventional error document for hosts that support it. Lovable's fixed
          // index.html fallback does not currently honor a custom error document.
          if (url === '/404') await writeFile(path.join(output, '404.html'), page);
        }
        console.log(`Prerendered ${prerenderPaths.length} bilingual public and noindex pages`);
      } finally { await server.close(); }
    },
  };
}
