import { readFileSync } from 'node:fs';
import { resolve } from 'pathe';
import { parse } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';
import { themes } from '../src/themes';
import { type Rgb, type Variables, composite, contrastRatio, evaluateColor, readDeclarations, toSrgb } from './utils/css-color';

const registryRoot = resolve(__dirname, '../../lib/src/registry');
const LIGHT = '[data-slot=\'code-block\']';
const DARK = '.dark [data-slot=\'code-block\']';
// WCAG AA for normal text.
const MIN_CONTRAST = 4.5;

function readStyles(style: 'css' | 'tailwind') {
  const file = resolve(registryRoot, style, 'ui/code-block/CodeBlock.vue');
  const { descriptor } = parse(readFileSync(file, 'utf8'), { filename: file });
  return descriptor.styles.map(block => block.content).join('\n');
}

const styles = { css: readStyles('css'), tailwind: readStyles('tailwind') };
const palette = {
  light: readDeclarations(styles.css, LIGHT),
  dark: readDeclarations(styles.css, DARK),
};

function themeVariables(mode: 'light' | 'dark', cssVars: Record<string, string>): Variables {
  const tokens = Object.fromEntries(Object.entries(cssVars).map(([key, value]) => [`--${key}`, value]));
  return mode === 'light' ? { ...tokens, ...palette.light } : { ...tokens, ...palette.light, ...palette.dark };
}

function color(name: string, variables: Variables, backdrop: Rgb) {
  return composite(evaluateColor(`var(${name})`, variables), backdrop);
}

describe('CodeBlock palette', () => {
  it('declares the same variables in both styles', () => {
    expect(readDeclarations(styles.tailwind, LIGHT)).toEqual(palette.light);
    expect(readDeclarations(styles.tailwind, DARK)).toEqual(palette.dark);
  });

  it('only overrides variables in dark mode that light mode declares', () => {
    expect(Object.keys(palette.dark).filter(name => !(name in palette.light))).toEqual([]);
  });

  const textColors = Object.keys(palette.light).filter(name => /-(token|ansi)-|line-number/.test(name));

  it('reads the full palette', () => {
    expect(textColors.length).toBeGreaterThan(25);
  });

  describe.each(themes.map(theme => [theme.name, theme] as const))('%s theme', (_name, theme) => {
    describe.each(['light', 'dark'] as const)('%s mode', (mode) => {
      const variables = themeVariables(mode, theme.cssVars[mode]);
      const page = toSrgb(evaluateColor('var(--background)', variables));
      const block = color('--code-block-background', variables, page);
      const backgrounds: Record<string, Rgb> = {
        block,
        highlighted: color('--code-block-highlighted', variables, block),
        added: color('--code-block-added', variables, block),
        removed: color('--code-block-removed', variables, block),
        word: color('--code-block-word', variables, block),
      };

      it('keeps token, ANSI, and line number colors readable on every line background', () => {
        const failures = textColors.flatMap(name => Object.entries(backgrounds)
          .map(([background, backdrop]) => ({ name, background, ratio: contrastRatio(color(name, variables, backdrop), backdrop) }))
          .filter(result => result.ratio < MIN_CONTRAST)
          .map(result => `${result.name} on ${result.background}: ${result.ratio.toFixed(2)}`));

        expect(failures).toEqual([]);
      });

      it('keeps diff markers readable on their lines', () => {
        expect(contrastRatio(color('--code-block-added-marker', variables, backgrounds.added), backgrounds.added)).toBeGreaterThanOrEqual(MIN_CONTRAST);
        expect(contrastRatio(color('--code-block-removed-marker', variables, backgrounds.removed), backgrounds.removed)).toBeGreaterThanOrEqual(MIN_CONTRAST);
      });

      it('keeps destructive text readable on the destructive block', () => {
        const destructive = composite(evaluateColor('color-mix(in oklch, var(--destructive) 5%, var(--code-block-background))', variables), page);
        const header = composite(evaluateColor('color-mix(in oklch, var(--destructive) 8%, var(--code-block-header))', variables), destructive);

        for (const backdrop of [destructive, header]) {
          expect(contrastRatio(color('--code-block-destructive-foreground', variables, backdrop), backdrop)).toBeGreaterThanOrEqual(MIN_CONTRAST);
        }
      });

      it('tints added and removed lines green and red', () => {
        const added = evaluateColor('var(--code-block-added)', variables);
        const removed = evaluateColor('var(--code-block-removed)', variables);

        expect(added.h).toBeGreaterThan(120);
        expect(added.h).toBeLessThan(170);
        expect(removed.h! < 40 || removed.h! > 340).toBe(true);
      });
    });
  });
});
