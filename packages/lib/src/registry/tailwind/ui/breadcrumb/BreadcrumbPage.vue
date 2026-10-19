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
  <span
    data-slot="breadcrumb-page"
    v-bind="delegatedAttrs()"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('font-normal text-foreground', $attrs.class ?? '')"
  >
    <slot />
  </span>
</template>
