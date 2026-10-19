<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui';
import { AutocompleteContent, AutocompletePortal, AutocompleteViewport, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<ComboboxContentProps>(), {
  position: 'popper',
  align: 'center',
  sideOffset: 4,
  collisionPadding: 8,
});
const emits = defineEmits<ComboboxContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompletePortal>
    <AutocompleteContent
      data-slot="autocomplete-list"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      :class="cn('z-50 flex max-h-[min(var(--reka-combobox-content-available-height,18rem),18rem)] w-(--reka-combobox-trigger-width) min-w-32 origin-(--reka-combobox-content-transform-origin) flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md backdrop-blur-(--backdrop-filter-blur) outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', $attrs.class ?? '')"
    >
      <AutocompleteViewport>
        <slot />
      </AutocompleteViewport>
    </AutocompleteContent>
  </AutocompletePortal>
</template>
