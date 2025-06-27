<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div
    class="flex items-center border-b px-3"
    cmdk-input-wrapper
  >
    <SearchIcon class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...$attrs }"
      auto-focus
      :class="cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
    />
  </div>
</template>
