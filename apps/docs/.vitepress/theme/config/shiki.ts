import githubLightDefault from 'shiki/themes/github-light-default.mjs';
import vesper from 'shiki/themes/vesper.mjs';
import type { ThemeRegistration } from 'shiki';

/**
 * Comments in the stock themes are the weakest part for readability:
 * vesper ships its comment colour at 58% alpha, github-light-default is just under 4.5:1 on our code background.
 * Both are replaced with opaque colours that stay above 4.5:1 on the docs code backgrounds.
 */
const COMMENT_SCOPES = ['comment', 'punctuation.definition.comment', 'string.comment'];

function withCommentColor(theme: ThemeRegistration, name: string, color: string): ThemeRegistration {
  const tokenColors = (theme.tokenColors ?? theme.settings ?? []).map((rule) => {
    const scopes = [rule.scope ?? []].flat();

    return scopes.some(scope => COMMENT_SCOPES.includes(scope))
      ? { ...rule, settings: { ...rule.settings, foreground: color } }
      : rule;
  });

  return { ...theme, name, tokenColors, settings: undefined };
}

export const CODE_THEME_REGISTRATIONS = {
  light: withCommentColor(githubLightDefault as ThemeRegistration, 'sigma-light', '#59636e'),
  dark: withCommentColor(vesper as ThemeRegistration, 'sigma-dark', '#8b8b94'),
} as const;

export const CODE_THEMES = {
  light: 'sigma-light',
  dark: 'sigma-dark',
} as const;

/** Matches the dual-theme output of VitePress: `--shiki-light` / `--shiki-dark` on every token. */
export const CODE_THEME_OPTIONS = {
  themes: CODE_THEMES,
  defaultColor: false,
} as const;
