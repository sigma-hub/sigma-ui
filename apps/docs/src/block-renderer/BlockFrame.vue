<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, onUnmounted, ref } from 'vue';
import { styleSystems, type StyleSystem } from '@sigma-ui/shared/style-systems';
import { parseBlockFrameHash } from '../../.vitepress/block-renderer/frame';
import { applyPreviewTheme, installPreviewThemeStyles } from './preview-theme';

installPreviewThemeStyles();

const params = ref(parseBlockFrameHash(window.location.hash));
const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
const LoadingBlock = defineComponent({
  setup() {
    return () => h('div', { 'class': 'block-frame-loading', 'role': 'status', 'aria-label': 'Loading block' });
  },
});

function isStyleSystem(value: string): value is StyleSystem {
  return styleSystems.some(style => style.name === value);
}

function blockComponentName(blockName: string) {
  return blockName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const blockName = computed(() => (/^[a-z0-9-]+$/.test(params.value.name) ? params.value.name : ''));
const styleSystem = computed(() => (isStyleSystem(params.value.styleSystem) ? params.value.styleSystem : undefined));

const Block = computed(() => {
  const name = blockName.value;
  const style = styleSystem.value;

  if (!name || !style) {
    return undefined;
  }

  const componentName = blockComponentName(name);

  return defineAsyncComponent({
    loader: () => import(`@ui/registry/${style}/blocks/${name}/${componentName}.vue`),
    loadingComponent: LoadingBlock,
    timeout: 5000,
  });
});

function syncPreviewTheme() {
  applyPreviewTheme(colorScheme.matches);
}

function onHashChange() {
  params.value = parseBlockFrameHash(window.location.hash);
}

syncPreviewTheme();
window.addEventListener('hashchange', onHashChange);
window.addEventListener('storage', syncPreviewTheme);
colorScheme.addEventListener('change', syncPreviewTheme);

onUnmounted(() => {
  window.removeEventListener('hashchange', onHashChange);
  window.removeEventListener('storage', syncPreviewTheme);
  colorScheme.removeEventListener('change', syncPreviewTheme);
});
</script>

<template>
  <div
    v-if="Block"
    :class="params.containerClass"
  >
    <component :is="Block" />
  </div>
</template>

<style scoped>
.block-frame-loading {
  width: 1.25rem;
  height: 1.25rem;
  margin: 1.5rem auto;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 999px;
  animation: block-frame-spin 0.7s linear infinite;
}

@keyframes block-frame-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
