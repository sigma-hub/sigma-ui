<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxRoot>
</template>
