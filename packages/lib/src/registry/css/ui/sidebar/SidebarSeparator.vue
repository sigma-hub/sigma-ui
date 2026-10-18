<script setup lang="ts">
import { useAttrs } from 'vue';

import { Separator } from '@ui/registry/css/ui/separator';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    class="sigma-ui-sidebar-separator"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-sidebar-separator {
  width: auto;
  margin: 0 calc(var(--spacing) * 2);
  background-color: var(--border);
}
</style>
