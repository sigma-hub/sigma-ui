import { themeColorKeys } from '../themes';

const themeColorLines = themeColorKeys
  .map(key => `  --color-${key}: var(--${key});`)
  .join('\n');

export const UTILS_TEMPLATE = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

export const TAILWIND_V4_CSS_TEMPLATE = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
${themeColorLines}

  --radius-xl: calc(var(--radius) + 4px);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xs: min(calc(var(--radius) / 2.5), 6px);

  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-collapsible-down: collapsible-down 0.2s ease-out;
  --animate-collapsible-up: collapsible-up 0.2s ease-out;
  --animate-fade-in: fade-in 1s ease;
  --animate-popover-slide-blur-from-top: popover-slide-blur-from-top 150ms ease-out;
  --animate-popover-slide-blur-from-bottom: popover-slide-blur-from-bottom 150ms ease-out;
  --animate-popover-slide-blur-from-left: popover-slide-blur-from-left 150ms ease-out;
  --animate-popover-slide-blur-from-right: popover-slide-blur-from-right 150ms ease-out;
  --animate-popover-fade-scale-blur-out: popover-fade-scale-blur-out 150ms ease-in;

  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--reka-accordion-content-height);
    }
  }

  @keyframes accordion-up {
    from {
      height: var(--reka-accordion-content-height);
    }
    to {
      height: 0;
    }
  }

  @keyframes collapsible-down {
    from {
      height: 0;
    }
    to {
      height: var(--reka-collapsible-content-height);
    }
  }

  @keyframes collapsible-up {
    from {
      height: var(--reka-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes popover-slide-blur-from-top {
    from { opacity: 0; transform: translateY(-1rem) scaleY(0.98); filter: blur(4px); }
    to { opacity: 1; transform: translateY(0) scaleY(1); filter: blur(0px); }
  }

  @keyframes popover-slide-blur-from-bottom {
    from { opacity: 0; transform: translateY(1rem) scaleY(0.98); filter: blur(4px); }
    to { opacity: 1; transform: translateY(0) scaleY(1); filter: blur(0px); }
  }

  @keyframes popover-slide-blur-from-left {
    from { opacity: 0; transform: translateX(-1rem) scaleY(0.98); filter: blur(4px); }
    to { opacity: 1; transform: translateX(0) scaleY(1); filter: blur(0px); }
  }

  @keyframes popover-slide-blur-from-right {
    from { opacity: 0; transform: translateX(1rem) scaleY(0.98); filter: blur(4px); }
    to { opacity: 1; transform: translateX(0) scaleY(1); filter: blur(0px); }
  }

  @keyframes popover-fade-scale-blur-out {
    from { opacity: 1; transform: scaleY(1); filter: blur(0px); }
    to { opacity: 0; transform: scaleY(0.98); filter: blur(4px); }
  }
}

@layer base {
  :root {
    --backdrop-filter-blur: 32px;
    --radius: 0.5rem;

    <%- cssVarsLight %>
  }
 
  .dark {
    <%- cssVarsDark %>
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
`;

export const TAILWIND_CSS_WITH_JS_CONFIG_TEMPLATE = `@import "tailwindcss";
@config "<%- configPath %>";

@layer base {
  :root {
    --backdrop-filter-blur: 32px;
    --radius: 0.5rem;

    <%- cssVarsLight %>
  }
 
  .dark {
    <%- cssVarsDark %>
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
`;
