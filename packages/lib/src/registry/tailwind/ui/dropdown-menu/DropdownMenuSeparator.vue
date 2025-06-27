<script setup lang="ts">
import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
  <DropdownMenuSeparator
    v-bind="props"
    :class="cn('-mx-1 my-1 h-px bg-muted', $attrs.class ?? '')"
  />
</template>
