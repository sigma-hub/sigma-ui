<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { ComboboxContent, ComboboxPortal, ComboboxViewport, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
});
const emits = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxPortal>
    <ComboboxContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn('z-50 w-[200px] rounded-md border bg-popover text-popover-foreground backdrop-blur-(--backdrop-filter-blur) outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', $attrs.class ?? '')"
    >
      <ComboboxViewport>
        <slot />
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxPortal>
</template>
