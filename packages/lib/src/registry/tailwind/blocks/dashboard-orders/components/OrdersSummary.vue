<script setup lang="ts">
import { Button } from '@ui/registry/tailwind/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import { Progress } from '@ui/registry/tailwind/ui/progress';
import type { OrdersIntro, StatCard } from '../data';

defineProps<{
  intro: OrdersIntro;
  statCards: StatCard[];
}>();
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
    <Card class="sm:col-span-2">
      <CardHeader class="pb-3">
        <CardTitle>{{ intro.title }}</CardTitle>
        <CardDescription class="max-w-lg text-balance leading-relaxed">
          {{ intro.description }}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>{{ intro.action }}</Button>
      </CardFooter>
    </Card>
    <Card
      v-for="stat in statCards"
      :key="stat.description"
    >
      <CardHeader class="pb-2">
        <CardDescription>{{ stat.description }}</CardDescription>
        <CardTitle :class="stat.valueSize === 'large' ? 'text-4xl' : 'text-3xl'">
          {{ stat.value }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-xs text-muted-foreground">
          {{ stat.change }}
        </div>
      </CardContent>
      <CardFooter>
        <Progress
          :model-value="stat.progress"
          :aria-label="stat.progressLabel"
        />
      </CardFooter>
    </Card>
  </div>
</template>
