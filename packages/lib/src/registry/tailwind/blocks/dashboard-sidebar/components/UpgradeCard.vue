<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';

withDefaults(defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  compact?: boolean;
}>(), {
  compact: false,
});
</script>

<template>
  <Card>
    <CardHeader :class="compact ? 'p-2 pt-0 md:p-4' : undefined">
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent :class="compact ? 'p-2 pt-0 md:p-4 md:pt-0' : undefined">
      <Button
        size="sm"
        class="w-full"
      >
        {{ actionLabel }}
      </Button>
    </CardContent>
  </Card>
</template>
