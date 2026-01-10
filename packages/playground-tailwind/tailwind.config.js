const animate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'min(calc(var(--radius) / 2.5), 6px)',
      },
      keyframes: {
        'sigma-ui-fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'sigma-ui-accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--reka-accordion-content-height)' },
        },
        'sigma-ui-accordion-up': {
          from: { height: 'var(--reka-accordion-content-height)' },
          to: { height: 0 },
        },
        'sigma-ui-collapsible-down': {
          from: { height: 0 },
          to: { height: 'var(--reka-collapsible-content-height)' },
        },
        'sigma-ui-collapsible-up': {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'fade-in': 'sigma-ui-fade-in 0.5s ease-in-out',
        'accordion-down': 'sigma-ui-accordion-down 0.2s ease-out',
        'accordion-up': 'sigma-ui-accordion-up 0.2s ease-out',
        'collapsible-down': 'sigma-ui-collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'sigma-ui-collapsible-up 0.2s ease-in-out',
      },
    },
  },
  plugins: [animate],
};
