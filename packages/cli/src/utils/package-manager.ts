import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'pathe';

export interface PackageManager {
  name: string;
  version?: string;
}

export async function detectPackageManager(cwd: string): Promise<PackageManager | null> {
  const lockFiles = [
    { name: 'pnpm', files: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'] },
    { name: 'yarn', files: ['yarn.lock'] },
    { name: 'bun', files: ['bun.lockb'] },
    { name: 'npm', files: ['package-lock.json'] },
  ];

  for (const pm of lockFiles) {
    for (const file of pm.files) {
      if (existsSync(path.join(cwd, file))) {
        return { name: pm.name };
      }
    }
  }

  // Check for packageManager field in package.json
  try {
    const packageJsonPath = path.join(cwd, 'package.json');

    if (existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

      if (packageJson.packageManager) {
        const [name, version] = packageJson.packageManager.split('@');
        return { name, version };
      }
    }
  } catch {
    // Ignore errors
  }

  // Default to pnpm if no lock file is found
  return { name: 'pnpm' };
}

export async function addDependency(
  dependencies: string[],
  options: { cwd: string; silent?: boolean } = { cwd: process.cwd() },
): Promise<void> {
  await installPackages(dependencies, 'dependencies', options);
}

export async function addDevDependency(
  dependencies: string[],
  options: { cwd: string; silent?: boolean } = { cwd: process.cwd() },
): Promise<void> {
  await installPackages(dependencies, 'devDependencies', options);
}

async function installPackages(
  dependencies: string[],
  type: 'dependencies' | 'devDependencies',
  options: { cwd: string; silent?: boolean } = { cwd: process.cwd() },
): Promise<void> {
  const pm = await detectPackageManager(options.cwd);
  const devFlag = type === 'devDependencies' ? '-D ' : '';

  let command = '';

  switch (pm?.name) {
    case 'npm':
      command = `npm install ${devFlag}${dependencies.join(' ')}`;
      break;
    case 'yarn':
      command = `yarn add ${devFlag}${dependencies.join(' ')}`;
      break;
    case 'bun':
      command = `bun add ${devFlag}${dependencies.join(' ')}`;
      break;
    case 'pnpm':
    default:
      command = `pnpm add ${devFlag}${dependencies.join(' ')}`;
      break;
  }

  const stdio = options.silent ? 'pipe' : 'inherit';
  execSync(command, { cwd: options.cwd, stdio });
}
