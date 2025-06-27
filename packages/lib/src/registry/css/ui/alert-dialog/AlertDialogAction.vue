<script setup lang="ts">
import { AlertDialogAction, type AlertDialogActionProps } from 'reka-ui';
import { useAttrs } from 'vue';
import { buttonVariants } from '@ui/registry/css/ui/button';

const props = defineProps<AlertDialogActionProps>();
const attrs = useAttrs();
</script>

<template>
  <AlertDialogAction
    v-bind="props"
    class="sigma-ui-button"
    :class="[buttonVariants(), attrs.class]"
  >
    <slot />
  </AlertDialogAction>
</template>
