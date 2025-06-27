<script lang="ts" setup>
import type { DrawerTitleProps } from 'vaul-vue';
import { DrawerTitle } from 'vaul-vue';
import { cn } from '@ui/utils';

const props = defineProps<DrawerTitleProps>();
</script>

<template>
  <DrawerTitle
    v-bind="props"
    :class="cn('text-lg font-semibold leading-none tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </DrawerTitle>
</template>
