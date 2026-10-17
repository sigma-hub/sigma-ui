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
    v-bind="delegatedAttrs()"
    :class="cn('p-6 pt-0', $attrs.class ?? '')"
    data-slot="card-content"
  >
    <slot />
  </div>
</template>
