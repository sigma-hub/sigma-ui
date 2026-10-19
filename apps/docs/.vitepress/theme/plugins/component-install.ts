import type { MarkdownRenderer } from 'vitepress';
import { toPublicImports } from '../../../../../packages/shared/src/registry';
import { type StateCore, type Token, createHtmlBlock, renderFence, replaceHtmlBlocks, toAttributeJson } from './markdown-tokens';
import { STYLE_SYSTEMS, collectDependencies, componentExists, readComponentFiles } from './registry-source';

const COMPONENT_INSTALL_PATTERN = /^<ComponentInstall\s+name="([\w-]+)"\s*\/>$/;

function getLanguage(fileName: string) {
  return fileName.endsWith('.vue') ? 'vue' : 'ts';
}

export default function componentInstallPlugin(md: MarkdownRenderer) {
  function createInstallTokens(state: StateCore, match: RegExpMatchArray, sourceToken: Token) {
    const [, component] = match;

    if (!componentExists(component)) {
      throw new Error(`<ComponentInstall name="${component}" /> does not match a folder in packages/lib/src/registry/*/ui`);
    }

    const filesByStyle = STYLE_SYSTEMS.map(style => ({ style, files: readComponentFiles(style, component) }));
    const dependencies = Object.fromEntries(filesByStyle.map(({ style, files }) => [style, collectDependencies(files, component)]));
    const files = Object.fromEntries(filesByStyle.map(({ style, files }) => [
      style,
      files.map(file => ({
        name: file.fileName,
        html: renderFence(md, state, toPublicImports(file.content), getLanguage(file.fileName)),
      })),
    ]));

    return [createHtmlBlock(state, `<ComponentInstall v-bind='${toAttributeJson({ name: component, dependencies, files })}' />`, sourceToken)];
  }

  replaceHtmlBlocks(md, 'component_install', COMPONENT_INSTALL_PATTERN, createInstallTokens);
}
