<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { YearPickerHeader, type YearPickerHeaderProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<YearPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeader
    v-bind="{ ...forwarded, ...delegatedAttrs }"

    data-slot="year-picker-header"
    class="sigma-ui-year-picker-header"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerHeader>
</template>

<style>

.sigma-ui-year-picker-header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

</style>
