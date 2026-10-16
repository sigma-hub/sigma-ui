<script lang="ts" setup>
import { MonthPickerHeader, type MonthPickerHeaderProps, useForwardProps } from 'reka-ui';

const props = defineProps<MonthPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerHeader

    data-slot="month-picker-header"
    class="sigma-ui-month-picker-header"
    v-bind="forwarded"
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
