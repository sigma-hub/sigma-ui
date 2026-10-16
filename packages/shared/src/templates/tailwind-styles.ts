import { themeColorKeys } from '../themes';

const themeColorLines = themeColorKeys
  .map(key => `  --color-${key}: var(--${key});`)
  .join('\n');

function colorDeclarations(mode: 'light' | 'dark') {
  return `<% Object.entries(colors.${mode}).forEach(function (entry) { %>
    --<%= entry[0] %>: <%= entry[1] %>;
<% }) %>`;
}

export const TAILWIND_STYLES_WITH_VARS_TEMPLATE = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
${themeColorLines}

  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xs: min(calc(var(--radius) / 2.5), 6px);
}

@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }

  :root {
    --backdrop-filter-blur: <%- sizes.backdropFilterBlur %>px;
    --radius: <%- sizes.radius %>rem;
${colorDeclarations('light')}
  }

  .dark {
${colorDeclarations('dark')}
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}`;
