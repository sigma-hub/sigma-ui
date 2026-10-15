<script setup lang="ts">
import {
  ContextMenuSubContent,
  type ContextMenuSubContentEmits,
  type ContextMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ContextMenuSubContentProps>();
const emits = defineEmits<ContextMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuSubContent
    v-bind="{ ...forwarded, ...$attrs }"
    class="sigma-ui-context-menu-sub-content"
    :class="$attrs.class"
   data-slot="context-menu-sub-content">
    <slot />
  </ContextMenuSubContent>
</template>

<style>
.sigma-ui-context-menu-sub-content {
  z-index: 50;
  overflow: hidden;
  min-width: 8rem;
  padding: 0.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: var(--popover);
  box-shadow: var(--shadow-md);
  color: var(--popover-foreground);
  transform-origin: var(--reka-context-menu-content-transform-origin);
}

.sigma-ui-context-menu-sub-content[data-state="open"] {
  animation: sigma-ui-fade-in-scale 200ms ease-out;
}

.sigma-ui-context-menu-sub-content[data-state="closed"] {
  animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
}
</style>
