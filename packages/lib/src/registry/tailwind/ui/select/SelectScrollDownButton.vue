<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
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
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex cursor-default items-center justify-center py-1', $attrs.class ?? '')"
    data-slot="select-scroll-down-button"
  >
    <slot>
      <ChevronDownIcon class="h-4 w-4" />
    </slot>
  </SelectScrollDownButton>
</template>
