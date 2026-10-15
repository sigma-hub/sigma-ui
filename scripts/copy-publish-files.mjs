import { copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = cwd();

for (const fileName of ['LICENSE', 'THIRD_PARTY_NOTICES.md']) {
  copyFileSync(join(repoRoot, fileName), join(packageDir, fileName));
}
