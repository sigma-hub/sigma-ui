<script lang="ts" setup>
import { Toaster, type ToasterProps } from 'vue-sonner';

const props = defineProps<ToasterProps>();
</script>

<template>
  <Toaster
    class="!z-[60] pointer-events-auto fixed flex flex-col gap-[10px] max-w-[420px]"
    v-bind="props"
    :toast-options="{
      ...props.toastOptions,
      unstyled: true,
      classes: {
        toast: 'group w-full cursor-default bg-background text-foreground rounded shadow-lg flex items-center gap-2 [&[data-type=default]]:p-3 [&[data-type=default]]:px-4 [&[data-type=default]]:border [&[data-type=default]]:border-border [&[data-type=default]_[data-content]]:flex [&[data-type=default]_[data-content]]:flex-1',
        description: 'group-[&[data-type=default]]:text-muted-foreground ',
        actionButton: 'group-[&[data-type=default]]:px-2 group-[&[data-type=default]]:py-0.5 group-[&[data-type=default]]:rounded group-[&[data-type=default]]:bg-primary group-[&[data-type=default]]:text-primary-foreground group-[&[data-type=default]]:hover:opacity-90',
        cancelButton: 'group-[&[data-type=default]]:px-2 group-[&[data-type=default]]:py-0.5 group-[&[data-type=default]]:rounded group-[&[data-type=default]]:bg-muted group-[&[data-type=default]]:text-muted-foreground group-[&[data-type=default]]:hover:opacity-90',
      },
    }"
  />
</template>
