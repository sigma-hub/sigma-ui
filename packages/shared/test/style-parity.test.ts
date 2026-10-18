import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'pathe';
import { parse } from '@vue/compiler-sfc';
import { describe, expect, it } from 'vitest';

const registryRoot = resolve(__dirname, '../../lib/src/registry');

const scriptAllowlist = [
  'blocks/dashboard-orders/components/OrdersSummary.vue',
  'blocks/dashboard-products/components/AppSidebar.vue',
  'blocks/mail-inbox/components/FolderNav.vue',
  'example/CalendarForm.vue',
  'example/CalendarLocalization.vue',
  'example/CalendarWithSelect.vue',
  'example/CheckboxFormMultiple.vue',
  'example/CheckboxFormSingle.vue',
  'example/CommandForm.vue',
  'example/DataTableColumnPinning.vue',
  'example/DataTableExample.vue',
  'example/DateFieldForm.vue',
  'example/DatePickerForm.vue',
  'example/DatePickerWithIndependentMonths.vue',
  'example/InputForm.vue',
  'example/InputFormAutoAnimate.vue',
  'example/NumberFieldForm.vue',
  'example/PinInputForm.vue',
  'example/RadioGroupForm.vue',
  'example/SelectForm.vue',
  'example/SliderForm.vue',
  'example/SwitchForm.vue',
  'example/TextareaForm.vue',
  'example/TimeFieldForm.vue',
  'ui/alert-dialog/AlertDialogAction.vue',
  'ui/alert-dialog/AlertDialogCancel.vue',
  'ui/alert-dialog/AlertDialogContent.vue',
  'ui/alert-dialog/AlertDialogDescription.vue',
  'ui/alert-dialog/AlertDialogFooter.vue',
  'ui/alert-dialog/AlertDialogHeader.vue',
  'ui/alert-dialog/AlertDialogTitle.vue',
  'ui/alert/Alert.vue',
  'ui/alert/AlertDescription.vue',
  'ui/alert/AlertTitle.vue',
  'ui/breadcrumb/BreadcrumbGenerator.vue',
  'ui/card-lightbox/CardLightbox.vue',
  'ui/chart/ChartContainer.vue',
  'ui/chart/ChartLegend.vue',
  'ui/empty/EmptyMedia.vue',
  'ui/infusion/Infusion.vue',
  'ui/sidebar/Sidebar.vue',
  'ui/sidebar/SidebarTrigger.vue',
  'ui/tags-input/TagsInputInput.vue',
];

function listFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

function listRelativeFiles(style: 'css' | 'tailwind') {
  const styleRoot = join(registryRoot, style);
  return listFiles(styleRoot).map(file => relative(styleRoot, file)).sort();
}

function readScript(filePath: string) {
  const source = readFileSync(filePath, 'utf8');
  const { descriptor, errors } = parse(source, { filename: filePath });

  if (errors.length > 0) {
    throw new Error(errors.map(error => error.message).join('\n'));
  }

  return [descriptor.script?.content, descriptor.scriptSetup?.content].filter(content => content !== undefined).join('\n');
}

function normalizeScript(script: string) {
  return script
    .replaceAll('@ui/registry/css/', '@ui/registry/style/')
    .replaceAll('@ui/registry/tailwind/', '@ui/registry/style/')
    .replace(/^\s*import\s+\{\s*cn\s*\}\s+from\s+'@ui\/utils';\s*$/gm, '')
    .replace(/import\s+\{\s*cn\s*,\s*/g, 'import { ')
    .replace(/,\s*cn\s*(?=\})/g, '')
    .replace(/,\s*(?=\})/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizedScript(style: 'css' | 'tailwind', file: string) {
  return normalizeScript(readScript(join(registryRoot, style, file)));
}

describe('CSS and Tailwind registry parity', () => {
  const cssFiles = listRelativeFiles('css');
  const tailwindFiles = listRelativeFiles('tailwind');

  it('uses the same relative file set', () => {
    expect(cssFiles).toEqual(tailwindFiles);
  });

  it('keeps script blocks equal outside the class-handling allowlist', () => {
    const allowlist = new Set(scriptAllowlist);
    const mismatches = cssFiles.filter(file => file.endsWith('.vue') && !allowlist.has(file) && normalizedScript('css', file) !== normalizedScript('tailwind', file));

    expect(mismatches).toEqual([]);
  });

  it('lists only files whose scripts still differ', () => {
    const stillDifferent = scriptAllowlist.filter(file => normalizedScript('css', file) !== normalizedScript('tailwind', file));

    expect(stillDifferent).toEqual(scriptAllowlist);
  });
});
