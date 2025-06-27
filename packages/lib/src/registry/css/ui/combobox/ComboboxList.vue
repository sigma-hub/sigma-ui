<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="['sigma-ui-combobox-list', $attrs.class]"
    >
      <ComboboxViewport>
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>

<style>
.sigma-ui-combobox-list {
  position: relative;
  z-index: 50;
  width: 200px;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform-origin: var(--reka-popover-content-transform-origin);
}

.sigma-ui-combobox-list[data-state="open"][data-side="bottom"] {
  animation: slideFromTop 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="bottom"] {
  animation: slideToTop 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="top"] {
  animation: slideFromBottom 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="top"] {
  animation: slideToBottom 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="left"] {
  animation: slideFromRight 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="left"] {
  animation: slideToRight 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="right"] {
  animation: slideFromLeft 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="right"] {
  animation: slideToLeft 150ms ease-in;
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

@keyframes slideToTop {
  from {
    transform: translateY(0) scaleY(1);
    filter: blur(0px);
  }
  to {
    transform: translateY(-1rem) scaleY(0.98);
    filter: blur(4px);
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

@keyframes slideToBottom {
  from {
    transform: translateY(0) scaleY(1);
    filter: blur(0px);
  }
  to {
    transform: translateY(1rem) scaleY(0.98);
    filter: blur(4px);
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

@keyframes slideToLeft {
  from {
    transform: translateX(0) scaleY(1);
    filter: blur(0px);
  }
  to {
    transform: translateX(-1rem) scaleY(0.98);
    filter: blur(4px);
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

@keyframes slideToRight {
  from {
    transform: translateX(0) scaleY(1);
    filter: blur(0px);
  }
  to {
    transform: translateX(1rem) scaleY(0.98);
    filter: blur(4px);
  }
}
</style>
