<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { provide, computed, useAttrs } from 'vue';
import { ToggleGroupRoot, type ToggleGroupRootEmits, type ToggleGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import type { toggleVariants } from '@ui/registry/css/ui/toggle';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<ToggleGroupRootProps & {
  /** Visual style applied to every item in the group. */
  variant?: ToggleGroupVariants['variant'];
  /** Size applied to every item in the group. */
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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-toggle-group"
    data-slot="toggle-group"
    :class="[$attrs.class]"
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
