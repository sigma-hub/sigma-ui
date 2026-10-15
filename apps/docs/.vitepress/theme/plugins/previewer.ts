import type { MarkdownRenderer } from 'vitepress';
import { type StateCore, type Token, createFence, createHtmlBlock, replaceHtmlBlocks, toAttributeJson } from './markdown-tokens';
import { STYLE_SYSTEMS, exampleExists, readExample, toDisplayCode } from './registry-source';
import { parseProps } from './utils';

const COMPONENT_PREVIEW_PATTERN = /^<ComponentPreview\s[^>]*\/>$/s;

function createPreviewTokens(state: StateCore, match: RegExpMatchArray, sourceToken: Token) {
  const props = parseProps(match[0]);
  const exampleName = props.name;

  if (typeof exampleName !== 'string' || !exampleExists(exampleName)) {
    throw new Error(`<ComponentPreview name="${exampleName}" /> does not match an example in every style system`);
  }

  const tokens = [createHtmlBlock(state, `<ComponentPreview v-bind='${toAttributeJson(props)}'>`, sourceToken)];

  for (const style of STYLE_SYSTEMS) {
    tokens.push(
      createHtmlBlock(state, `<template #code-${style}>`, sourceToken),
      createFence(state, toDisplayCode(readExample(style, exampleName), style), 'vue', sourceToken),
      createHtmlBlock(state, '</template>', sourceToken),
    );
  }

  tokens.push(createHtmlBlock(state, '</ComponentPreview>', sourceToken));
  return tokens;
}

export default function componentPreviewPlugin(md: MarkdownRenderer) {
  replaceHtmlBlocks(md, 'component_preview', COMPONENT_PREVIEW_PATTERN, createPreviewTokens);
}
