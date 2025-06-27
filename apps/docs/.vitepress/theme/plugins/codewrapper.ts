import type { MarkdownRenderer } from 'vitepress';

export default function (md: MarkdownRenderer) {
  const defaultFenceRenderer = md.renderer.rules.fence;

  if (!defaultFenceRenderer) {
    return;
  }

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const isAllowedExtension = (token.info.includes('vue') || token.info.includes('astro') || token.info.includes('ts'));

    if (token && token.tag === 'code' && isAllowedExtension) {
      return `<CodeWrapper>${defaultFenceRenderer(tokens, idx, options, env, self)}</CodeWrapper>`;
    }

    return defaultFenceRenderer(tokens, idx, options, env, self);
  };
}
