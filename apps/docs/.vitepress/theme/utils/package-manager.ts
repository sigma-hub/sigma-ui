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

export function useSelectedPackageManager() {
  return useStorage<PackageManager>('package-manager', 'npm', undefined, { initOnMounted: true });
}
