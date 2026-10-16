<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import type { StatCardData } from '../data';

defineProps<{
  cards: StatCardData[];
}>();
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <Card
      v-for="card in cards"
      :key="card.title"
    >
      <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle class="text-sm font-medium">
          {{ card.title }}
        </CardTitle>
        <component
          :is="card.icon"
          class="h-4 w-4 text-muted-foreground"
        />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ card.value }}
        </div>
        <p class="text-xs text-muted-foreground">
          {{ card.change }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
