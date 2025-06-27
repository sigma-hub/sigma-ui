<script setup lang="ts">
import { SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps } from 'reka-ui';
import { ChevronUpIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<SelectScrollUpButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', $attrs.class ?? '')"
  >
    <slot>
      <ChevronUpIcon class="h-4 w-4" />
    </slot>
  </SelectScrollUpButton>
</template>
