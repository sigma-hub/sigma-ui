<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<PopoverContentProps>(),
  {
    align: 'center',
    sideOffset: 4,
  },
);
const emits = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="sigma-ui-popover-content"
      :class="$attrs.class"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

<style>
.sigma-ui-popover-content {
  z-index: 50;
  width: 18rem;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  outline: none;
  transform-origin: var(--reka-popover-content-transform-origin);
}

.sigma-ui-popover-content[data-state="open"][data-side="bottom"] {
  animation: slideFromTop 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="top"] {
  animation: slideFromBottom 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="left"] {
  animation: slideFromRight 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="right"] {
  animation: slideFromLeft 150ms ease-out;
}

.sigma-ui-popover-content[data-state="closed"] {
  animation: popoverOut 150ms ease-in;
}

@keyframes popoverOut {
  from {
    opacity: 1;
    transform: scaleY(1);
    filter: blur(0px);
  }
  to {
    opacity: 0;
    transform: scaleY(0.98);
    filter: blur(4px);
  }
}

@keyframes slideFromTop {
  from {
    transform: translateY(-1rem) scaleY(0.98);
    filter: blur(4px);
  }
  to {
    transform: translateY(0) scaleY(1);
    filter: blur(0px);
  }
}

@keyframes slideFromBottom {
  from {
    transform: translateY(1rem) scaleY(0.98);
    filter: blur(4px);
  }
  to {
    transform: translateY(0) scaleY(1);
    filter: blur(0px);
  }
}

@keyframes slideFromLeft {
  from {
    transform: translateX(-1rem) scaleY(0.98);
    filter: blur(4px);
  }
  to {
    transform: translateX(0) scaleY(1);
    filter: blur(0px);
  }
}

@keyframes slideFromRight {
  from {
    transform: translateX(1rem) scaleY(0.98);
    filter: blur(4px);
  }
  to {
    transform: translateX(0) scaleY(1);
    filter: blur(0px);
  }
}
</style>
