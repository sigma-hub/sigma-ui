import type { MarkdownRenderer } from 'vitepress';

type CoreRule = Parameters<MarkdownRenderer['core']['ruler']['push']>[1];
type StateCore = Parameters<CoreRule>[0];
type Token = StateCore['tokens'][number];

export type { StateCore, Token };

export function toAttributeJson(value: unknown) {
  return JSON.stringify(value)
    .replaceAll('&', '&amp;')
    .replaceAll('\'', '&#39;');
}

export function createHtmlBlock(state: StateCore, content: string, sourceToken?: Token) {
  const token = new state.Token('html_block', '', 0);
  token.content = `${content}\n`;
  token.block = true;
  token.map = sourceToken?.map ?? null;
  return token;
}

export function createFence(state: StateCore, content: string, language: string, sourceToken?: Token) {
  const token = new state.Token('fence', 'code', 0);
  token.info = language;
  token.content = content.endsWith('\n') ? content : `${content}\n`;
  token.markup = '```';
  token.block = true;
  token.map = sourceToken?.map ?? null;
  return token;
}

export function renderFence(md: MarkdownRenderer, state: StateCore, content: string, language: string) {
  const fenceRule = md.renderer.rules.fence;

  if (!fenceRule) {
    throw new Error('The markdown renderer has no fence rule');
  }

  const token = createFence(state, content, language);
  token.meta = { isRenderedToHtml: true };
  return fenceRule([token], 0, md.options, state.env, md.renderer);
}

export function replaceHtmlBlocks(
  md: MarkdownRenderer,
  ruleName: string,
  pattern: RegExp,
  createTokens: (state: StateCore, match: RegExpMatchArray, sourceToken: Token) => Token[],
) {
  md.core.ruler.push(ruleName, (state) => {
    if (state.env.isSearchIndex) {
      return;
    }

    state.tokens = state.tokens.flatMap((token) => {
      const isHtml = token.type === 'html_block' || token.type === 'html_inline';
      const match = isHtml ? token.content.trim().match(pattern) : null;
      return match ? createTokens(state, match, token) : [token];
    });
  });
}
