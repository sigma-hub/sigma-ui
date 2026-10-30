import fs from 'node:fs';
import path from 'node:path';
import { createHighlighter, type Highlighter } from 'shiki';
import type { Plugin } from 'vitepress';
import { toPublicImports } from '../../../../../packages/shared/src/registry';
import { CODE_THEME_OPTIONS, CODE_THEME_REGISTRATIONS } from '../config/shiki';
import { REGISTRY_ROOT, STYLE_SYSTEMS } from './registry-source';

export const BLOCK_SOURCES_ID = 'virtual:block-sources';

const RESOLVED_BLOCK_SOURCES_ID = '\0virtual:block-sources';

export interface HighlightedBlockFile {
  raw: string;
  html: string;
}

export type BlockSourceMap = Record<string, Record<string, Record<string, HighlightedBlockFile>>>;

interface BlockSourceFile {
  style: string;
  blockName: string;
  relativePath: string;
  fullPath: string;
  raw: string;
}

let highlighterPromise: Promise<Highlighter> | undefined;

function getHighlighter() {
  highlighterPromise ??= createHighlighter({
    themes: Object.values(CODE_THEME_REGISTRATIONS),
    langs: ['vue', 'typescript', 'css'],
  });

  return highlighterPromise;
}

export function languageForBlockFile(filePath: string) {
  if (filePath.endsWith('.vue')) {
    return 'vue' as const;
  }

  if (filePath.endsWith('.css')) {
    return 'css' as const;
  }

  return 'typescript' as const;
}

function listFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listFiles(fullPath);
    }

    if (entry.isFile() && (entry.name.endsWith('.vue') || entry.name.endsWith('.ts'))) {
      return [fullPath];
    }

    return [];
  });
}

export function readBlockSourceFiles(): BlockSourceFile[] {
  return STYLE_SYSTEMS.flatMap((style) => {
    const blocksRoot = path.join(REGISTRY_ROOT, style, 'blocks');

    if (!fs.existsSync(blocksRoot)) {
      return [];
    }

    return fs.readdirSync(blocksRoot).flatMap((blockName) => {
      const blockDir = path.join(blocksRoot, blockName);

      if (!fs.statSync(blockDir).isDirectory()) {
        return [];
      }

      return listFiles(blockDir).map(fullPath => ({
        style,
        blockName,
        relativePath: path.relative(blockDir, fullPath).split(path.sep).join('/'),
        fullPath,
        raw: toPublicImports(fs.readFileSync(fullPath, 'utf8')).trim(),
      }));
    });
  });
}

export async function highlightBlockSource(raw: string, filePath: string) {
  const highlighter = await getHighlighter();

  return highlighter.codeToHtml(raw, {
    lang: languageForBlockFile(filePath),
    ...CODE_THEME_OPTIONS,
  });
}

export async function buildBlockSourceMap(files = readBlockSourceFiles()): Promise<BlockSourceMap> {
  const sources: BlockSourceMap = {};

  for (const file of files) {
    const styleSources = sources[file.style] ?? {};
    const blockSources = styleSources[file.blockName] ?? {};

    blockSources[file.relativePath] = {
      raw: file.raw,
      html: await highlightBlockSource(file.raw, file.relativePath),
    };
    styleSources[file.blockName] = blockSources;
    sources[file.style] = styleSources;
  }

  return sources;
}

export function blockSourcesPlugin(): Plugin {
  return {
    name: 'sigma-block-sources',
    resolveId(id) {
      if (id === BLOCK_SOURCES_ID) {
        return RESOLVED_BLOCK_SOURCES_ID;
      }
    },
    async load(id) {
      if (id !== RESOLVED_BLOCK_SOURCES_ID) {
        return;
      }

      const files = readBlockSourceFiles();

      for (const file of files) {
        this.addWatchFile(file.fullPath);
      }

      return `export default ${JSON.stringify(await buildBlockSourceMap(files))}`;
    },
    handleHotUpdate(context) {
      if (!context.file.split(path.sep).includes('blocks')) {
        return;
      }

      const module = context.server.moduleGraph.getModuleById(RESOLVED_BLOCK_SOURCES_ID);

      if (module) {
        return [module];
      }
    },
  };
}
