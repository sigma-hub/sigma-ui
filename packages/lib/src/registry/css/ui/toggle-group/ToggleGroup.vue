<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { provide } from 'vue';
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import type { toggleVariants } from '@ui/registry/css/ui/toggle';

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
    class="sigma-ui-toggle-group"
  >
    <slot />
  </ToggleGroupRoot>
</template>

<style>
.sigma-ui-toggle-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
</style>
