<script lang="ts" setup>
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
  <span
    v-bind="delegatedAttrs"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('font-normal text-foreground', $attrs.class ?? '')"
    data-slot="breadcrumb-page"
  >
    <slot />
  </span>
</template>
