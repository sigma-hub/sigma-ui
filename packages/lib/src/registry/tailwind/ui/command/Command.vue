<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', $attrs.class ?? '')"
    data-slot="command"
  >
    <slot />
  </ComboboxRoot>
</template>
