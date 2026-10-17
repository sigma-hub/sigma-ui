<script lang="ts" setup>
import { useAttrs } from 'vue';

import { ChevronRightIcon } from 'lucide-vue-next';
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
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:size-3.5', $attrs.class ?? '')"
    data-slot="breadcrumb-separator"
  >
    <slot>
      <ChevronRightIcon />
    </slot>
  </li>
</template>
