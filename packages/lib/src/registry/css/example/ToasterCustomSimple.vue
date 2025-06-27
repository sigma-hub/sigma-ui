<script setup lang="ts">
import { markRaw, ref } from 'vue';
import { toast, CustomSimple } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';

const toastId = ref<number | string>('');

const onClick = () => {
  toastId.value = toast.custom(markRaw(CustomSimple), {
    componentProps: {
      title: 'Custom Title',
      description: 'This is a custom description',
      actionText: 'Undo',
      onAction: () => {
        toast.dismiss(toastId.value);
      },
    },
    duration: 10000,
  });
};
</script>

<template>
  <Button
    variant="outline"
    @click="onClick"
  >
    Default toast
  </Button>
</template>
