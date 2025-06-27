<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'vaul-vue';
import { DrawerDescription } from 'vaul-vue';
import { cn } from '@ui/utils';

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="props"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DrawerDescription>
</template>
