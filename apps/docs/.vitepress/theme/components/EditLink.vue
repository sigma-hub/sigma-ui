<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import { Button } from '@ui/registry/tailwind/ui/button';
import { SquarePenIcon } from 'lucide-vue-next';

const { theme, page } = useData();

const link = computed(() => {
  const { text = 'Edit this page', pattern = '' } = theme.value.editLink || {};
  let url: string;

  if (typeof pattern === 'function') {
    url = pattern(page.value);
  } else {
    url = pattern.replace(/:path/g, page.value.filePath);
  }

  return { url, text };
});
</script>

<template>
  <Button
    as="a"
    :href="link.url"
    target="_blank"
    variant="outline"
    class="mt-8"
  >
    <SquarePenIcon class="mr-2 h-4 w-4" />
    {{ link.text }}
  </Button>
</template>
