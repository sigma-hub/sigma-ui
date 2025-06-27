<script setup lang="ts">
import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<SelectScrollDownButtonProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', $attrs.class ?? '')"
  >
    <slot>
      <ChevronDownIcon class="h-4 w-4" />
    </slot>
  </SelectScrollDownButton>
</template>
