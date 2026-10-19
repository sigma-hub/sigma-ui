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
    data-slot="alert-description"
    v-bind="delegatedAttrs()"
    :class="cn('text-sm [&_p]:leading-relaxed', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
