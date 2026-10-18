<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
  type ContextMenuRadioItemEmits,
  type ContextMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuRadioItemProps>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRadioItem
    data-slot="context-menu-radio-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-context-menu-radio-item"
    :class="[$attrs.class]"
  >
    <span class="sigma-ui-context-menu-radio-item__indicator">
      <ContextMenuItemIndicator>
        <CircleIcon class="sigma-ui-context-menu-radio-item__icon" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>

<style>
.sigma-ui-context-menu-radio-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2) calc(var(--spacing) * 1.5) calc(var(--spacing) * 8);
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
}

.sigma-ui-context-menu-radio-item:focus {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-context-menu-radio-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-context-menu-radio-item__indicator {
  position: absolute;
  left: calc(var(--spacing) * 2);
  display: flex;
  width: calc(var(--spacing) * 3.5);
  height: calc(var(--spacing) * 3.5);
  align-items: center;
  justify-content: center;
}

.sigma-ui-context-menu-radio-item__icon {
  width: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 2);
  fill: currentcolor;
}
</style>
