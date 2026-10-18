<script lang="ts" setup>
import { useAttrs } from 'vue';

import { ChevronRightIcon } from 'lucide-vue-next';
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
    data-slot="breadcrumb-separator"
    v-bind="delegatedAttrs()"
    role="presentation"
    aria-hidden="true"
    class="sigma-ui-breadcrumb__separator"
    :class="$attrs.class"
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
