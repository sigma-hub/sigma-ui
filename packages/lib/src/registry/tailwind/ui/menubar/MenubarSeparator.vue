<script setup lang="ts">
import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MenubarSeparatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSeparator
    :class=" cn('-mx-1 my-1 h-px bg-muted', $attrs.class ?? '')"
    v-bind="forwardedProps"
  />
</template>
