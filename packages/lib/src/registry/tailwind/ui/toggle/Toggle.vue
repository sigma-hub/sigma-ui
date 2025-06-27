<script setup lang="ts">
import { computed } from 'vue';
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui';
import { type ToggleVariants, toggleVariants } from '.';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<ToggleProps & {
  variant?: ToggleVariants['variant'];
  size?: ToggleVariants['size'];
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
});

const emits = defineEmits<ToggleEmits>();

const delegatedProps = computed(() => ({ ...props, size: undefined, variant: undefined }));

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size }), $attrs.class ?? '')"
  >
    <slot />
  </Toggle>
</template>
