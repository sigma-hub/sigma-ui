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
  /** Buttons such as `CodeBlockCopyButton` and `CodeBlockWrapButton`. */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="code-block-actions"
    :class="cn(
      'ml-auto flex shrink-0 items-center gap-0.5',
      '[[data-slot=code-block]>&]:absolute [[data-slot=code-block]>&]:top-1.5 [[data-slot=code-block]>&]:right-1.5 [[data-slot=code-block]>&]:z-1 [[data-slot=code-block]>&]:opacity-0 [[data-slot=code-block]>&]:transition-opacity motion-reduce:transition-none pointer-coarse:opacity-100',
      '[[data-slot=code-block]:hover>&]:opacity-100 [[data-slot=code-block]:focus-within>&]:opacity-100 [[data-slot=code-block][data-size=sm]>&]:top-1 [[data-slot=code-block][data-size=sm]>&]:right-1',
      '[[data-slot=code-block]>&_[data-slot=button]]:border [[data-slot=code-block]>&_[data-slot=button]]:border-(--code-block-border) [[data-slot=code-block]>&_[data-slot=button]]:bg-background/85 [[data-slot=code-block]>&_[data-slot=button]]:backdrop-blur-sm',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </div>
</template>
