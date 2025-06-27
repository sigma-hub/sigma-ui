<script lang="ts" setup>
import { ChevronRightIcon } from 'lucide-vue-next';

</script>

<template>
  <li
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
