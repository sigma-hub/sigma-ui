<script setup lang="ts">
import { ContextMenuTrigger, type ContextMenuTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<ContextMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <ContextMenuTrigger
    v-bind="forwardedProps"
    data-slot="context-menu-trigger"
  >
    <slot />
  </ContextMenuTrigger>
</template>
