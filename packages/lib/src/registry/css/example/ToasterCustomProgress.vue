<script setup lang="ts">
import { markRaw, ref, onUnmounted, type Ref } from 'vue';
import { toast, CustomProgress } from '@ui/registry/css/ui/toaster';
import { Button } from '@ui/registry/css/ui/button';
import type { ToastItem } from '@ui/registry/css/ui/toaster/CustomProgress.vue';

const toasts = ref<Ref<ToastItem['data']>[]>([]);

const onClick = () => {
  const toastData = ref<ToastItem['data']>({
    id: '',
    title: 'Downloading...',
    description: 'This is a description',
    progress: 0,
    timer: 0,
    actionText: 'Cancel',
    cleanup: () => {},
  });

  toastData.value.id = toast.custom(markRaw(CustomProgress), {
    componentProps: {
      data: toastData.value,
      onAction: () => {
        toast.dismiss(toastData.value.id);
      },
    },
    duration: Infinity,
  });

  toastData.value.timer = setInterval(() => {
    toastData.value.progress += 1;

    if (toastData.value.progress >= 100) {
      clearInterval(toastData.value.timer);
      toastData.value.title = 'Download finished';
      toastData.value.actionText = 'Open file';
    }
  }, 50);

  toastData.value.cleanup = () => {
    clearInterval(toastData.value.timer);
  };

  toasts.value.push(toastData);
};

onUnmounted(() => {
  toasts.value.forEach(toast => toast.value.cleanup());
});
</script>

<template>
  <Button
    variant="outline"
    @click="onClick"
  >
    Progress toast
  </Button>
</template>
