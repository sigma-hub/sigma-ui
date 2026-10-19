<script setup lang="ts">
import { AlertDialogTitle, type AlertDialogTitleProps } from 'reka-ui';
import { useAttrs } from 'vue';

const props = defineProps<AlertDialogTitleProps>();
const attrs = useAttrs();
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="props"
    class="sigma-ui-alert-dialog-title"
    :class="attrs.class"
  >
    <slot />
  </AlertDialogTitle>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-alert-dialog-title {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75rem;
  }
}
</style>
