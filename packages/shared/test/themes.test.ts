import { describe, expect, it } from 'vitest';
import { themeColorKeys, themes, toRegistryTheme } from '../src/themes';

const requiredTokens = ['accent', 'accent-foreground', 'chart-1', 'chart-5', 'sidebar', 'sidebar-ring'];

describe('themes', () => {
  it('stores every color as an OKLCH value', () => {
    for (const theme of themes) {
      for (const mode of ['light', 'dark'] as const) {
        for (const key of themeColorKeys) {
          expect(theme.cssVars[mode][key], `${theme.name} ${mode} ${key}`).toMatch(/^oklch\(/);
        }
      }
    }
  });

  it('exposes registry:theme items with the same cssVars', () => {
    const item = toRegistryTheme(themes[0]);

    expect(item.type).toBe('registry:theme');
    expect(item.name).toBe('grayscale');
    expect(item.title).toBe('Grayscale');
    expect(Object.keys(item.cssVars.light ?? {})).toEqual([...themeColorKeys]);
    expect(item.cssVars.dark?.primary).toBe(themes[0].cssVars.dark.primary);

    for (const token of requiredTokens) {
      expect(item.cssVars.light?.[token]).toMatch(/^oklch\(/);
    }
  });
});
