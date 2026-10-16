import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vitepress';
import {
  BLOCK_RENDERER_PATH,
  canExtendRollupInput,
  isBlockRendererRequest,
  stripThemeChunkPreload,
  stripThemeChunkSideEffect,
} from './frame';

export function blockRendererPlugin(htmlPath: string): Plugin {
  return {
    name: 'sigma-block-renderer',
    enforce: 'post',
    config(userConfig, { isSsrBuild }) {
      if (isSsrBuild) {
        return;
      }

      const rollupOptions = userConfig.build?.rollupOptions;
      const output = Array.isArray(rollupOptions?.output) ? rollupOptions.output[0] : rollupOptions?.output;
      const previousManualChunks = output?.manualChunks;

      return {
        build: {
          rollupOptions: {
            input: canExtendRollupInput(rollupOptions?.input)
              ? { 'block-renderer': htmlPath }
              : undefined,
            output: {
              manualChunks(id, meta) {
                if (id.includes('/packages/shared/src/themes') || id.includes('/packages/shared/src/style-systems')) {
                  return 'docs-shared';
                }

                if (typeof previousManualChunks === 'function') {
                  return previousManualChunks(id, meta);
                }
              },
            },
          },
        },
      };
    },
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === 'chunk' && output.name === 'block-renderer') {
          output.code = stripThemeChunkSideEffect(output.code);
          output.imports = output.imports.filter(imported => !imported.includes('/chunks/theme.'));
        }

        if (output.type === 'asset' && output.fileName.endsWith('block-renderer/index.html')) {
          const html = typeof output.source === 'string' ? output.source : new TextDecoder().decode(output.source);
          output.source = stripThemeChunkPreload(html);
        }
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.stack.unshift({
          route: '',
          handle(request: IncomingMessage, response: ServerResponse, next: (error?: unknown) => void) {
            const pathname = request.url?.split('?')[0] ?? '';

            if (!isBlockRendererRequest(pathname)) {
              next();
              return;
            }

            fs.promises.readFile(htmlPath, 'utf8').then(async (html) => {
              const transformed = await server.transformIndexHtml(BLOCK_RENDERER_PATH, html);
              response.statusCode = 200;
              response.setHeader('Content-Type', 'text/html');
              response.end(transformed);
            }).catch((error: unknown) => {
              next(error instanceof Error ? error : new Error(`Failed to render ${request.url ?? BLOCK_RENDERER_PATH}`));
            });
          },
        });
      };
    },
  };
}
