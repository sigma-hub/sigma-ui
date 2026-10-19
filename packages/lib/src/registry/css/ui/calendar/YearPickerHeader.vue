<script lang="ts" setup>
import { useAttrs } from 'vue';

import { YearPickerHeader, type YearPickerHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<YearPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeader
    data-slot="year-picker-header"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-year-picker-header"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerHeader>
</template>

<style>
@layer components {
  .sigma-ui-year-picker-header {
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
