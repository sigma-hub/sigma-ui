<script setup lang="ts">
import {
  MenubarPortal,
  MenubarSubContent,
  type MenubarSubContentEmits,
  type MenubarSubContentProps,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<MenubarSubContentProps>();
const emits = defineEmits<MenubarSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      v-bind="forwarded"
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
  min-width: 8rem;
  padding: 0.25rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  animation: sigma-ui-fade-out-scale 100ms ease-in forwards;
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  transform-origin: var(--reka-menubar-content-transform-origin);
}

.sigma-ui-menubar-subcontent[data-state="open"] {
  animation: sigma-ui-fade-in-scale 200ms ease-out;
}
</style>
