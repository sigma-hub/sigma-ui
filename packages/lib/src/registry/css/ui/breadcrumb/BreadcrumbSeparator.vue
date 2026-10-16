<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { ChevronRightIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <li
    v-bind="delegatedAttrs"
    role="presentation"
    aria-hidden="true"
    class="sigma-ui-breadcrumb__separator"
    :class="$attrs.class"
    data-slot="breadcrumb-separator"
  >
    <slot>
      <ChevronRightIcon />
    </slot>
  </li>
</template>

<style>
.sigma-ui-breadcrumb__separator > svg {
  width: 0.875rem;
  height: 0.875rem;
}
</style>
