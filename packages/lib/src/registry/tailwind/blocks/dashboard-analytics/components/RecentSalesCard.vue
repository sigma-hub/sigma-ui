<script setup lang="ts">
import { Avatar } from '@ui/registry/tailwind/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import type { SaleRow } from '../data';

defineProps<{
  title: string;
  sales: SaleRow[];
}>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-8">
      <div
        v-for="sale in sales"
        :key="sale.id"
        class="flex items-center gap-4"
      >
        <Avatar
          size="sm"
          class="hidden h-9 w-9 sm:flex"
        />
        <div class="grid gap-1">
          <p class="text-sm font-medium leading-none">
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
