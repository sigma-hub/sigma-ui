<script setup lang="ts">
import { AutocompleteItem, type ComboboxItemEmits, type ComboboxItemProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompleteItem
    data-slot="autocomplete-item"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteItem>
</template>
