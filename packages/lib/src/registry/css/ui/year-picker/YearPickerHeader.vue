<script lang="ts" setup>
import { YearPickerHeader, type YearPickerHeaderProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerHeaderProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerHeader

    data-slot="year-picker-header"
    class="sigma-ui-year-picker-header"
    v-bind="forwarded"
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
