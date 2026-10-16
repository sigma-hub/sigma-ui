import { type VariantProps, cva } from 'class-variance-authority';

export { default as Typography } from './Typography.vue';

export const typographyVariants = cva(
  'sigma-ui-typography',
  {
    variants: {
      variant: {
        h1: 'sigma-ui-typography--h1',
        h2: 'sigma-ui-typography--h2',
        h3: 'sigma-ui-typography--h3',
        h4: 'sigma-ui-typography--h4',
        p: 'sigma-ui-typography--p',
        blockquote: 'sigma-ui-typography--blockquote',
        list: 'sigma-ui-typography--list',
        code: 'sigma-ui-typography--code',
        lead: 'sigma-ui-typography--lead',
        large: 'sigma-ui-typography--large',
        small: 'sigma-ui-typography--small',
        muted: 'sigma-ui-typography--muted',
        link: 'sigma-ui-typography--link',
        table: 'sigma-ui-typography--table',
      },
    },
    defaultVariants: {
      variant: 'p',
    },
  },
);

export type TypographyVariants = VariantProps<typeof typographyVariants>;
