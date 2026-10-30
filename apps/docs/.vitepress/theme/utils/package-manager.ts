import { useStorage } from '@vueuse/core';

export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

export type PackageManager = typeof PACKAGE_MANAGERS[number];

export const RUN_COMMANDS: Record<PackageManager, string> = {
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
  bun: 'bunx --bun',
};

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add',
};

const NPM_COMMAND_PATTERN = /^(?:npx|npm\s+(?:install|i|add|run|create))(?:\s|$)/;

type PackageManagerCommands = Record<PackageManager, string>;

function convertNpmLine(line: string): PackageManagerCommands | undefined {
  const raw = line.trim();

  if (!NPM_COMMAND_PATTERN.test(raw)) {
    return undefined;
  }

  if (raw.startsWith('npx')) {
    const rest = raw.slice('npx'.length);

    return {
      npm: raw,
      pnpm: `pnpm dlx${rest}`,
      yarn: `yarn dlx${rest}`,
      bun: `bunx --bun${rest}`,
    };
  }

  const [, verb, rest = ''] = raw.match(/^npm\s+(\S+)(.*)$/) ?? [];
  // `npm run dev -- --port 1` and `npm create x -- --flag` pass flags through; the other managers do that without `--`.
  const passthroughFree = rest.replace(/\s--(?=\s|$)/, '');

  if (verb === 'run') {
    return { npm: raw, pnpm: `pnpm${passthroughFree}`, yarn: `yarn${passthroughFree}`, bun: `bun run${passthroughFree}` };
  }

  if (verb === 'create') {
    return { npm: raw, pnpm: `pnpm create${passthroughFree}`, yarn: `yarn create${passthroughFree}`, bun: `bun create${passthroughFree}` };
  }

  // install / i / add: a bare `npm install` stays an install, flags map across managers.
  const parts = rest.split(/\s+/).filter(Boolean);
  const hasPackages = parts.some(part => !part.startsWith('-'));
  const isGlobal = parts.some(part => part === '-g' || part === '--global');
  const flags = parts.map(part => part === '--save-dev' ? '-D' : part).join(' ');

  if (!hasPackages) {
    return { npm: raw, pnpm: 'pnpm install', yarn: 'yarn install', bun: 'bun install' };
  }

  const withoutGlobal = parts.filter(part => part !== '-g' && part !== '--global').map(part => part === '--save-dev' ? '-D' : part).join(' ');

  return {
    npm: raw,
    pnpm: `pnpm add ${flags}`,
    yarn: isGlobal ? `yarn global add ${withoutGlobal}` : `yarn add ${flags}`,
    bun: `bun add ${flags}`,
  };
}

/**
 * Converts npm-flavoured commands (`npm install x`, `npx x`, `npm run x`, `npm create x`), one per line,
 * to every supported package manager. Returns undefined when any line is anything else (comments, other
 * programs, `npm ci`), so callers can fall back to a plain code block.
 */
export function convertNpmCommand(command: string): PackageManagerCommands | undefined {
  const lines = command.split('\n').map(line => line.trim()).filter(Boolean);
  const converted = lines.map(convertNpmLine);

  if (!converted.length || converted.some(line => !line)) {
    return undefined;
  }

  return Object.fromEntries(PACKAGE_MANAGERS.map(manager => [
    manager,
    converted.map(line => line?.[manager]).join('\n'),
  ])) as PackageManagerCommands;
}

export function useSelectedPackageManager() {
  return useStorage<PackageManager>('package-manager', 'npm', undefined, { initOnMounted: true });
}
