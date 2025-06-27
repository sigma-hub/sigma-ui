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
  min-width: 8rem;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow: var(--shadow-md);
  transform-origin: var(--reka-menubar-content-transform-origin);
  animation: fadeOut 100ms ease-in forwards;
}

.sigma-ui-menubar-subcontent[data-state="open"] {
  animation: fadeIn 200ms ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}
</style>
