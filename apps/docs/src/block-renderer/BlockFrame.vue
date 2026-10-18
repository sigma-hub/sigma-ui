<script setup lang="ts">
import { computed, defineAsyncComponent, defineComponent, h, onUnmounted, ref } from 'vue';
import { styleSystems, type StyleSystem } from '@sigma-ui/shared/style-systems';
import { FRAME_OVERFLOW_MESSAGE, parseBlockFrameHash, type FrameOverflowMessage } from '../../.vitepress/block-renderer/frame';
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

const exampleLoaders = import.meta.glob('../../../../packages/lib/src/registry/*/example/**/*.vue');
const demoLoaders = import.meta.glob('../examples/*/Example.vue');

const blockName = computed(() => (/^[a-z0-9-]+$/.test(params.value.name) ? params.value.name : ''));
const exampleName = computed(() => (/^[A-Za-z0-9/_-]+$/.test(params.value.name) ? params.value.name : ''));
const styleSystem = computed(() => (isStyleSystem(params.value.styleSystem) ? params.value.styleSystem : undefined));
const previewAlignClass = computed(() => {
  if (params.value.align === 'start') {
    return 'items-start justify-start';
  }

  if (params.value.align === 'end') {
    return 'items-end justify-end';
  }

  return 'items-center justify-center';
});

function loadDemo(name: string) {
  const suffix = `/examples/${name}/Example.vue`;
  const modulePath = Object.keys(demoLoaders).find(candidate => candidate.endsWith(suffix));

  if (!modulePath) {
    return Promise.reject(new Error(`Missing demo ${name}`));
  }

  return demoLoaders[modulePath]().then(module => (module as { default: object }).default);
}

function loadExample(style: string, name: string) {
  const suffix = `/registry/${style}/example/${name}.vue`;
  const modulePath = Object.keys(exampleLoaders).find(candidate => candidate.endsWith(suffix));

  if (!modulePath) {
    return Promise.reject(new Error(`Missing example ${style}/${name}`));
  }

  return exampleLoaders[modulePath]().then(module => (module as { default: object }).default);
}

const Block = computed(() => {
  if (params.value.kind === 'demo') {
    const name = blockName.value;

    if (!name) {
      return undefined;
    }

    return defineAsyncComponent({
      loader: () => loadDemo(name),
      loadingComponent: LoadingBlock,
      timeout: 5000,
    });
  }

  const style = styleSystem.value;

  if (!style) {
    return undefined;
  }

  if (params.value.kind === 'example') {
    const name = exampleName.value;

    if (!name) {
      return undefined;
    }

    return defineAsyncComponent({
      loader: () => loadExample(style, name),
      loadingComponent: LoadingBlock,
      timeout: 5000,
    });
  }

  const name = blockName.value;

  if (!name) {
    return undefined;
  }

  const componentName = blockComponentName(name);

  return defineAsyncComponent({
    loader: () => import(`@ui/registry/${style}/blocks/${name}/${componentName}.vue`),
    loadingComponent: LoadingBlock,
    timeout: 5000,
  });
});

const COLLISION_EDGE = 16;
const EDGE_GAP = 8;
const MAX_SCROLLING_CONTENT_HEIGHT = 384;
const FLOATING_CONTENT_SELECTOR = '[data-reka-popper-content-wrapper] > *, [data-slot="navigation-menu-viewport"]';

function isScrollable(element: Element) {
  const overflowY = getComputedStyle(element).overflowY;

  return overflowY === 'auto' || overflowY === 'scroll';
}

function measureFloatingContent() {
  let open = false;
  let requiredHeight = 0;

  for (const content of document.querySelectorAll(FLOATING_CONTENT_SELECTOR)) {
    const rect = content.getBoundingClientRect();

    if (!rect.height) {
      continue;
    }

    open = true;

    let hiddenHeight = 0;

    if (rect.bottom >= window.innerHeight - COLLISION_EDGE) {
      for (const element of [content, ...content.querySelectorAll('*')]) {
        if (isScrollable(element)) {
          hiddenHeight = Math.max(hiddenHeight, element.scrollHeight - element.clientHeight);
        }
      }

      hiddenHeight = Math.max(0, Math.min(hiddenHeight, MAX_SCROLLING_CONTENT_HEIGHT - rect.height));
    }

    requiredHeight = Math.max(requiredHeight, rect.bottom + hiddenHeight + EDGE_GAP);

    if (rect.top < EDGE_GAP) {
      requiredHeight = Math.max(requiredHeight, window.innerHeight + rect.height + EDGE_GAP);
    }
  }

  return { open, requiredHeight };
}

let overflowFrame = 0;
let isFloatingContentOpen = false;
const exampleHeight = ref(window.innerHeight);
const exampleStyle = computed(() => (
  params.value.kind === 'example' ? { height: `${exampleHeight.value}px`, minHeight: '0' } : undefined
));

function onFrameResize() {
  if (isFloatingContentOpen) {
    reportFloatingOverflow();
  } else {
    exampleHeight.value = window.innerHeight;
  }
}

function reportFloatingOverflow() {
  if (params.value.kind !== 'example' || window.parent === window) {
    return;
  }

  cancelAnimationFrame(overflowFrame);
  overflowFrame = requestAnimationFrame(() => {
    const message: FrameOverflowMessage = { type: FRAME_OVERFLOW_MESSAGE, ...measureFloatingContent() };
    isFloatingContentOpen = message.open;
    window.parent.postMessage(message, window.location.origin);
  });
}

const floatingObserver = new MutationObserver(reportFloatingOverflow);
document.addEventListener('animationend', reportFloatingOverflow, true);
window.addEventListener('resize', onFrameResize);
document.addEventListener('transitionend', reportFloatingOverflow, true);
floatingObserver.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['data-state', 'data-side', 'style'],
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
  floatingObserver.disconnect();
  document.removeEventListener('animationend', reportFloatingOverflow, true);
  window.removeEventListener('resize', onFrameResize);
  document.removeEventListener('transitionend', reportFloatingOverflow, true);
  cancelAnimationFrame(overflowFrame);
  window.removeEventListener('hashchange', onHashChange);
  window.removeEventListener('storage', syncPreviewTheme);
  colorScheme.removeEventListener('change', syncPreviewTheme);
});
</script>

<template>
  <div
    v-if="Block"
    :class="params.kind === 'example' ? ['flex h-full min-h-full w-full p-6', previewAlignClass] : params.kind === 'demo' ? 'min-h-full w-full' : params.containerClass"
    :style="exampleStyle"
  >
    <component
      :is="Block"
      :class="params.kind === 'example' ? params.className : undefined"
    />
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
