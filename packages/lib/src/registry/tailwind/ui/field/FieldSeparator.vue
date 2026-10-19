<script setup lang="ts">
import { useAttrs } from 'vue';

import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const slots = defineSlots<{
  /**
   * Optional text shown in the middle of the line, such as "Or continue with".
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-separator"
    v-bind="delegatedAttrs()"
    :data-content="!!slots.default"
    :class="cn('relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2', $attrs.class ?? '')"
  >
    <Separator class="absolute inset-0 top-1/2" />
    <span
      v-if="slots.default"
      class="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
