#!/usr/bin/env node
import process from 'node:process';

import { Command } from 'commander';

import { add } from '@/src/commands/add';
import { build } from '@/src/commands/build';
import { diff } from '@/src/commands/diff';
import { info } from '@/src/commands/info';
import { init } from '@/src/commands/init';
import { mcp } from '@/src/commands/mcp';
import { migrate } from '@/src/commands/migrate';
import { search } from '@/src/commands/search';
import { view } from '@/src/commands/view';
import { getPackageInfo } from '@/src/utils/get-package-info';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));
process.stdout.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EPIPE') {
    process.exit(0);
  }

  throw error;
});

async function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name('sigma-ui')
    .description('add components and dependencies to your project')
    .version(
      packageInfo.version || '1.0.0',
      '-v, --version',
      'display the version number',
    );

  program
    .addCommand(init)
    .addCommand(add)
    .addCommand(view)
    .addCommand(search)
    .addCommand(info)
    .addCommand(mcp)
    .addCommand(build)
    .addCommand(migrate)
    .addCommand(diff);

  program.parse();
}

main();
