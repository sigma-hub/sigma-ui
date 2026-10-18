<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarPortal,
  MenubarSubContent,
  type MenubarSubContentEmits,
  type MenubarSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarSubContentProps>();
const emits = defineEmits<MenubarSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      data-slot="menubar-sub-content"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      class="sigma-ui-menubar-subcontent"
      :class="[$attrs.class]"
    >
      <slot />
    </MenubarSubContent>
  </MenubarPortal>
</template>

<style>
.sigma-ui-menubar-subcontent {
  z-index: 50;
  overflow: hidden;
  min-width: calc(var(--spacing) * 32);
  padding: calc(var(--spacing) * 1);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: var(--popover);
  box-shadow: var(--shadow-md);
  color: var(--popover-foreground);
  transform-origin: var(--reka-menubar-content-transform-origin);
}

.sigma-ui-menubar-subcontent[data-state="open"] {
  animation: sigma-ui-fade-in-scale 200ms ease-out;
}
</style>
