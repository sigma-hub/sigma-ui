<script setup lang="ts">
import {
  ContextMenuItemIndicator,
  ContextMenuRadioItem,
  type ContextMenuRadioItemEmits,
  type ContextMenuRadioItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { CircleIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<ContextMenuRadioItemProps>();
const emits = defineEmits<ContextMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRadioItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      $attrs.class ?? '',
    )"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuItemIndicator>
        <CircleIcon class="h-2 w-2 fill-current" />
      </ContextMenuItemIndicator>
    </span>
    <slot />
  </ContextMenuRadioItem>
</template>
