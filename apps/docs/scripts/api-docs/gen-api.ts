import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { styleSystems } from '../../src/lib/registry/style-system';
import type { ComponentApi } from '../../.vitepress/theme/types/api';
import { createApiExtractor } from './extract';
import { findApiDifferences } from './parity';
import { renderComponentApi } from './render';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../..');
const LIB_TSCONFIG_PATH = path.join(REPO_ROOT, 'packages/lib/tsconfig.json');
const OUTPUT_DIR = path.join(REPO_ROOT, 'apps/docs/src/content/meta');
const [REFERENCE_STYLE, ...OTHER_STYLES] = styleSystems.map(style => style.name);

const isCheckMode = process.argv.includes('--check');

function getUiDir(style: string) {
  return path.join(REPO_ROOT, 'packages/lib/src/registry', style, 'ui');
}

function listComponentDirs(style: string) {
  const uiDir = getUiDir(style);

  return fs.readdirSync(uiDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(uiDir, entry.name))
    .sort();
}

function extractStyle(extractor: ReturnType<typeof createApiExtractor>, style: string) {
  return new Map(
    listComponentDirs(style)
      .map(componentDir => extractor.extractComponent(componentDir))
      .filter(api => api.parts.length)
      .map(api => [api.component, api]),
  );
}

function findParityDifferences(reference: Map<string, ComponentApi>, candidates: Map<string, ComponentApi>, candidateStyle: string) {
  const differences = [...reference.values()].flatMap(api => findApiDifferences(api, candidates.get(api.component)));

  for (const component of candidates.keys()) {
    if (!reference.has(component)) {
      differences.push(`${component}: component exists only in "${candidateStyle}"`);
    }
  }

  return differences.map(difference => `[${REFERENCE_STYLE} vs ${candidateStyle}] ${difference}`);
}

function syncOutput(outputs: Map<string, string>) {
  const staleFiles: string[] = [];
  const existingFiles = fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR).filter(file => file.endsWith('.md')) : [];

  for (const file of existingFiles) {
    if (!outputs.has(file)) {
      staleFiles.push(file);

      if (!isCheckMode) {
        fs.rmSync(path.join(OUTPUT_DIR, file));
      }
    }
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const [file, content] of outputs) {
    const filePath = path.join(OUTPUT_DIR, file);
    const currentContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : undefined;

    if (currentContent !== content) {
      staleFiles.push(file);

      if (!isCheckMode) {
        fs.writeFileSync(filePath, content);
      }
    }
  }

  return staleFiles;
}

function main() {
  const startedAt = Date.now();
  const extractor = createApiExtractor(LIB_TSCONFIG_PATH);
  const referenceApis = extractStyle(extractor, REFERENCE_STYLE);

  const parityDifferences = OTHER_STYLES.flatMap(style => findParityDifferences(referenceApis, extractStyle(extractor, style), style));

  const outputs = new Map([...referenceApis.values()].map(api => [`${api.component}.md`, renderComponentApi(api)]));
  const changedFiles = syncOutput(outputs);
  const duration = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log(`Extracted the API of ${referenceApis.size} components in ${duration}s.`);

  if (parityDifferences.length) {
    console.error(`\nThe component APIs differ between style systems (${parityDifferences.length}):`);
    parityDifferences.forEach(difference => console.error(`  ${difference}`));
  }

  if (changedFiles.length) {
    const verb = isCheckMode ? 'are out of date' : 'were updated';
    console.log(`\nThese API reference files ${verb}:`);
    changedFiles.forEach(file => console.log(`  ${path.relative(REPO_ROOT, path.join(OUTPUT_DIR, file))}`));

    if (isCheckMode) {
      console.error('\nRun `pnpm docs:gen` and commit the result.');
    }
  }

  if (parityDifferences.length || (isCheckMode && changedFiles.length)) {
    process.exit(1);
  }
}

main();
