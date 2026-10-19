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
  <tbody
    data-slot="table-body"
    v-bind="delegatedAttrs()"
    :class="cn('[&_tr:last-child]:border-0', $attrs.class ?? '')"
  >
    <slot />
  </tbody>
</template>
