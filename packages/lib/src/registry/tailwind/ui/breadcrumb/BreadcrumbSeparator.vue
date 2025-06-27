<script lang="ts" setup>
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:size-3.5', $attrs.class ?? '')"
  >
    <slot>
      <ChevronRightIcon />
    </slot>
  </li>
</template>
