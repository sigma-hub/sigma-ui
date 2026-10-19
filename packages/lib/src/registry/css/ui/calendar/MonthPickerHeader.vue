<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader
    data-slot="month-picker-header"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-month-picker-header"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerHeader>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-month-picker-header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
