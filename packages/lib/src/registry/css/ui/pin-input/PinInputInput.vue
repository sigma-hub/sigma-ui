<script setup lang="ts">
import { useAttrs } from 'vue';

import { PinInputInput, type PinInputInputProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<PinInputInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PinInputInput
    data-slot="pin-input-input"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-pin-input-input"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-pin-input-input {
    position: relative;
    display: flex;
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
    align-items: center;
    justify-content: center;
    border: 1px solid var(--input);
    border-left: none;
    font-size: 0.875rem;
    text-align: center;
    transition: all 150ms;
  }

  .sigma-ui-pin-input-input:first-child {
    border-left: 1px solid var(--input);
    border-bottom-left-radius: 0.375rem;
    border-top-left-radius: 0.375rem;
  }

  .sigma-ui-pin-input-input:last-child {
    border-bottom-right-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }

  .sigma-ui-pin-input-input:focus {
    position: relative;
    z-index: 10;
    outline: 2px solid var(--ring);
    outline-offset: -1px;
  }
}
</style>
