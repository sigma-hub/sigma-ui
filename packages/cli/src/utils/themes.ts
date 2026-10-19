import { template } from 'lodash-es';
import { baseColors, themes } from '@sigma-ui/shared/themes';
import { styleSystems } from '@sigma-ui/shared/style-systems';
import { CSS_STYLES_WITH_VARS_TEMPLATE } from '@sigma-ui/shared/templates/css-styles';

const THEME_SIZES = {
  radius: 0.5,
  backdropFilterBlur: 32,
};

export function getStyleSystems() {
  return styleSystems;
}

export function getBaseColors() {
  return baseColors;
}

export function getTheme(baseColor: string) {
  const theme = themes.find(currentTheme => currentTheme.name === baseColor);

  if (!theme) {
    throw new Error(`Unknown base color "${baseColor}". Available: ${baseColors.map(color => color.name).join(', ')}.`);
  }

  return {
    cssVars: theme.cssVars,
    cssStylesWithVariables: template(CSS_STYLES_WITH_VARS_TEMPLATE)({ colors: theme.cssVars, sizes: THEME_SIZES }),
  };
}
