<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  DropdownMenuSubContent,
  type DropdownMenuSubContentEmits,
  type DropdownMenuSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuSubContentProps>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuSubContent
    data-slot="dropdown-menu-sub-content"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-dropdown-menu-sub-content"
    :class="$attrs.class"
  >
    <slot />
  </DropdownMenuSubContent>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-dropdown-menu-sub-content {
    z-index: 50;
    overflow: hidden;
    min-width: calc(var(--spacing) * 32);
    padding: calc(var(--spacing) * 1);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    backdrop-filter: blur(var(--backdrop-filter-blur));
    background-color: var(--popover);
    box-shadow: var(--shadow-md);
    color: var(--popover-foreground);
    transform-origin: var(--reka-dropdown-menu-content-transform-origin);
  }

  .sigma-ui-dropdown-menu-sub-content[data-state="open"] {
    animation: sigma-ui-fade-in-scale 200ms ease-out;
  }

  .sigma-ui-dropdown-menu-sub-content[data-state="closed"] {
    animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
  }
}
</style>
