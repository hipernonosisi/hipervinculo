import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import App from './App';
import { redirectedPath } from './lib/seoRoutes';
export { prerenderPaths } from './lib/seoRoutes';
export { legacyRedirects } from './lib/seoRoutes';
export async function renderPage(url: string) {
  const context: { helmet?: Record<string, { toString(): string }> } = {};
  const html = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const destination = new PassThrough();
    destination.on('data', chunk => chunks.push(Buffer.from(chunk)));
    destination.on('end', () => resolve(Buffer.concat(chunks).toString()));
    destination.on('error', reject);
    const stream = renderToPipeableStream(<App ssrUrl={redirectedPath(url)} helmetContext={context} />, {
      onAllReady() { stream.pipe(destination); }, onShellError: reject,
      onError(error) { reject(error); },
    });
    destination.on('close', () => clearTimeout(timeout));
    const timeout = setTimeout(() => { stream.abort(); reject(new Error(`Rendering timeout: ${url}`)); }, 30000);
  });
  if (!context.helmet) throw new Error(`Missing metadata: ${url}`);
  return { html, head: ['title', 'meta', 'link', 'script'].map(key => context.helmet?.[key]?.toString() ?? '').join('\n'), language: url.startsWith('/es') ? 'es' : 'en' };
}
