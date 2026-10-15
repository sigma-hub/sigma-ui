<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { computed, inject } from 'vue';
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui';
import { toggleVariants } from '@ui/registry/tailwind/ui/toggle';
import { cn } from '@ui/utils';

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<ToggleGroupItemProps & {
  /** Visual style of the item; ignored when the parent group sets a variant. */
  variant?: ToggleGroupVariants['variant'];
  /** Size of the item; ignored when the parent group sets a size. */
  size?: ToggleGroupVariants['size'];
}>();

const context = inject<ToggleGroupVariants>('toggleGroup');

const delegatedProps = computed(() => ({ ...props, variant: undefined, size: undefined }));

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="cn(toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }), $attrs.class ?? '')"
  >
    <slot />
  </ToggleGroupItem>
</template>
