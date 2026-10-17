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
  <thead
    v-bind="delegatedAttrs()"
    :class="cn('[&_tr]:border-b', $attrs.class ?? '')"
    data-slot="table-header"
  >
    <slot />
  </thead>
</template>
