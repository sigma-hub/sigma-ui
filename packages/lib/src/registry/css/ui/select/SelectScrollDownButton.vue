<script setup lang="ts">
import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';

const props = defineProps<SelectScrollDownButtonProps>();

const forwardedProps = useForwardProps(props);

</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    class="sigma-ui-select-scroll-down"
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
