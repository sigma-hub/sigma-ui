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
  animation: fadeOut 100ms ease-in forwards;
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: hsl(var(--popover));
  box-shadow: var(--shadow-md);
  color: hsl(var(--popover-foreground));
  transform-origin: var(--reka-menubar-content-transform-origin);
}

.sigma-ui-menubar-subcontent[data-state="open"] {
  animation: fade-in 200ms ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
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
