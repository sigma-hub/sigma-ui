<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { Loader2Icon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { type ButtonVariants, buttonVariants } from '.';

interface Props extends PrimitiveProps {
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Height and padding preset; icon makes a square button. */
  size?: ButtonVariants['size'];
  /** Shows a spinner and disables the button. */
  isLoading?: boolean;
  /** Text that replaces the button content while loading; the content stays visible when empty. */
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isLoading: false,
  loadingText: '',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    :disabled="isLoading || $attrs.disabled"
  >
    <Loader2Icon
      v-if="isLoading"
      class="w-4 h-4 mr-2 animate-spin"
    />
    <template v-if="!isLoading || (isLoading && !loadingText)">
      <slot />
    </template>
    <template v-else>
      {{ loadingText }}
    </template>
  </Primitive>
</template>
