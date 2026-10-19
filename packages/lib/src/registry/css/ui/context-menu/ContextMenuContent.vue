<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuContent,
  type ContextMenuContentEmits,
  type ContextMenuContentProps,
  ContextMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuContentProps>();
const emits = defineEmits<ContextMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuPortal>
    <ContextMenuContent
      data-slot="context-menu-content"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      class="sigma-ui-context-menu-content"
      :class="$attrs.class"
    >
      <slot />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>

<style>
@layer components {
  .sigma-ui-context-menu-content {
    z-index: 50;
    min-width: calc(var(--spacing) * 32);
    padding: calc(var(--spacing) * 1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    backdrop-filter: blur(var(--backdrop-filter-blur));
    background-color: var(--popover);
    box-shadow: var(--shadow-md);
    color: var(--popover-foreground);
    transform-origin: var(--reka-context-menu-content-transform-origin);
  }

  .sigma-ui-context-menu-content[data-state="open"] {
    animation: sigma-ui-fade-in-scale 200ms ease-out;
  }

  .sigma-ui-context-menu-content[data-state="closed"] {
    animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
  }
}
</style>
