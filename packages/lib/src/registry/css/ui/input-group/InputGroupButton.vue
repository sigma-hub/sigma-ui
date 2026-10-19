<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ButtonVariants } from '@ui/registry/css/ui/button';
import { Button } from '@ui/registry/css/ui/button';
import { type InputGroupButtonVariants, inputGroupButtonVariants } from '.';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :class="[inputGroupButtonVariants({ size: props.size }), $attrs.class]"
  >
    <slot />
  </Button>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button {
    display: flex;
    align-items: center;
    box-shadow: none;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
  }

  .sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--xs {
    height: calc(var(--spacing) * 6);
    padding: 0 calc(var(--spacing) * 2);
    border-radius: calc(var(--radius) - 5px);
    gap: calc(var(--spacing) * 1);
  }

  .sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--sm {
    height: calc(var(--spacing) * 8);
    padding: 0 calc(var(--spacing) * 2.5);
    border-radius: var(--radius-md);
    gap: calc(var(--spacing) * 1.5);
  }

  .sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--icon-xs {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
    padding: 0;
    border-radius: calc(var(--radius) - 5px);
  }

  .sigma-ui-input-group .sigma-ui-button.sigma-ui-input-group-button--icon-sm {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    padding: 0;
  }
}
</style>
