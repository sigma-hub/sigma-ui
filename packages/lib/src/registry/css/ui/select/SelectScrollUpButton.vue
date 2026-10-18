<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui';
import { ChevronUpIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-select-scroll-up"
    :class="[$attrs.class]"
  >
    <slot>
      <ChevronUpIcon class="sigma-ui-select-scroll-up__icon" />
    </slot>
  </SelectScrollUpButton>
</template>

<style>
.sigma-ui-select-scroll-up {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing) * 1) 0;
  cursor: default;
}

.sigma-ui-select-scroll-up__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
}
</style>
