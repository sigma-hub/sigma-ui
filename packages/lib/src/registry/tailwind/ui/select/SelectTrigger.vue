<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ChevronDownIcon } from '@lucide/vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface SelectTriggerExtraProps extends SelectTriggerProps {
  /**
   * Height of the trigger. `sm` matches the small button.
   */
  size?: 'sm' | 'default';
}

const props = withDefaults(defineProps<SelectTriggerExtraProps>(), {
  size: 'default',
});

const forwardedProps = useForwardProps(reactiveOmit(props, 'size'));
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :data-size="props.size"
    :class="cn(
      'flex w-full items-center justify-between gap-2 rounded-md border border-border bg-input px-3 py-2 text-sm whitespace-nowrap outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 *:data-[slot=select-value]:line-clamp-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
      $attrs.class ?? '',
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDownIcon class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
