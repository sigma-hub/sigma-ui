import { type VariantProps, cva } from 'class-variance-authority';

export { default as Sheet } from './Sheet.vue';
export { default as SheetTrigger } from './SheetTrigger.vue';
export { default as SheetClose } from './SheetClose.vue';
export { default as SheetContent } from './SheetContent.vue';
export { default as SheetHeader } from './SheetHeader.vue';
export { default as SheetTitle } from './SheetTitle.vue';
export { default as SheetDescription } from './SheetDescription.vue';
export { default as SheetFooter } from './SheetFooter.vue';

export const sheetVariants = cva(
  'sigma-ui-sheet-content__base',
  {
    variants: {
      side: {
        top: 'sigma-ui-sheet-content--top',
        bottom: 'sigma-ui-sheet-content--bottom',
        left: 'sigma-ui-sheet-content--left',
        right: 'sigma-ui-sheet-content--right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export type SheetVariants = VariantProps<typeof sheetVariants>;
