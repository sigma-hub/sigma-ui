<script setup lang="ts">
import { useAttrs } from 'vue';
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'div',
});

defineSlots<{
  /** A `CodeBlockTitle` or `CodeBlockTabsList`, then `CodeBlockActions`. */
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    :as="props.as"
    :as-child="props.asChild"
    data-slot="code-block-header"
    :class="cn(
      'flex min-h-10 min-w-0 shrink-0 items-center gap-2 border-b border-(--code-block-border) bg-(--code-block-header) py-1 pr-1.5 pl-3.5 font-[inherit] text-[0.8125rem] leading-5 text-muted-foreground has-[>[data-slot=code-block-tabs-list]]:pl-1.5',
      'in-data-[size=sm]:min-h-8 in-data-[size=sm]:py-0.5 in-data-[size=sm]:pr-1 in-data-[size=sm]:pl-2.5 in-data-[size=sm]:text-xs in-data-[size=sm]:has-[>[data-slot=code-block-tabs-list]]:pl-1',
      'in-data-[variant=destructive]:border-[color-mix(in_oklch,var(--destructive)_30%,var(--border))] in-data-[variant=destructive]:bg-[color-mix(in_oklch,var(--destructive)_8%,var(--code-block-header))] in-data-[variant=destructive]:text-(color:--code-block-destructive-foreground)',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </Primitive>
</template>
