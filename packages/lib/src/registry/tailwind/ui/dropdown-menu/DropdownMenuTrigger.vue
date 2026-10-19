<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<DropdownMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuTrigger
    class="outline-hidden"
    data-slot="dropdown-menu-trigger"
    v-bind="forwardedProps"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
