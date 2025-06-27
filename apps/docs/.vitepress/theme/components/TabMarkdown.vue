<script setup lang="ts">
import { TabsContent } from '@ui/registry/tailwind/ui/tabs';

withDefaults(defineProps<{
  title?: string;
}>(), {
  title: '',
});
</script>

<template>
  <TabsContent
    :value="title"
    class="relative space-y-10"
  >
    <slot />
  </TabsContent>
</template>
