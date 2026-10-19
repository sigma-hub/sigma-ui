import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { parseEnv } from 'node:util';
import path from 'pathe';

export const ENV_FILES = ['.env', '.env.local'];

/**
 * Reads `.env` and `.env.local` from the project so registry headers such as `Bearer ${REGISTRY_TOKEN}` resolve.
 * Variables that are already set in the environment win, and `.env.local` wins over `.env`.
 */
export function loadEnvFiles(cwd: string, env: NodeJS.ProcessEnv = process.env) {
  const fromFiles: Record<string, string> = {};

  for (const file of ENV_FILES) {
    const filePath = path.join(cwd, file);

    if (existsSync(filePath)) {
      Object.assign(fromFiles, parseEnv(readFileSync(filePath, 'utf8')));
    }
  }

  const loaded: string[] = [];

  for (const [name, value] of Object.entries(fromFiles)) {
    if (env[name] === undefined) {
      env[name] = value;
      loaded.push(name);
    }
  }

  return loaded;
}
