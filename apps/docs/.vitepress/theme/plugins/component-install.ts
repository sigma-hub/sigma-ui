import type { MarkdownRenderer } from 'vitepress';
import { type StateCore, type Token, createFence, createHtmlBlock, replaceHtmlBlocks, toAttributeJson } from './markdown-tokens';
import { STYLE_SYSTEMS, collectDependencies, componentExists, readComponentFiles, toDisplayCode } from './registry-source';

const COMPONENT_INSTALL_PATTERN = /^<ComponentInstall\s+name="([\w-]+)"\s*\/>$/;

function getLanguage(fileName: string) {
  return fileName.endsWith('.vue') ? 'vue' : 'ts';
}

function createInstallTokens(state: StateCore, match: RegExpMatchArray, sourceToken: Token) {
  const [, component] = match;

  if (!componentExists(component)) {
    throw new Error(`<ComponentInstall name="${component}" /> does not match a folder in packages/lib/src/registry/*/ui`);
  }

  const filesByStyle = STYLE_SYSTEMS.map(style => ({ style, files: readComponentFiles(style, component) }));
  const dependencies = Object.fromEntries(filesByStyle.map(({ style, files }) => [style, collectDependencies(files, component)]));

  const tokens = [createHtmlBlock(state, `<ComponentInstall name="${component}" :dependencies='${toAttributeJson(dependencies)}'>`, sourceToken)];

  for (const { style, files } of filesByStyle) {
    tokens.push(createHtmlBlock(state, `<template #${style}>`, sourceToken));

    for (const file of files) {
      tokens.push(
        createHtmlBlock(state, `<SourceFile name="${file.fileName}">`, sourceToken),
        createFence(state, toDisplayCode(file.content, style), getLanguage(file.fileName), sourceToken),
        createHtmlBlock(state, '</SourceFile>', sourceToken),
      );
    }

    tokens.push(createHtmlBlock(state, '</template>', sourceToken));
  }

  tokens.push(createHtmlBlock(state, '</ComponentInstall>', sourceToken));
  return tokens;
}

export default function componentInstallPlugin(md: MarkdownRenderer) {
  replaceHtmlBlocks(md, 'component_install', COMPONENT_INSTALL_PATTERN, createInstallTokens);
}
