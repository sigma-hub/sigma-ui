<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <tbody
    v-bind="delegatedAttrs"
    :class="cn('[&_tr:last-child]:border-0', $attrs.class ?? '')"
    data-slot="table-body"
  >
    <slot />
  </tbody>
</template>
