// Runs after `changeset version`: puts every package changelog into the release notes layout.
// Usage: node scripts/changelog/run.mjs [--check]
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { formatChangelog } from './format.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const config = JSON.parse(readFileSync(join(root, '.changeset', 'config.json'), 'utf8'));
const options = Array.isArray(config.changelog) ? (config.changelog[1] ?? {}) : {};
const isCheck = process.argv.includes('--check');
const stale = [];

for (const directory of readdirSync(join(root, 'packages'))) {
  const file = join(root, 'packages', directory, 'CHANGELOG.md');

  if (!existsSync(file)) {
    continue;
  }

  const current = readFileSync(file, 'utf8');
  const formatted = formatChangelog(current, { maintainers: options.maintainers ?? [] });

  if (formatted !== current) {
    stale.push(file);

    if (!isCheck) {
      writeFileSync(file, formatted);
    }
  }
}

if (isCheck && stale.length > 0) {
  console.error(`These changelogs are not in the release notes layout. Run "node scripts/changelog/run.mjs":\n${stale.join('\n')}`);
  process.exit(1);
}
