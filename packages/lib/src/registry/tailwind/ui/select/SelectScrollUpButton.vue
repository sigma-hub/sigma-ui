<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui';
import { ChevronUpIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    data-slot="select-scroll-up-button"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex cursor-default items-center justify-center py-1', $attrs.class ?? '')"
  >
    <slot>
      <ChevronUpIcon class="h-4 w-4" />
    </slot>
  </SelectScrollUpButton>
</template>
