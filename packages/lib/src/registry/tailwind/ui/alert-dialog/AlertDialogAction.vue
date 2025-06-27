<script setup lang="ts">
import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui';
import { cn } from '@ui/utils';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';

const props = defineProps<AlertDialogActionProps>();
</script>

<template>
  <AlertDialogAction
    v-bind="props"
    :class="cn(buttonVariants(), $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogAction>
</template>
