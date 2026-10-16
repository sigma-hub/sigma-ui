import { baseColors, themes } from '@sigma-ui/shared/themes';
import {
  DOCS_APPEARANCE_KEY,
  DOCS_CONFIG_KEY,
  parseStoredJson,
  readPreviewConfig,
  resolvePreviewAppearance,
  resolvePreviewDark,
} from '../../.vitepress/block-renderer/frame';

const THEME_STYLE_ID = 'dynamic-theme-styles';

export function installPreviewThemeStyles() {
  if (document.getElementById(THEME_STYLE_ID)) {
    return;
  }

  let css = '';

  for (const theme of themes) {
    css += `.theme-${theme.name} {\n`;

    for (const [key, value] of Object.entries(theme.cssVars.light)) {
      css += `  --${key}: ${value};\n`;
    }

    css += '}\n\n';
    css += `.theme-${theme.name}.dark {\n`;

    for (const [key, value] of Object.entries(theme.cssVars.dark)) {
      css += `  --${key}: ${value};\n`;
    }

    css += '}\n\n';
  }

  const styleElement = document.createElement('style');
  styleElement.id = THEME_STYLE_ID;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}

export function applyPreviewTheme(prefersDark: boolean) {
  const root = document.documentElement;
  const appearance = resolvePreviewAppearance(parseStoredJson(localStorage.getItem(DOCS_APPEARANCE_KEY)));
  const preview = readPreviewConfig(parseStoredJson(localStorage.getItem(DOCS_CONFIG_KEY)));

  root.classList.toggle('dark', resolvePreviewDark(appearance, prefersDark));
  root.classList.remove(...baseColors.map(color => `theme-${color.name}`));
  root.classList.add(`theme-${preview.theme}`);
  root.style.setProperty('--radius', `${preview.radius}rem`);
  root.style.setProperty('--backdrop-filter-blur', `${preview.backdropFilterBlur}px`);
}
