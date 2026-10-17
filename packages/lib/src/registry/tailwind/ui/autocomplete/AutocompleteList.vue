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
});
const emits = defineEmits<ComboboxContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompletePortal>
    <AutocompleteContent
      data-slot="autocomplete-list"
      v-bind="{ ...forwarded, ...delegatedAttrs() }"
      :class="cn('z-50 w-64 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', $attrs.class ?? '')"
    >
      <AutocompleteViewport>
        <slot />
      </AutocompleteViewport>
    </AutocompleteContent>
  </AutocompletePortal>
</template>
