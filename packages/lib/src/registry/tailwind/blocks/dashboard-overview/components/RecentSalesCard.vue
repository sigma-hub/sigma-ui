<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import type { SaleRow } from '../data';

defineProps<{
  title: string;
  description: string;
  sales: SaleRow[];
}>();
</script>

<template>
  <Card class="col-span-3">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-8">
      <div
        v-for="sale in sales"
        :key="sale.id"
        class="flex items-center gap-4"
      >
        <Avatar size="sm">
          <template #fallback>
            <span class="text-primary/50">{{ sale.initials }}</span>
          </template>
        </Avatar>
        <div class="grid gap-1">
          <p class="text-sm leading-none font-medium">
            {{ sale.name }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ sale.email }}
          </p>
        </div>
        <div class="ml-auto font-medium">
          {{ sale.amount }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>
