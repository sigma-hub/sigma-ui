import { type VariantProps, cva } from 'class-variance-authority';

export { default as Typography } from './Typography.vue';

export const typographyVariants = cva(
  'text-foreground',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        h3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        p: 'leading-7 [&:not(:first-child)]:mt-6',
        blockquote: 'mt-6 border-l-2 pl-6 italic',
        list: 'my-6 ml-6 list-disc [&>li]:mt-2',
        code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        lead: 'text-xl text-muted-foreground',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-sm text-muted-foreground',
        link: 'font-medium text-primary underline underline-offset-4',
        table: 'w-full [&_tr]:border-t [&_tr:nth-child(even)]:bg-muted [&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold [&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left',
      },
    },
    defaultVariants: {
      variant: 'p',
    },
  },
);

export type TypographyVariants = VariantProps<typeof typographyVariants>;
