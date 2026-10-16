<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui';
import { ChevronUpIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('flex cursor-default items-center justify-center py-1', $attrs.class ?? '')"
    data-slot="select-scroll-up-button"
  >
    <slot>
      <ChevronUpIcon class="h-4 w-4" />
    </slot>
  </SelectScrollUpButton>
</template>
