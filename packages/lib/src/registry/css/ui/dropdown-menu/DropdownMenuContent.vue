<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  DropdownMenuContent,
  type DropdownMenuContentEmits,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(
  defineProps<DropdownMenuContentProps>(),
  {
    sideOffset: 4,
  },
);
const emits = defineEmits<DropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="{ ...forwarded, ...delegatedAttrs }"
      class="sigma-ui-dropdown-menu-content"
      :class="$attrs.class"
      data-slot="dropdown-menu-content"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style>
.sigma-ui-dropdown-menu-content {
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
  transform-origin: var(--reka-dropdown-menu-content-transform-origin);
}

.sigma-ui-dropdown-menu-content[data-state="open"] {
  animation: sigma-ui-fade-in-scale 200ms ease-out;
}

.sigma-ui-dropdown-menu-content[data-state="closed"] {
  animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
}
</style>
