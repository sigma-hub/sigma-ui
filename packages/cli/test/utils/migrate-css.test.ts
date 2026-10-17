import { describe, expect, it } from 'vitest';
import { isLegacyThemeCss, migrateThemeCss } from '../../src/utils/migrate/css';

const LEGACY_TAILWIND_CSS = `@tailwind base;
@tailwind components;
@tailwind utilities;
@import "tailwindcss-animate";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
`;

describe('isLegacyThemeCss', () => {
  it('detects 1.x Tailwind stylesheets', () => {
    expect(isLegacyThemeCss(LEGACY_TAILWIND_CSS, 'tailwind')).toBe(true);
    expect(isLegacyThemeCss(':root { --primary: 240 5.9% 10%; }', 'css')).toBe(true);
  });

  it('treats a migrated stylesheet as current', () => {
    const migrated = migrateThemeCss(LEGACY_TAILWIND_CSS, { styleSystem: 'tailwind', hasJsConfig: false }).css;

    expect(isLegacyThemeCss(migrated, 'tailwind')).toBe(false);
  });

  it('does not flag a JS-config Tailwind theme that still uses triplets after @theme is added', () => {
    const migrated = migrateThemeCss(LEGACY_TAILWIND_CSS, { styleSystem: 'tailwind', hasJsConfig: true }).css;

    expect(migrated).toContain('--primary: 240 5.9% 10%;');
    expect(migrated).toContain('--color-primary: hsl(var(--primary));');
    expect(isLegacyThemeCss(migrated, 'tailwind')).toBe(false);
  });
});

describe('migrateThemeCss', () => {
  it('wraps HSL triplets and fills missing tokens for CSS-first Tailwind', () => {
    const { css, changes } = migrateThemeCss(LEGACY_TAILWIND_CSS, { styleSystem: 'tailwind', hasJsConfig: false });

    expect(css).toContain('--primary: hsl(240 5.9% 10%);');
    expect(css).toContain('--color-primary: var(--primary);');
    expect(css).toContain('--sidebar: var(--background);');
    expect(css).toContain('--accent: var(--secondary);');
    expect(css).toContain('@import "tailwindcss";');
    expect(css).toContain('@import "tw-animate-css";');
    expect(css).not.toContain('tailwindcss-animate');
    expect(css).not.toContain('@tailwind base');
    expect(changes).toEqual(expect.arrayContaining([
      'HSL triplet variables -> hsl() colors so var(--token) works in 2.0 components',
      '@tailwind directives -> @import "tailwindcss"',
      'removed tailwindcss-animate',
    ]));
  });

  it('wraps HSL triplets for the CSS style system', () => {
    const { css } = migrateThemeCss(':root { --primary: 240 5.9% 10%; --secondary: 240 4.8% 95.9%; }', {
      styleSystem: 'css',
      hasJsConfig: false,
    });

    expect(css).toContain('--primary: hsl(240 5.9% 10%);');
    expect(css).toContain('--sidebar:');
    expect(css).not.toContain('tw-animate-css');
  });
});
