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

const TAILWIND_KEYFRAMES_JS = `
"sigma-ui-fade-in": {
  from: { opacity: 0 },
  to: { opacity: 1 },
},
"sigma-ui-accordion-down": {
  from: { height: 0 },
  to: { height: "var(--reka-accordion-content-height)" },
},
"sigma-ui-accordion-up": {
  from: { height: "var(--reka-accordion-content-height)" },
  to: { height: 0 },
},
"sigma-ui-collapsible-down": {
  from: { height: 0 },
  to: { height: "var(--reka-collapsible-content-height)" },
},
"sigma-ui-collapsible-up": {
  from: { height: "var(--reka-collapsible-content-height)" },
  to: { height: 0 },
},
"sigma-ui-popover-slide-blur-from-top": {
  from: { opacity: 0, transform: "translateY(-1rem) scaleY(0.98)", filter: "blur(4px)" },
  to: { opacity: 1, transform: "translateY(0) scaleY(1)", filter: "blur(0px)" },
},
"sigma-ui-popover-slide-blur-from-bottom": {
  from: { opacity: 0, transform: "translateY(1rem) scaleY(0.98)", filter: "blur(4px)" },
  to: { opacity: 1, transform: "translateY(0) scaleY(1)", filter: "blur(0px)" },
},
"sigma-ui-popover-slide-blur-from-left": {
  from: { opacity: 0, transform: "translateX(-1rem) scaleY(0.98)", filter: "blur(4px)" },
  to: { opacity: 1, transform: "translateX(0) scaleY(1)", filter: "blur(0px)" },
},
"sigma-ui-popover-slide-blur-from-right": {
  from: { opacity: 0, transform: "translateX(1rem) scaleY(0.98)", filter: "blur(4px)" },
  to: { opacity: 1, transform: "translateX(0) scaleY(1)", filter: "blur(0px)" },
},
"sigma-ui-popover-fade-scale-blur-out": {
  from: { opacity: 1, transform: "scaleY(1)", filter: "blur(0px)" },
  to: { opacity: 0, transform: "scaleY(0.98)", filter: "blur(4px)" },
},
`;

const TAILWIND_ANIMATION_JS = `
"fade-in": "sigma-ui-fade-in 0.5s ease-in-out",
"accordion-down": "sigma-ui-accordion-down 0.2s ease-out",
"accordion-up": "sigma-ui-accordion-up 0.2s ease-out",
"collapsible-down": "sigma-ui-collapsible-down 0.2s ease-in-out",
"collapsible-up": "sigma-ui-collapsible-up 0.2s ease-in-out",
"popover-slide-blur-from-top": "sigma-ui-popover-slide-blur-from-top 150ms ease-out",
"popover-slide-blur-from-bottom": "sigma-ui-popover-slide-blur-from-bottom 150ms ease-out",
"popover-slide-blur-from-left": "sigma-ui-popover-slide-blur-from-left 150ms ease-out",
"popover-slide-blur-from-right": "sigma-ui-popover-slide-blur-from-right 150ms ease-out",
"popover-fade-scale-blur-out": "sigma-ui-popover-fade-scale-blur-out 150ms ease-in",
`;

export const TAILWIND_CONFIG_JS_TEMPLATE = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "<%- prefix %>",
  <% if (framework === 'vite') { %>
  content: [
    './pages/**/*.{<%- extension %>,<%- extension %>x,vue}',
    './components/**/*.{<%- extension %>,<%- extension %>x,vue}',
    './app/**/*.{<%- extension %>,<%- extension %>x,vue}',
    './src/**/*.{<%- extension %>,<%- extension %>x,vue}',
  ],
  <% } else if (framework === 'laravel') { %>
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.{<%- extension %>,<%- extension %>x,vue}",
  ],
  <% } else if (framework === 'astro') { %>
    content: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
  <% } %>
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: 'min(calc(var(--radius) / 2.5), 6px)',
      },
      keyframes: {
        ${TAILWIND_KEYFRAMES_JS}
      },
      animation: {
        ${TAILWIND_ANIMATION_JS}
      },
    },
  },
  plugins: [],
}`;

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
