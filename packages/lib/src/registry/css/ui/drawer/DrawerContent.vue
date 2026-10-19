<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerContentEmits, DrawerContentProps } from 'reka-ui';
import { DrawerContent, DrawerHandle, DrawerPortal, useForwardPropsEmits } from 'reka-ui';
import DrawerOverlay from './DrawerOverlay.vue';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerContentProps>();
const emits = defineEmits<DrawerContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      data-slot="drawer-content"
      class="sigma-ui-drawer-content"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      :class="[$attrs.class]"
    >
      <DrawerHandle class="sigma-ui-drawer-content__handle" />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-drawer-content {
    position: fixed;
    z-index: 50;
    display: flex;
    height: auto;
    flex-direction: column;
    border: 1px solid var(--border);
    background-color: var(--background);
    transform: translate3d(var(--drawer-swipe-movement-x, 0), var(--drawer-swipe-movement-y, 0), 0);
    transition: transform 500ms cubic-bezier(0.32, 0.72, 0, 1);
    will-change: transform;
  }

  .sigma-ui-drawer-content[data-swiping] {
    transition-duration: 0ms;
    user-select: none;
  }

  .sigma-ui-drawer-content[data-swipe-direction="down"] {
    bottom: 0;
    max-height: 80vh;
    margin-top: calc(var(--spacing) * 24);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    inset-inline: 0;
  }

  .sigma-ui-drawer-content[data-swipe-direction="up"] {
    top: 0;
    max-height: 80vh;
    margin-bottom: calc(var(--spacing) * 24);
    border-bottom-left-radius: var(--radius-lg);
    border-bottom-right-radius: var(--radius-lg);
    inset-inline: 0;
  }

  .sigma-ui-drawer-content[data-swipe-direction="left"],
  .sigma-ui-drawer-content[data-swipe-direction="right"] {
    width: 75%;
    max-width: 24rem;
    inset-block: 0;
  }

  .sigma-ui-drawer-content[data-swipe-direction="left"] {
    left: 0;
  }

  .sigma-ui-drawer-content[data-swipe-direction="right"] {
    right: 0;
  }

  .sigma-ui-drawer-content[data-swipe-direction="down"][data-state="open"] {
    animation: sigma-ui-drawer-in-bottom 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="down"][data-state="closed"] {
    animation: sigma-ui-drawer-out-bottom 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="up"][data-state="open"] {
    animation: sigma-ui-drawer-in-top 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="up"][data-state="closed"] {
    animation: sigma-ui-drawer-out-top 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="left"][data-state="open"] {
    animation: sigma-ui-drawer-in-left 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="left"][data-state="closed"] {
    animation: sigma-ui-drawer-out-left 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="right"][data-state="open"] {
    animation: sigma-ui-drawer-in-right 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content[data-swipe-direction="right"][data-state="closed"] {
    animation: sigma-ui-drawer-out-right 500ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  .sigma-ui-drawer-content__handle {
    display: none;
    width: 100px;
    height: calc(var(--spacing) * 2);
    flex-shrink: 0;
    border-radius: var(--radius-full);
    margin-top: calc(var(--spacing) * 4);
    background-color: var(--muted);
    margin-inline: auto;
  }

  .sigma-ui-drawer-content[data-swipe-direction="down"] .sigma-ui-drawer-content__handle {
    display: block;
  }

  @keyframes sigma-ui-drawer-in-bottom {
    from {
      translate: 0 100%;
    }
  }

  @keyframes sigma-ui-drawer-out-bottom {
    to {
      translate: 0 100%;
    }
  }

  @keyframes sigma-ui-drawer-in-top {
    from {
      translate: 0 -100%;
    }
  }

  @keyframes sigma-ui-drawer-out-top {
    to {
      translate: 0 -100%;
    }
  }

  @keyframes sigma-ui-drawer-in-left {
    from {
      translate: -100% 0;
    }
  }

  @keyframes sigma-ui-drawer-out-left {
    to {
      translate: -100% 0;
    }
  }

  @keyframes sigma-ui-drawer-in-right {
    from {
      translate: 100% 0;
    }
  }

  @keyframes sigma-ui-drawer-out-right {
    to {
      translate: 100% 0;
    }
  }
}
</style>
