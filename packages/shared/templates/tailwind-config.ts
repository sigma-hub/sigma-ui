const TAILWIND_KEYFRAMES = `
"fade-in": {
  from: { opacity: 0 },
  to: { opacity: 1 },
},
"accordion-down": {
  from: { height: 0 },
  to: { height: "var(--reka-accordion-content-height)" },
},
"accordion-up": {
  from: { height: "var(--reka-accordion-content-height)" },
  to: { height: 0 },
},
"collapsible-down": {
  from: { height: 0 },
  to: { height: 'var(--reka-collapsible-content-height)' },
},
"collapsible-up": {
  from: { height: 'var(--reka-collapsible-content-height)' },
  to: { height: 0 },
},
`;

const TAILWIND_ANIMATION = `
"fade-in": "fade-in 0.5s ease-in-out",
"accordion-down": "accordion-down 0.2s ease-out",
"accordion-up": "accordion-up 0.2s ease-out",
"collapsible-down": "collapsible-down 0.2s ease-in-out",
"collapsible-up": "collapsible-up 0.2s ease-in-out",
`;

export const UTILS_TEMPLATE = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

export const TAILWIND_CONFIG_TEMPLATE = `const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
        ${TAILWIND_KEYFRAMES}
      },
      animation: {
        ${TAILWIND_ANIMATION}
      },
    },
  },
  plugins: [animate],
}`;
