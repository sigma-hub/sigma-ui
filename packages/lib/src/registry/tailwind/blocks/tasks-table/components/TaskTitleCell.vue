<script setup lang="ts">
import { Badge } from '@ui/registry/tailwind/ui/badge';

defineProps<{
  title: string;
  label?: string;
}>();
</script>

<template>
  <div class="flex items-center gap-2">
    <Badge
      v-if="label"
      variant="outline"
    >
      {{ label }}
    </Badge>
    <span class="max-w-[500px] truncate font-medium">{{ title }}</span>
  </div>
</template>
