<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { provide } from 'vue';
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import type { toggleVariants } from '@ui/registry/tailwind/ui/toggle';
import { cn } from '@ui/utils';

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<ToggleGroupRootProps & {
  variant?: ToggleGroupVariants['variant'];
  size?: ToggleGroupVariants['size'];
}>();
const emits = defineEmits<ToggleGroupRootEmits>();

provide('toggleGroup', {
  variant: props.variant,
  size: props.size,
});

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ToggleGroupRoot
    v-bind="forwarded"
    :class="cn('flex items-center justify-center gap-1', $attrs.class ?? '')"
  >
    <slot />
  </ToggleGroupRoot>
</template>
