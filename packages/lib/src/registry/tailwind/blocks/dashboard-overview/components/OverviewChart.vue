<script setup lang="ts">
import { BarChart } from '@ui/registry/tailwind/ui/chart-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/tailwind/ui/card';
import type { OverviewPoint } from '../data';

defineProps<{
  title: string;
  data: OverviewPoint[];
}>();
</script>

<template>
  <Card class="col-span-4">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="pl-2">
      <BarChart
        :data="data"
        :categories="['total']"
        index="name"
        :rounded-corners="4"
      />
    </CardContent>
  </Card>
</template>
