<script setup lang="ts">
import type { ButtonVariants } from '@ui/registry/css/ui/button';
import { Button } from '@ui/registry/css/ui/button';
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
    :variant="props.variant"
    :data-size="props.size"
    v-bind="$attrs"
    :class="[inputGroupButtonVariants({ size: props.size }), $attrs.class]"
  >
    <slot />
  </Button>
</template>

<style>
.sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button {
  display: flex;
  align-items: center;
  box-shadow: none;
  font-size: 0.875rem;
  gap: 0.5rem;
}

.sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--xs {
  height: 1.5rem;
  padding: 0 0.5rem;
  border-radius: calc(var(--radius) - 5px);
  gap: 0.25rem;
}

.sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--sm {
  height: 2rem;
  padding: 0 0.625rem;
  border-radius: var(--radius-md);
  gap: 0.375rem;
}

.sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--icon-xs {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border-radius: calc(var(--radius) - 5px);
}

.sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--icon-sm {
  width: 2rem;
  height: 2rem;
  padding: 0;
}
</style>
