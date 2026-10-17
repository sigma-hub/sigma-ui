<script lang="ts" setup>
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
  <li
    v-bind="delegatedAttrs()"
    :class="cn('inline-flex items-center gap-1.5', $attrs.class ?? '')"
    data-slot="breadcrumb-item"
  >
    <slot />
  </li>
</template>
