import { expect, it, describe } from 'vitest';
import {
  pascalToKebab,
  transformFileName,
  transformLocalVueImports,
} from '../../src/utils/transformers/transform-component-naming';

describe('pascalToKebab', () => {
  it('should convert PascalCase to kebab-case', () => {
    expect(pascalToKebab('Button')).toBe('button');
    expect(pascalToKebab('AlertDialog')).toBe('alert-dialog');
    expect(pascalToKebab('AlertDialogContent')).toBe('alert-dialog-content');
    expect(pascalToKebab('DataTableFacetedFilter')).toBe('data-table-faceted-filter');
  });

  it('should handle single word', () => {
    expect(pascalToKebab('Button')).toBe('button');
    expect(pascalToKebab('Card')).toBe('card');
  });

  it('should handle consecutive uppercase letters', () => {
    expect(pascalToKebab('HTMLParser')).toBe('html-parser');
    expect(pascalToKebab('XMLHttpRequest')).toBe('xml-http-request');
  });
});

describe('transformFileName', () => {
  it('should not transform when using pascal-case naming', () => {
    expect(transformFileName('Button.vue', 'pascal-case')).toBe('Button.vue');
    expect(transformFileName('AlertDialog.vue', 'pascal-case')).toBe('AlertDialog.vue');
    expect(transformFileName('index.ts', 'pascal-case')).toBe('index.ts');
  });

  it('should transform Vue files to kebab-case', () => {
    expect(transformFileName('Button.vue', 'kebab-case')).toBe('button.vue');
    expect(transformFileName('AlertDialog.vue', 'kebab-case')).toBe('alert-dialog.vue');
    expect(transformFileName('AlertDialogContent.vue', 'kebab-case')).toBe('alert-dialog-content.vue');
  });

  it('should not transform index.ts', () => {
    expect(transformFileName('index.ts', 'kebab-case')).toBe('index.ts');
  });

  it('should transform TypeScript files', () => {
    expect(transformFileName('Button.ts', 'kebab-case')).toBe('button.ts');
    expect(transformFileName('ButtonVariants.ts', 'kebab-case')).toBe('button-variants.ts');
  });
});

describe('transformLocalVueImports', () => {
  it('should not transform when using pascal-case naming', () => {
    const content = `export { default as Button } from './Button.vue';`;
    expect(transformLocalVueImports(content, 'pascal-case')).toBe(content);
  });

  it('should transform exports in index.ts to kebab-case', () => {
    const content = `export { default as Button } from './Button.vue';`;
    expect(transformLocalVueImports(content, 'kebab-case')).toBe(
      `export { default as Button } from './button.vue';`,
    );
  });

  it('should transform multiple exports in index.ts', () => {
    const content = `export { default as AlertDialog } from './AlertDialog.vue';
export { default as AlertDialogTrigger } from './AlertDialogTrigger.vue';
export { default as AlertDialogContent } from './AlertDialogContent.vue';`;

    const expected = `export { default as AlertDialog } from './alert-dialog.vue';
export { default as AlertDialogTrigger } from './alert-dialog-trigger.vue';
export { default as AlertDialogContent } from './alert-dialog-content.vue';`;

    expect(transformLocalVueImports(content, 'kebab-case')).toBe(expected);
  });

  it('should preserve export names while transforming file paths', () => {
    const content = `export { default as Button } from './Button.vue';`;
    const result = transformLocalVueImports(content, 'kebab-case');
    expect(result).toContain('as Button');
    expect(result).toContain('./button.vue');
  });

  it('should transform imports in Vue component files', () => {
    const content = `<script setup lang="ts">
import ScrollBar from './ScrollBar.vue';
import { cn } from '@ui/utils';
</script>`;

    const expected = `<script setup lang="ts">
import ScrollBar from './scroll-bar.vue';
import { cn } from '@ui/utils';
</script>`;

    expect(transformLocalVueImports(content, 'kebab-case')).toBe(expected);
  });

  it('should transform multiple imports in Vue component files', () => {
    const content = `import TableRow from './TableRow.vue';
import TableCell from './TableCell.vue';`;

    const expected = `import TableRow from './table-row.vue';
import TableCell from './table-cell.vue';`;

    expect(transformLocalVueImports(content, 'kebab-case')).toBe(expected);
  });

  it('should not transform imports from external packages', () => {
    const content = `import { AlertDialogRoot } from 'reka-ui';
import ScrollBar from './ScrollBar.vue';`;

    const result = transformLocalVueImports(content, 'kebab-case');
    expect(result).toContain(`from 'reka-ui'`);
    expect(result).toContain(`from './scroll-bar.vue'`);
  });
});
