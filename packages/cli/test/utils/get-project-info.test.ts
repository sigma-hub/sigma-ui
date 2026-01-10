import path from 'pathe';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import { getProjectInfo } from '../../src/utils/get-project-info';

vi.mock('fs-extra');
vi.mock('pkg-types', () => ({
  readPackageJSON: vi.fn(),
}));

const { existsSync } = await import('node:fs');
const { readPackageJSON } = await import('pkg-types');

vi.mock('node:fs', async (importOriginal) => {
  const original = await importOriginal<typeof import('node:fs')>();
  return {
    ...original,
    existsSync: vi.fn(),
  };
});

describe('getProjectInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('framework detection', () => {
    it('should detect Nuxt project', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('nuxt.config.ts');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.framework).toBe('nuxt');
    });

    it('should detect Astro project', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('astro.config.mjs');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.framework).toBe('astro');
    });

    it('should detect Laravel project', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('artisan');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.framework).toBe('laravel');
    });

    it('should default to Vite project', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.framework).toBe('vite');
    });
  });

  describe('tsconfig detection', () => {
    it('should return .nuxt/tsconfig.json for Nuxt projects', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('nuxt.config.ts');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tsConfigPath).toBe('.nuxt/tsconfig.json');
    });

    it('should detect tsconfig.json for Vite projects', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('tsconfig.json') && !pathStr.includes('.nuxt');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tsConfigPath).toBe('tsconfig.json');
    });

    it('should detect tsconfig.app.json if tsconfig.json not found', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('tsconfig.app.json');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tsConfigPath).toBe('tsconfig.app.json');
    });
  });

  describe('tailwind detection', () => {
    it('should detect tailwind in dependencies', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(readPackageJSON).mockResolvedValue({
        dependencies: { tailwindcss: '^3.0.0' },
      });

      const result = await getProjectInfo('/test/project');

      expect(result.hasTailwind).toBe(true);
    });

    it('should detect tailwind in devDependencies', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(readPackageJSON).mockResolvedValue({
        devDependencies: { tailwindcss: '^3.0.0' },
      });

      const result = await getProjectInfo('/test/project');

      expect(result.hasTailwind).toBe(true);
    });

    it('should return false if tailwind not found', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(readPackageJSON).mockResolvedValue({
        dependencies: { vue: '^3.0.0' },
      });

      const result = await getProjectInfo('/test/project');

      expect(result.hasTailwind).toBe(false);
    });
  });

  describe('directory detection', () => {
    it('should detect src directory', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.endsWith('src');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.srcDir).toBe(true);
    });

    it('should detect src/components/ui directory', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('src/components/ui');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.srcComponentsUiDir).toBe(true);
    });

    it('should detect components/ui directory', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('components/ui') && !pathStr.includes('src');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.componentsUiDir).toBe(true);
    });
  });

  describe('tailwind config type detection', () => {
    it('should detect js config when tailwind.config.js exists', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('tailwind.config.js');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tailwindConfigType).toBe('js');
      expect(result.tailwindConfigPath).toBe('tailwind.config.js');
    });

    it('should detect js config when tailwind.config.ts exists', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('tailwind.config.ts');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tailwindConfigType).toBe('js');
      expect(result.tailwindConfigPath).toBe('tailwind.config.ts');
    });

    it('should detect js config when tailwind.config.mjs exists', async () => {
      vi.mocked(existsSync).mockImplementation((filePath: unknown) => {
        const pathStr = String(filePath);
        return pathStr.includes('tailwind.config.mjs');
      });
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tailwindConfigType).toBe('js');
      expect(result.tailwindConfigPath).toBe('tailwind.config.mjs');
    });

    it('should return css config type when no js config exists', async () => {
      vi.mocked(existsSync).mockReturnValue(false);
      vi.mocked(readPackageJSON).mockResolvedValue({ dependencies: {} });

      const result = await getProjectInfo('/test/project');

      expect(result.tailwindConfigType).toBe('css');
      expect(result.tailwindConfigPath).toBe(null);
    });
  });
});
