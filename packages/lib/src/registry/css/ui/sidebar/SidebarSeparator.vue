<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { Separator } from '@ui/registry/css/ui/separator';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    class="sigma-ui-sidebar-separator"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-sidebar-separator {
  width: auto;
  margin: 0 0.5rem;
  background-color: var(--border);
}
</style>
