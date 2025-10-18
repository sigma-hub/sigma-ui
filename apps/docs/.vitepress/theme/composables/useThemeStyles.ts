import { themes } from '@/lib/registry/themes';

export function useThemeStyles() {
  if (typeof document === 'undefined') {
    return;
  }

  const styleId = 'dynamic-theme-styles';

  if (document.getElementById(styleId)) {
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

  styleElement.id = styleId;
  styleElement.textContent = css;
  document.head.appendChild(styleElement);
}
