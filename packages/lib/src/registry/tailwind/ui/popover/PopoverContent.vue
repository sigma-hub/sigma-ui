<script setup lang="ts">
import {
  PopoverContent,
  type PopoverContentEmits,
  type PopoverContentProps,
  PopoverPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<PopoverContentProps>(),
  {
    align: 'center',
    sideOffset: 4,
  },
);
const emits = defineEmits<PopoverContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          [
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
            'data-[state=closed]:animate-popover-fade-scale-blur-out',
            'data-[side=bottom]:data-[state=open]:animate-popover-slide-blur-from-top',
            'data-[side=left]:data-[state=open]:animate-popover-slide-blur-from-right',
            'data-[side=right]:data-[state=open]:animate-popover-slide-blur-from-left',
            'data-[side=top]:data-[state=open]:animate-popover-slide-blur-from-bottom',
            '[transform-origin:var(--reka-popover-content-transform-origin)]',
          ],
          $attrs.class ?? '',
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
