<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="month-picker-header"
    class="sigma-ui-month-picker-header"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerHeader>
</template>

<style>

.sigma-ui-month-picker-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

</style>
