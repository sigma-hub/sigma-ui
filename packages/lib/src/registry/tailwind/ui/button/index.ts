import { type VariantProps, cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';
export { default as ConfirmButton } from './ConfirmButton.vue';

export const buttonVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-secondary hover:text-secondary-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        'default': 'h-9 px-4 has-[>svg]:px-3',
        'xs': 'h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*=size-])]:size-3',
        'sm': 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        'lg': 'h-10 px-6 has-[>svg]:px-4',
        'icon': 'size-9',
        'icon-xs': 'size-6 [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
