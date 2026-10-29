import path from 'node:path';
import fs from 'node:fs';
import { defineConfig, type UserConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';

import { siteConfig } from './theme/config/site';
import { markdownOptions } from './theme/config/markdown';
import { blockRendererPlugin } from './block-renderer/plugin';

type VitePressPlugins = NonNullable<UserConfig['vite']>['plugins'];

function vitePressPlugins(plugins: unknown[]): VitePressPlugins {
  return plugins as VitePressPlugins;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteConfig.name,
  titleTemplate: ':title | SIGMA-UI',
  description: siteConfig.description,
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'shortcut icon', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: 'black' }],
    ['meta', { name: 'creator', content: 'reka-ui' }],
    ['meta', { name: 'theme-color', content: '#41b883' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: siteConfig.name }],
    ['meta', { name: 'og:image', content: siteConfig.ogImage }],
    ['meta', { name: 'twitter:image', content: siteConfig.ogImage }],
  ],
  sitemap: {
    hostname: 'https://sigma-ui.dev',
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, Object.assign(env, { isSearchIndex: true }));
          return env.frontmatter?.search === false ? '' : html;
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/sigma-hub/sigma-ui/tree/main/apps/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
  },
  srcDir: path.resolve(__dirname, '../src'),
  srcExclude: ['content/meta/**'],
  markdown: markdownOptions,
  rewrites: {
    'content/(.*)': '(.*)',
  },
  vite: {
    plugins: vitePressPlugins([
      tailwindcss(),
      blockRendererPlugin(path.resolve(__dirname, '../src/block-renderer/index.html')),
    ]),
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(
        JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, '../../../packages/cli/package.json'),
            'utf-8',
          ),
        ).version,
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src'),
        '~': path.resolve(__dirname, '../../../'),
        '@ui': path.resolve(__dirname, '../../../packages/lib/src'),
      },
    },
  },
});
