<script lang="ts" setup>
import { MoreHorizontalIcon } from 'lucide-vue-next';

</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    class="sigma-ui-breadcrumb__ellipsis"
    :class="$attrs.class"
  >
    <slot>
      <MoreHorizontalIcon class="sigma-ui-breadcrumb__ellipsis-icon" />
    </slot>
  </span>
</template>

<style>
.sigma-ui-breadcrumb__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigma-ui-breadcrumb__ellipsis-icon {
  width: 1rem;
  height: 1rem;
}
</style>
