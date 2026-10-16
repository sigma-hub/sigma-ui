<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui';
import { ChevronUpIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    class="sigma-ui-select-scroll-up"
    data-slot="select-scroll-up-button"
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
  padding: 0.25rem 0;
  cursor: default;
}

.sigma-ui-select-scroll-up__icon {
  width: 1rem;
  height: 1rem;
}
</style>
