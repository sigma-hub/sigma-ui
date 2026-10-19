import type { MarkdownRenderer } from 'vitepress';
import { toPublicImports } from '../../../../../packages/shared/src/registry';
import { type StateCore, type Token, createHtmlBlock, renderFence, replaceHtmlBlocks, toAttributeJson } from './markdown-tokens';
import { STYLE_SYSTEMS, exampleExists, readExample } from './registry-source';
import { parseProps } from './utils';

const COMPONENT_PREVIEW_PATTERN = /^<ComponentPreview\s(?:[^>"']|"[^"]*"|'[^']*')*\/>$/;

export default function componentPreviewPlugin(md: MarkdownRenderer) {
  function createPreviewTokens(state: StateCore, match: RegExpMatchArray, sourceToken: Token) {
    const props = parseProps(match[0]);
    const exampleName = props.name;

    if (typeof exampleName !== 'string' || !exampleExists(exampleName)) {
      throw new Error(`<ComponentPreview name="${exampleName}" /> does not match an example in every style system`);
    }

    const code = Object.fromEntries(STYLE_SYSTEMS.map(style => [
      style,
      readExample(style, exampleName).trim(),
    ]));
    const codeHtml = Object.fromEntries(STYLE_SYSTEMS.map(style => [
      style,
      renderFence(md, state, toPublicImports(code[style]), 'vue'),
    ]));

    return [createHtmlBlock(state, `<ComponentPreview v-bind='${toAttributeJson({ ...props, code, codeHtml })}' />`, sourceToken)];
  }

  replaceHtmlBlocks(md, 'component_preview', COMPONENT_PREVIEW_PATTERN, createPreviewTokens);
}
