import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import path from 'pathe';

export type PackageManagerName = 'npm' | 'pnpm' | 'yarn' | 'bun';

export interface PackageManager {
  name: PackageManagerName;
  version?: string;
}

const LOCK_FILES: { name: PackageManagerName; files: string[] }[] = [
  { name: 'pnpm', files: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'] },
  { name: 'yarn', files: ['yarn.lock'] },
  { name: 'bun', files: ['bun.lockb', 'bun.lock'] },
  { name: 'npm', files: ['package-lock.json'] },
];

interface PackageJson {
  packageManager?: unknown;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

function readPackageJson(directory: string): PackageJson | null {
  const packageJsonPath = path.join(directory, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  } catch {
    return null;
  }
}

function isPackageManagerName(value: string): value is PackageManagerName {
  return LOCK_FILES.some(lockFile => lockFile.name === value);
}

export async function detectPackageManager(cwd: string): Promise<PackageManager> {
  let directory = path.resolve(cwd);

  while (true) {
    const packageManagerField = readPackageJson(directory)?.packageManager;

    if (typeof packageManagerField === 'string') {
      const [name, version] = packageManagerField.split('@');

      if (isPackageManagerName(name)) {
        return { name, version };
      }
    }

    for (const lockFile of LOCK_FILES) {
      if (lockFile.files.some(file => existsSync(path.join(directory, file)))) {
        return { name: lockFile.name };
      }
    }

    const parent = path.dirname(directory);

    if (parent === directory) {
      break;
    }

    directory = parent;
  }

  const userAgent = process.env.npm_config_user_agent ?? '';
  const fromUserAgent = LOCK_FILES.find(lockFile => userAgent.startsWith(lockFile.name));

  return { name: fromUserAgent?.name ?? 'npm' };
}

export function getInstalledPackages(cwd: string) {
  const packageJson = readPackageJson(cwd) ?? {};

  return new Set<string>([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]);
}

export function getInstallCommand(packageManager: PackageManagerName, dependencies: string[], dev: boolean) {
  const command = packageManager === 'npm' ? 'install' : 'add';
  const args = [command, ...(dev ? ['-D'] : []), ...dependencies];

  return { command: packageManager, args };
}

export async function installPackages(
  dependencies: string[],
  options: { cwd: string; dev?: boolean; silent?: boolean },
): Promise<void> {
  if (!dependencies.length) {
    return;
  }

  const packageManager = await detectPackageManager(options.cwd);
  const { command, args } = getInstallCommand(packageManager.name, dependencies, Boolean(options.dev));

  execFileSync(command, args, {
    cwd: options.cwd,
    stdio: options.silent ? 'pipe' : 'inherit',
    shell: process.platform === 'win32',
  });
}

export async function addDependency(dependencies: string[], options: { cwd: string; silent?: boolean }) {
  await installPackages(dependencies, { ...options, dev: false });
}

export async function addDevDependency(dependencies: string[], options: { cwd: string; silent?: boolean }) {
  await installPackages(dependencies, { ...options, dev: true });
}
