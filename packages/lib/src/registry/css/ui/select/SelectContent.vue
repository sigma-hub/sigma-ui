<script setup lang="ts">
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,

  useForwardPropsEmits,
} from 'reka-ui';
import { SelectScrollDownButton, SelectScrollUpButton } from '.';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<SelectContentProps>(),
  {
    position: 'popper',
  },
);
const emits = defineEmits<SelectContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      class="sigma-ui-select-content"
      :class="[$attrs.class]"
    >
      <SelectScrollUpButton />
      <SelectViewport
        class="sigma-ui-select-content__viewport"
        :class="{ 'sigma-ui-select-content__viewport--popper': position === 'popper' }"
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>

<style>
.sigma-ui-select-content {
  position: relative;
  z-index: 50;
  max-height: 24rem;
  min-width: 8rem;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transform-origin: var(--reka-popover-content-transform-origin);
}

.sigma-ui-select-content[data-state="open"][data-side="bottom"] {
  animation: slideFromTop 150ms ease-out;
}

.sigma-ui-select-content[data-state="open"][data-side="top"] {
  animation: slideFromBottom 150ms ease-out;
}

.sigma-ui-select-content[data-state="open"][data-side="left"] {
  animation: slideFromRight 150ms ease-out;
}

.sigma-ui-select-content[data-state="open"][data-side="right"] {
  animation: slideFromLeft 150ms ease-out;
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
.sigma-ui-select-content__viewport {
  padding: 0.25rem;
}

.sigma-ui-select-content__viewport--popper {
  height: var(--reka-select-trigger-height);
  width: 100%;
  min-width: var(--reka-select-trigger-width);
}
</style>
