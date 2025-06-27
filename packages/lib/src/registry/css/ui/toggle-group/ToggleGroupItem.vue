<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { computed, inject } from 'vue';
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'reka-ui';
import { toggleVariants } from '@ui/registry/css/ui/toggle';

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<ToggleGroupItemProps & {
  variant?: ToggleGroupVariants['variant'];
  size?: ToggleGroupVariants['size'];
}>();

const context = inject<ToggleGroupVariants>('toggleGroup');

const delegatedProps = computed(() => ({ ...props, variant: undefined, size: undefined }));

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="[
      toggleVariants({
        variant: context?.variant || variant,
        size: context?.size || size,
      }),
    ]"
  >
    <slot />
  </ToggleGroupItem>
</template>
