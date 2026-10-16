<script lang="ts" setup>
import type { DrawerTitleProps } from 'reka-ui';
import { DrawerTitle } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DrawerTitleProps>();
</script>

<template>
  <DrawerTitle
    v-bind="props"
    data-slot="drawer-title"
    :class="cn('text-lg font-semibold leading-none tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </DrawerTitle>
</template>
