<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="props"
    data-slot="drawer-description"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DrawerDescription>
</template>
