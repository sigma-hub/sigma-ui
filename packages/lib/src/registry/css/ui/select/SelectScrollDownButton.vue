<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectScrollDownButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollDownButton
    data-slot="select-scroll-down-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-select-scroll-down"
    :class="[$attrs.class]"
  >
    <slot>
      <ChevronDownIcon class="sigma-ui-select-scroll-down__icon" />
    </slot>
  </SelectScrollDownButton>
</template>

<style>
.sigma-ui-select-scroll-down {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;
  cursor: default;
}

.sigma-ui-select-scroll-down__icon {
  width: 1rem;
  height: 1rem;
}
</style>
