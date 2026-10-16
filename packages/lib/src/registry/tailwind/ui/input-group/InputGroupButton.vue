<script setup lang="ts">
import type { ButtonVariants } from '@ui/registry/tailwind/ui/button';
import { Button } from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';
import { type InputGroupButtonVariants, inputGroupButtonVariants } from '.';

defineOptions({
  inheritAttrs: false,
});

interface InputGroupButtonProps {
  /**
   * Visual style of the button. Defaults to `ghost` so the button sits inside the field.
   */
  variant?: ButtonVariants['variant'];
  /**
   * Size of the button inside the field.
   */
  size?: InputGroupButtonVariants['size'];
}

const props = withDefaults(defineProps<InputGroupButtonProps>(), {
  variant: 'ghost',
  size: 'xs',
});

defineSlots<{
  /**
   * Button label or icon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Button
    type="button"
    data-slot="input-group-button"
    :variant="props.variant"
    :data-size="props.size"
    v-bind="$attrs"
    :class="cn(inputGroupButtonVariants({ size: props.size }), $attrs.class ?? '')"
  >
    <slot />
  </Button>
</template>
