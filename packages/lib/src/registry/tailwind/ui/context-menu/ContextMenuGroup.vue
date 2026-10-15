<script setup lang="ts">
import { ContextMenuGroup, type ContextMenuGroupProps } from 'reka-ui';

const props = defineProps<ContextMenuGroupProps>();
</script>

<template>
  <ContextMenuGroup v-bind="props"
  data-slot="context-menu-group">
    <slot />
  </ContextMenuGroup>
</template>
