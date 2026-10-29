import { describe, expect, it } from 'vitest';
import type { ThemeRegistration } from 'shiki';
import { CODE_THEME_REGISTRATIONS, CODE_THEMES } from './shiki';

function luminance(hex: string) {
  const [red, green, blue] = [1, 3, 5].map((start) => {
    const channel = Number.parseInt(hex.slice(start, start + 2), 16) / 255;

    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);

  return (lighter + 0.05) / (darker + 0.05);
}

function commentColor(theme: ThemeRegistration) {
  const rule = (theme.tokenColors ?? []).find(item => [item.scope ?? []].flat().includes('comment'));

  return rule?.settings.foreground ?? '';
}

describe('code themes', () => {
  it('registers the light and dark names used for the dual-theme output', () => {
    expect(CODE_THEME_REGISTRATIONS.light.name).toBe(CODE_THEMES.light);
    expect(CODE_THEME_REGISTRATIONS.dark.name).toBe(CODE_THEMES.dark);
  });

  it('keeps comments readable on the docs code backgrounds (WCAG AA, 4.5:1)', () => {
    // Slightly harsher backgrounds than the ones in code-blocks.css.
    expect(contrast(commentColor(CODE_THEME_REGISTRATIONS.light), '#f5f5f5')).toBeGreaterThanOrEqual(4.5);
    expect(contrast(commentColor(CODE_THEME_REGISTRATIONS.dark), '#1f1f1f')).toBeGreaterThanOrEqual(4.5);
  });

  it('uses opaque comment colours (the stock vesper comment is 58% alpha)', () => {
    expect(commentColor(CODE_THEME_REGISTRATIONS.light)).toMatch(/^#[0-9a-f]{6}$/i);
    expect(commentColor(CODE_THEME_REGISTRATIONS.dark)).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
