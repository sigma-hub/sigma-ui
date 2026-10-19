<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <div
    data-slot="dialog-footer"
    v-bind="delegatedAttrs()"
    :class="
      cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </div>
</template>
