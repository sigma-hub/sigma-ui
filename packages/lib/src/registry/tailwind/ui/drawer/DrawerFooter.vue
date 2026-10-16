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
  <div
    v-bind="delegatedAttrs"
    :class="cn('mt-auto flex flex-col gap-2 p-4', $attrs.class ?? '')"
    data-slot="drawer-footer"
  >
    <slot />
  </div>
</template>
