<script setup lang="ts">
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<PinInputInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PinInputInput
    v-bind="forwardedProps"
    :class="cn('relative text-center focus:outline-hidden focus:ring-2 focus:ring-ring focus:relative focus:z-10 flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md', $attrs.class ?? '')"
  />
</template>
