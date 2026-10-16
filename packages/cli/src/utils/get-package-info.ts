import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'pathe';
import type { PackageJson } from 'type-fest';

export function getPackageInfo() {
  return readCliPackageJson(path.dirname(fileURLToPath(import.meta.url)));
}

function readCliPackageJson(start: string): PackageJson {
  let directory = start;

  while (true) {
    const candidate = path.join(directory, 'package.json');

    if (existsSync(candidate)) {
      const parsed = JSON.parse(readFileSync(candidate, 'utf8')) as PackageJson;

      if (parsed.name === 'sigma-ui') {
        return parsed;
      }
    }

    const parent = path.dirname(directory);

    if (parent === directory) {
      throw new Error('Could not find the sigma-ui package.json');
    }

    directory = parent;
  }
}
