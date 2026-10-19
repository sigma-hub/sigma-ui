<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { computed, inject, useAttrs } from 'vue';
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui';
import { toggleVariants } from '@ui/registry/css/ui/toggle';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    data-slot="toggle-group-item"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="[
      toggleVariants({
        variant: context?.variant || variant,
        size: context?.size || size,
      }),, $attrs.class]"
  >
    <slot />
  </ToggleGroupItem>
</template>
