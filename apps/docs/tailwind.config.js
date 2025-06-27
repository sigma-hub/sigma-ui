import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1600px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
      },
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
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
      boxShadow: {
        switch: 'rgba(0, 0, 0, 0.3) 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 1px 2px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--reka-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--reka-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--reka-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'popover-slide-blur-from-top': {
          from: { opacity: '0', transform: 'translateY(-1rem) scaleY(0.98)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateY(0) scaleY(1)', filter: 'blur(0px)' },
        },
        'popover-slide-blur-from-bottom': {
          from: { opacity: '0', transform: 'translateY(1rem) scaleY(0.98)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateY(0) scaleY(1)', filter: 'blur(0px)' },
        },
        'popover-slide-blur-from-left': {
          from: { opacity: '0', transform: 'translateX(-1rem) scaleY(0.98)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateX(0) scaleY(1)', filter: 'blur(0px)' },
        },
        'popover-slide-blur-from-right': {
          from: { opacity: '0', transform: 'translateX(1rem) scaleY(0.98)', filter: 'blur(4px)' },
          to: { opacity: '1', transform: 'translateX(0) scaleY(1)', filter: 'blur(0px)' },
        },
        'popover-fade-scale-blur-out': {
          from: { opacity: '1', transform: 'scaleY(1)', filter: 'blur(0px)' },
          to: { opacity: '0', transform: 'scaleY(0.98)', filter: 'blur(4px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-out',
        'collapsible-up': 'collapsible-up 0.2s ease-out',
        'fade-in': 'fade-in 1s ease',
        'popover-slide-blur-from-top': 'popover-slide-blur-from-top 150ms ease-out',
        'popover-slide-blur-from-bottom': 'popover-slide-blur-from-bottom 150ms ease-out',
        'popover-slide-blur-from-left': 'popover-slide-blur-from-left 150ms ease-out',
        'popover-slide-blur-from-right': 'popover-slide-blur-from-right 150ms ease-out',
        'popover-fade-scale-blur-out': 'popover-fade-scale-blur-out 150ms ease-in',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
