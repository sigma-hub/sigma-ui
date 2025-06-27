<script setup lang="ts">
;
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { Loader2Icon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { type ButtonVariants, buttonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  isLoading?: boolean;
  loadingText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  isLoading: false,
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
