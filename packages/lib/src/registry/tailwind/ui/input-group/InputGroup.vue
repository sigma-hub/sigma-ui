<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * Addons and one `InputGroupInput` or `InputGroupTextarea`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="input-group"
    v-bind="delegatedAttrs()"
    role="group"
    :class="cn(
      'group/input-group relative flex h-9 w-full min-w-0 items-center rounded-md border border-border bg-input outline-none transition-[color,box-shadow] has-[>textarea]:h-auto',
      'has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-end]]:[&>input]:pr-2',
      'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
      'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',
      'has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:outline-offset-2 has-[[data-slot=input-group-control]:focus-visible]:outline-ring',
      'has-[[data-slot][aria-invalid=true]]:border-destructive',
      'has-[[data-slot=input-group-control]:disabled]:opacity-50',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </div>
</template>
