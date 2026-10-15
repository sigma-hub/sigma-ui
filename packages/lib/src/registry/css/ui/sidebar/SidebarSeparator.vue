<script setup lang="ts">
import { Separator } from '@ui/registry/css/ui/separator';
</script>

<template>
  <Separator
    data-slot="sidebar-separator"
    data-sidebar="separator"
    class="sigma-ui-sidebar-separator"
  />
</template>

<style>
.sigma-ui-separator.sigma-ui-sidebar-separator {
  width: auto;
  margin: 0 0.5rem;
  background-color: var(--border);
}
</style>
