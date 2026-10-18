<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      data-slot="combobox-list"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
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
  display: flex;
  overflow: hidden;
  width: 200px;
  max-height: min(var(--reka-combobox-content-available-height, 18rem), 18rem);
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  backdrop-filter: blur(var(--backdrop-filter-blur));
  background-color: var(--popover);
  color: var(--popover-foreground);
  transform-origin: var(--reka-popover-content-transform-origin);
}

.sigma-ui-combobox-list[data-state="open"][data-side="bottom"] {
  animation: sigma-ui-combobox-slide-from-top 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="bottom"] {
  animation: sigma-ui-combobox-slide-to-top 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="top"] {
  animation: sigma-ui-combobox-slide-from-bottom 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="top"] {
  animation: sigma-ui-combobox-slide-to-bottom 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="left"] {
  animation: sigma-ui-combobox-slide-from-right 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="left"] {
  animation: sigma-ui-combobox-slide-to-right 150ms ease-in;
}

.sigma-ui-combobox-list[data-state="open"][data-side="right"] {
  animation: sigma-ui-combobox-slide-from-left 150ms ease-out;
}

.sigma-ui-combobox-list[data-state="closed"][data-side="right"] {
  animation: sigma-ui-combobox-slide-to-left 150ms ease-in;
}

@keyframes sigma-ui-combobox-slide-from-top {
  from {
    filter: blur(4px);
    transform: translateY(-1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }
}

@keyframes sigma-ui-combobox-slide-to-top {
  from {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }

  to {
    filter: blur(4px);
    transform: translateY(-1rem) scaleY(0.98);
  }
}

@keyframes sigma-ui-combobox-slide-from-bottom {
  from {
    filter: blur(4px);
    transform: translateY(1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }
}

@keyframes sigma-ui-combobox-slide-to-bottom {
  from {
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }

  to {
    filter: blur(4px);
    transform: translateY(1rem) scaleY(0.98);
  }
}

@keyframes sigma-ui-combobox-slide-from-left {
  from {
    filter: blur(4px);
    transform: translateX(-1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }
}

@keyframes sigma-ui-combobox-slide-to-left {
  from {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }

  to {
    filter: blur(4px);
    transform: translateX(-1rem) scaleY(0.98);
  }
}

@keyframes sigma-ui-combobox-slide-from-right {
  from {
    filter: blur(4px);
    transform: translateX(1rem) scaleY(0.98);
  }

  to {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }
}

@keyframes sigma-ui-combobox-slide-to-right {
  from {
    filter: blur(0);
    transform: translateX(0) scaleY(1);
  }

  to {
    filter: blur(4px);
    transform: translateX(1rem) scaleY(0.98);
  }
}
</style>
