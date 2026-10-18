<script setup lang="ts">
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
import { Loader2Icon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
import { type ButtonVariants, buttonVariants } from '.';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

interface Props extends PrimitiveProps {
  /** Visual style of the button. */
  variant?: ButtonVariants['variant'];
  /** Height and padding preset. `icon`, `icon-xs`, `icon-sm`, and `icon-lg` make a square button. */
  size?: ButtonVariants['size'];
  /** Shows a spinner and disables the button. */
  isLoading?: boolean;
  /** Text that replaces the button content while loading; the content stays visible when empty. */
  loadingText?: string;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'default',
  size: 'default',
  isLoading: false,
  loadingText: '',
});
</script>

<template>
  <Primitive
    data-slot="button"
    v-bind="delegatedAttrs()"
    :data-variant="variant"
    :data-size="size"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    :disabled="isLoading || $attrs.disabled"
  >
    <Loader2Icon
      v-if="isLoading"
      class="size-4 animate-spin"
    />
    <template v-if="!isLoading || (isLoading && !loadingText)">
      <slot />
    </template>
    <template v-else>
      {{ loadingText }}
    </template>
  </Primitive>
</template>
