import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'pathe';
import type { PackageJson } from 'type-fest';

export function getPackageInfo() {
  const packageJsonPath = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '../package.json');

  return JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson;
}
