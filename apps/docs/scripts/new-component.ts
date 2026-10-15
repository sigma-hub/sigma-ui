import fs from 'node:fs';
import path from 'node:path';
import { REGISTRY_ROOT, REPO_ROOT, getComponentDir, getExamplePath } from '../.vitepress/theme/plugins/registry-source';
import { REQUIRED_SECTIONS } from './page-template';

const COMPONENT_NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

function toPascalCase(name: string) {
  return name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('');
}

function toTitle(name: string) {
  const words = name.split('-');
  return [words[0][0].toUpperCase() + words[0].slice(1), ...words.slice(1)].join(' ');
}

function renderTailwindComponent(name: string) {
  return `<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-slot="${name}"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </Primitive>
</template>
`;
}

function renderCssComponent(name: string) {
  return `<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    data-slot="${name}"
    class="sigma-ui-${name}"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-${name} {
  display: flex;
}
</style>
`;
}

function renderIndex(componentName: string) {
  return `export { default as ${componentName} } from './${componentName}.vue';\n`;
}

function renderExample(style: string, name: string, componentName: string) {
  return `<script setup lang="ts">
import { ${componentName} } from '@ui/registry/${style}/ui/${name}';
</script>

<template>
  <${componentName}>${toTitle(name)}</${componentName}>
</template>
`;
}

function renderPage(name: string, componentName: string) {
  const sectionBodies: Record<string, string> = {
    'Preview': `<ComponentPreview name="${componentName}" />`,
    'Installation': `<ComponentInstall name="${name}" />`,
    'Usage': `\`\`\`vue
<script setup lang="ts">
import { ${componentName} } from '@/components/ui/${name}';
</script>

<template>
  <${componentName}>${toTitle(name)}</${componentName}>
</template>
\`\`\``,
    'Examples': `### Default

<ComponentPreview name="${componentName}" />`,
    'API Reference': `<!-- @include: @/content/meta/${name}.md -->`,
    'Accessibility': `Describe the semantics and the keyboard interactions.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the component. |`,
  };

  const sections = REQUIRED_SECTIONS.map(section => `## ${section}\n\n${sectionBodies[section]}`);

  return `---
title: ${toTitle(name)}
description: Describe the component in one sentence.
source: ${name}
---

${sections.join('\n\n')}
`;
}

function main() {
  const name = process.argv[2];

  if (!name || !COMPONENT_NAME_PATTERN.test(name)) {
    console.error('Usage: pnpm new:component <name>. The name must be kebab-case, for example "input-group".');
    process.exit(1);
  }

  const componentName = toPascalCase(name);
  const files: Record<string, string> = {
    [path.join(getComponentDir('tailwind', name), `${componentName}.vue`)]: renderTailwindComponent(name),
    [path.join(getComponentDir('tailwind', name), 'index.ts')]: renderIndex(componentName),
    [path.join(getComponentDir('css', name), `${componentName}.vue`)]: renderCssComponent(name),
    [path.join(getComponentDir('css', name), 'index.ts')]: renderIndex(componentName),
    [getExamplePath('tailwind', componentName)]: renderExample('tailwind', name, componentName),
    [getExamplePath('css', componentName)]: renderExample('css', name, componentName),
    [path.join(REPO_ROOT, 'apps/docs/src/content/components', `${name}.md`)]: renderPage(name, componentName),
  };

  const existingFiles = Object.keys(files).filter(filePath => fs.existsSync(filePath));

  if (existingFiles.length) {
    console.error(`"${name}" already exists:\n${existingFiles.map(filePath => `  ${path.relative(REPO_ROOT, filePath)}`).join('\n')}`);
    process.exit(1);
  }

  for (const [filePath, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content);
    console.log(`Created ${path.relative(REPO_ROOT, filePath)}`);
  }

  console.log(`
Next steps:
  1. Implement the component in both style systems under ${path.relative(REPO_ROOT, REGISTRY_ROOT)}/{tailwind,css}/ui/${name}.
  2. Add JSDoc to every prop, emit, and slot that the component defines itself.
  3. Fill in the docs page: apps/docs/src/content/components/${name}.md.
  4. Run \`pnpm docs:gen\`, \`pnpm docs:lint\`, and \`pnpm build:registry\`.`);
}

main();
