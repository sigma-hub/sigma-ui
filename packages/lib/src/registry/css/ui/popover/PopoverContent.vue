<script setup lang="ts">
import { useAttrs } from 'vue';

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

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
      data-slot="popover-content"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
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
  width: calc(var(--spacing) * 72);
  padding: calc(var(--spacing) * 4);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: var(--popover);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);
  color: var(--popover-foreground);
  outline: none;
  transform-origin: var(--reka-popover-content-transform-origin);
}

.sigma-ui-popover-content[data-state="open"][data-side="bottom"] {
  animation: sigma-ui-popover-slide-from-top 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="top"] {
  animation: sigma-ui-popover-slide-from-bottom 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="left"] {
  animation: sigma-ui-popover-slide-from-right 150ms ease-out;
}

.sigma-ui-popover-content[data-state="open"][data-side="right"] {
  animation: sigma-ui-popover-slide-from-left 150ms ease-out;
}

.sigma-ui-popover-content[data-state="closed"] {
  animation: sigma-ui-popover-out 150ms ease-in;
}

@keyframes sigma-ui-popover-out {
  from {
    filter: blur(0);
    opacity: 1;
    transform: scaleY(1);
  }

  to {
    filter: blur(4px);
    opacity: 0;
    transform: scaleY(0.98);
  }
}

@keyframes sigma-ui-popover-slide-from-top {
  from {
    filter: blur(4px);
    transform: translateY(-1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }
}

@keyframes sigma-ui-popover-slide-from-bottom {
  from {
    filter: blur(4px);
    transform: translateY(1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }
}

@keyframes sigma-ui-popover-slide-from-left {
  from {
    filter: blur(4px);
    transform: translateX(-1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }
}

@keyframes sigma-ui-popover-slide-from-right {
  from {
    filter: blur(4px);
    transform: translateX(1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }
}
</style>
