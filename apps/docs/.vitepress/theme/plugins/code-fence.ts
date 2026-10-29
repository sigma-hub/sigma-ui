import type { MarkdownRenderer } from 'vitepress';
import { convertNpmCommand } from '../utils/package-manager';

const SHELL_LANGUAGES = new Set(['bash', 'sh', 'shell', 'zsh', 'console']);

/** `ts [name]` or `ts title="name"` */
export function extractFenceTitle(info: string) {
  return info.match(/\[(.+?)\]/)?.[1] ?? info.match(/title="([^"]+)"/)?.[1] ?? '';
}

function isPackageManagerFence(info: string, hasTitle: boolean) {
  const language = info.trim().split(/[\s{:[]/)[0];

  return SHELL_LANGUAGES.has(language) && !hasTitle && !/(?:^|\s)no-pm(?:\s|$)/.test(info);
}

/**
 * Two additions on top of the VitePress fence renderer:
 *  1. A file name header for ```ts [name] and ```ts title="name".
 *  2. Shell fences made only of npm / npx commands become <PackageManagerCommand> tabs
 *     (npm, pnpm, yarn, bun). Opt out with `no-pm` in the info string, e.g. ```bash no-pm.
 *     A fence with a title is never converted.
 *
 * Register it before the CodeWrapper plugin, which wraps whatever this renders.
 */
export default function codeFencePlugin(md: MarkdownRenderer) {
  const fence = md.renderer.rules.fence;

  if (!fence) {
    return;
  }

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const title = extractFenceTitle(token.info);

    if (!env.isSearchIndex && !token.meta?.isRenderedToHtml && isPackageManagerFence(token.info, Boolean(title))) {
      const commands = convertNpmCommand(token.content);

      if (commands) {
        const command = md.utils.escapeHtml(commands.npm).replaceAll('\n', '&#10;');

        return `<PackageManagerCommand command="${command}" />\n`;
      }
    }

    const html = fence(tokens, idx, options, env, self);

    if (!title) {
      return html;
    }

    return html.replace(
      /^<div class="([^"]*)">/,
      (_, classes: string) => `<div class="${classes} has-title"><div class="code-title">${md.utils.escapeHtml(title)}</div>`,
    );
  };
}
