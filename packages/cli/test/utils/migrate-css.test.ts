import { describe, expect, it } from 'vitest';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/css-styles';
import { cssDefinesSpacing, isLegacyThemeCss, migrateThemeCss } from '../../src/utils/migrate/css';

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
    expect(isLegacyThemeCss(':root { --primary: oklch(0.2 0 0); --sidebar: oklch(1 0 0); }', 'css')).toBe(true);
    expect(isLegacyThemeCss(':root { --spacing: 0.25rem; --primary: oklch(0.2 0 0); --sidebar: oklch(1 0 0); }', 'css')).toBe(false);
    expect(isLegacyThemeCss('@import "tailwindcss";\n:root { --primary: oklch(0.2 0 0); --sidebar: oklch(1 0 0); }', 'css')).toBe(false);
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

  it('adds the spacing token for the CSS style system', () => {
    const { css, changes } = migrateThemeCss(':root { --primary: 240 5.9% 10%; }', { styleSystem: 'css', hasJsConfig: false });

    expect(css).toMatch(/:root \{\n\s+--spacing: 0\.25rem;/);
    expect(changes).toContain('added the --spacing token used by CSS style components');
    expect(isLegacyThemeCss(css, 'css')).toBe(false);
  });

  it('keeps an existing spacing token', () => {
    const source = ':root { --spacing: 4px; --primary: oklch(0.2 0 0); --sidebar: oklch(1 0 0); }';
    const { css, changes } = migrateThemeCss(source, { styleSystem: 'css', hasJsConfig: false });

    expect(css.match(/--spacing:/g)).toHaveLength(1);
    expect(css).toContain('--spacing: 4px;');
    expect(changes).not.toContain('added the --spacing token used by CSS style components');
  });

  it('does not add the spacing token for the Tailwind style system', () => {
    const { css } = migrateThemeCss(LEGACY_TAILWIND_CSS, { styleSystem: 'tailwind', hasJsConfig: false });

    expect(css).not.toContain('--spacing');
  });
});

describe('cssDefinesSpacing', () => {
  it('is true for the stylesheet init writes for the CSS style system', () => {
    expect(CSS_STYLES_WITH_VARS_TEMPLATE).toContain('--spacing: 0.25rem;');
    expect(cssDefinesSpacing(CSS_STYLES_WITH_VARS_TEMPLATE)).toBe(true);
  });
});
