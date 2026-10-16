<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SearchIcon } from 'lucide-vue-next';
import { ComboboxInput, type ComboboxInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div
    class="flex items-center border-b px-3"
    cmdk-input-wrapper
    data-slot="command-input"
  >
    <SearchIcon class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ComboboxInput
      v-bind="{ ...forwardedProps, ...delegatedAttrs }"
      auto-focus
      :class="cn('flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
    />
  </div>
</template>
