import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createConfig, runInit } from '../../src/commands/init';
import { getProjectInfo } from '../../src/utils/get-project-info';
import { installPackages } from '../../src/utils/package-manager';

vi.mock('../../src/utils/package-manager', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../src/utils/package-manager')>();
  return { ...original, installPackages: vi.fn() };
});
vi.mock('ora', () => ({
  default: () => ({ start: () => ({ stop: vi.fn(), succeed: vi.fn(), fail: vi.fn() }) }),
}));
vi.mock('consola');

function createProject(files: Record<string, string>) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-init-'));

  for (const [filePath, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(cwd, filePath)), { recursive: true });
    writeFileSync(path.join(cwd, filePath), content);
  }

  return cwd;
}

const read = (cwd: string, filePath: string) => readFileSync(path.join(cwd, filePath), 'utf8');

const VITE_PROJECT = {
  'package.json': JSON.stringify({ dependencies: { vue: '^3.5.0' }, devDependencies: { typescript: '~6.0.2' } }),
  'tsconfig.json': JSON.stringify({ compilerOptions: { paths: { '@/*': ['./src/*'] } } }),
  'vite.config.ts': `import { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\nexport default defineConfig({\n  plugins: [vue()],\n})\n`,
  'src/main.ts': `import { createApp } from 'vue'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')\n`,
};

const NUXT_PROJECT = {
  'package.json': JSON.stringify({ devDependencies: { nuxt: '^4.0.0' } }),
  'nuxt.config.ts': `export default defineNuxtConfig({\n  devtools: { enabled: true },\n})\n`,
  'app/app.vue': '<template><NuxtPage /></template>\n',
};

async function initProject(cwd: string, styleSystem: 'tailwind' | 'css') {
  const projectInfo = await getProjectInfo(cwd);
  const rawConfig = createConfig(cwd, projectInfo, { styleSystem, baseColor: 'grayscale', componentNaming: 'pascal-case' });
  return runInit(cwd, rawConfig, { yes: true, projectInfo });
}

afterEach(() => {
  vi.mocked(installPackages).mockReset();
});

describe('init', () => {
  it('sets up a Vite project with Tailwind v4', async () => {
    const cwd = createProject(VITE_PROJECT);
    const config = await initProject(cwd, 'tailwind');

    expect(JSON.parse(read(cwd, 'sigma-ui.config.json'))).toMatchObject({
      $schema: 'https://sigma-ui.dev/schema.json',
      styleSystem: 'tailwind',
      framework: 'vite',
      cssPath: 'src/assets/index.css',
      setupTailwind: true,
      tailwind: { config: '' },
      aliases: { components: '@/components/ui', utils: '@/lib/utils' },
    });
    expect(config.resolvedPaths.components).toBe(path.join(cwd, 'src/components/ui'));
    expect(existsSync(config.resolvedPaths.components)).toBe(true);
    expect(read(cwd, 'src/assets/index.css')).toContain('@import "tailwindcss";');
    expect(read(cwd, 'src/assets/index.css')).toMatch(/--background: /);
    expect(read(cwd, 'src/lib/utils.ts')).toContain('twMerge');
    expect(read(cwd, 'vite.config.ts')).toMatch(/import tailwindcss from ['"]@tailwindcss\/vite['"]/);
    expect(read(cwd, 'vite.config.ts')).toMatch(/plugins: \[vue\(\), tailwindcss\(\)\]/);
    expect(read(cwd, 'vite.config.ts')).toMatch(/['"]@['"]:\s*fileURLToPath\(new URL\('\.\/src', import\.meta\.url\)\)/);
    expect(read(cwd, 'src/main.ts').startsWith('import \'./assets/index.css\';\n')).toBe(true);
    expect(existsSync(path.join(cwd, 'tailwind.config.js'))).toBe(false);
    expect(installPackages).toHaveBeenCalledWith(['clsx', 'tailwind-merge', 'tw-animate-css'], { cwd, silent: true });
    expect(installPackages).toHaveBeenCalledWith(['@types/node', 'tailwindcss', '@tailwindcss/vite'], { cwd, dev: true, silent: true });
  });

  it('adds the @ alias to a Vite project that uses tsconfig references', async () => {
    const cwd = createProject({
      ...VITE_PROJECT,
      'tsconfig.json': JSON.stringify({ files: [], references: [{ path: './tsconfig.app.json' }] }),
      'tsconfig.app.json': `{
  "compilerOptions": {
    /* Linting */
    "noUnusedLocals": true
  },
  "include": ["src/**/*.vue"]
}
`,
    });

    await initProject(cwd, 'tailwind');

    const appConfig = read(cwd, 'tsconfig.app.json');
    expect(appConfig).toContain('"@/*": ["./src/*"]');
    expect(appConfig).not.toContain('baseUrl');
    expect(appConfig).toContain('/* Linting */');
    expect(read(cwd, 'tsconfig.json')).not.toContain('"@/*"');
    expect(read(cwd, 'vite.config.ts')).toContain('fileURLToPath');
  });

  it('is idempotent when run twice', async () => {
    const cwd = createProject(VITE_PROJECT);
    await initProject(cwd, 'tailwind');
    const viteConfig = read(cwd, 'vite.config.ts');
    const entry = read(cwd, 'src/main.ts');

    await initProject(cwd, 'tailwind');

    expect(read(cwd, 'vite.config.ts')).toBe(viteConfig);
    expect(read(cwd, 'src/main.ts')).toBe(entry);
  });

  it('sets up a Nuxt 4 project with the CSS style system', async () => {
    const cwd = createProject(NUXT_PROJECT);
    const config = await initProject(cwd, 'css');

    expect(config.cssPath).toBe('app/assets/css/tailwind.css');
    expect(config.aliases.utils).toBe('');
    expect(config.resolvedPaths.components).toBe(path.join(cwd, 'app/components/ui'));
    expect(read(cwd, 'app/assets/css/tailwind.css')).toContain('@import "./preflight.css";');
    expect(existsSync(path.join(cwd, 'app/assets/css/preflight.css'))).toBe(true);
    expect(read(cwd, 'nuxt.config.ts')).toMatch(/css: \[['"]~\/assets\/css\/tailwind\.css['"]\]/);
    expect(read(cwd, 'nuxt.config.ts')).not.toContain('@tailwindcss/vite');
    expect(installPackages).toHaveBeenCalledWith(['typescript@~5.9.3'], { cwd, dev: true, silent: true });
  });

  it('skips TypeScript when a Nuxt project already depends on it', async () => {
    const cwd = createProject({
      ...NUXT_PROJECT,
      'package.json': JSON.stringify({ devDependencies: { nuxt: '^4.0.0', typescript: '^5.9.3' } }),
    });

    await initProject(cwd, 'css');

    expect(installPackages).not.toHaveBeenCalled();
  });

  it('registers @tailwindcss/vite in nuxt.config instead of @nuxtjs/tailwindcss', async () => {
    const cwd = createProject(NUXT_PROJECT);
    await initProject(cwd, 'tailwind');
    const nuxtConfig = read(cwd, 'nuxt.config.ts');

    expect(nuxtConfig).toMatch(/import tailwindcss from ['"]@tailwindcss\/vite['"]/);
    expect(nuxtConfig).toMatch(/vite: \{\s*plugins: \[tailwindcss\(\)\]/);
    expect(installPackages).toHaveBeenCalledWith(['typescript@~5.9.3', 'tailwindcss', '@tailwindcss/vite'], { cwd, dev: true, silent: true });
    expect(vi.mocked(installPackages).mock.calls.flat(2)).not.toContain('@nuxtjs/tailwindcss');
  });

  it('registers @tailwindcss/vite when tailwindcss is already installed', async () => {
    const cwd = createProject({
      ...VITE_PROJECT,
      'package.json': JSON.stringify({ dependencies: { vue: '^3.5.0' }, devDependencies: { tailwindcss: '^4.1.0' } }),
    });
    await initProject(cwd, 'tailwind');

    expect(read(cwd, 'vite.config.ts')).toMatch(/import tailwindcss from ['"]@tailwindcss\/vite['"]/);
    expect(read(cwd, 'vite.config.ts')).toMatch(/plugins: \[vue\(\), tailwindcss\(\)\]/);
    expect(installPackages).toHaveBeenCalledWith(['@types/node', '@tailwindcss/vite'], { cwd, dev: true, silent: true });
  });

  it('references an existing JS Tailwind config without overwriting it', async () => {
    const tailwindConfig = 'module.exports = { content: [] }\n';
    const cwd = createProject({
      ...VITE_PROJECT,
      'package.json': JSON.stringify({ dependencies: { vue: '^3.5.0' }, devDependencies: { tailwindcss: '^4.1.0' } }),
      'tailwind.config.js': tailwindConfig,
    });
    await initProject(cwd, 'tailwind');

    expect(read(cwd, 'tailwind.config.js')).toBe(tailwindConfig);
    expect(read(cwd, 'src/assets/index.css')).toContain('@config "tailwind.config.js";');
    expect(read(cwd, 'vite.config.ts')).toMatch(/import tailwindcss from ['"]@tailwindcss\/vite['"]/);
    expect(read(cwd, 'vite.config.ts')).toMatch(/plugins: \[vue\(\), tailwindcss\(\)\]/);
  });
});
