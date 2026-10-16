<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
  type ContextMenuRadioItemEmits,
  type ContextMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ContextMenuRadioItemProps>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRadioItem
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-context-menu-radio-item"
    data-slot="context-menu-radio-item"
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
  padding: 0.375rem 0.5rem 0.375rem 2rem;
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
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
}

.sigma-ui-context-menu-radio-item__icon {
  width: 0.5rem;
  height: 0.5rem;
  fill: currentcolor;
}
</style>
