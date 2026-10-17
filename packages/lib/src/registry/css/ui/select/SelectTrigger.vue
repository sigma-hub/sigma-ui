<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ChevronDownIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface SelectTriggerExtraProps extends SelectTriggerProps {
  /**
   * Height of the trigger. `sm` matches the small button.
   */
  size?: 'sm' | 'default';
}

const props = withDefaults(defineProps<SelectTriggerExtraProps>(), {
  size: 'default',
});

const forwardedProps = useForwardProps(reactiveOmit(props, 'size'));
</script>

<template>
  <SelectTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    data-slot="select-trigger"
    :data-size="props.size"
    class="sigma-ui-select-trigger"
    :class="[$attrs.class]"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon class="sigma-ui-select-trigger__icon" />
    </SelectIcon>
  </SelectTrigger>
</template>

<style>
.sigma-ui-select-trigger {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 0.875rem;
  gap: 0.5rem;
  line-height: 1.25rem;
  outline: none;
  white-space: nowrap;
}

.sigma-ui-select-trigger[data-size="default"] {
  height: 2.25rem;
}

.sigma-ui-select-trigger[data-size="sm"] {
  height: 2rem;
}

.sigma-ui-select-trigger[data-placeholder] {
  color: var(--muted-foreground);
}

.sigma-ui-select-trigger:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-select-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-select-trigger[aria-invalid="true"] {
  border-color: var(--destructive);
}

.sigma-ui-select-trigger [data-slot="select-value"] {
  display: -webkit-box;
  overflow: hidden;
  align-items: center;
  -webkit-box-orient: vertical;
  gap: 0.5rem;
  -webkit-line-clamp: 1;
}

.sigma-ui-select-trigger svg {
  flex-shrink: 0;
  pointer-events: none;
}

.sigma-ui-select-trigger__icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
}
</style>
