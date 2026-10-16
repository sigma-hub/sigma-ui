<script setup lang="ts">
import { BarChart } from '@ui/registry/css/ui/chart-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import type { OverviewPoint } from '../data';

defineProps<{
  title: string;
  data: OverviewPoint[];
}>();
</script>

<template>
  <Card class="dashboard-overview__chart">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="dashboard-overview__chart-content">
      <BarChart
        :data="data"
        :categories="['total']"
        index="name"
        :rounded-corners="4"
      />
    </CardContent>
  </Card>
</template>

<style>
.dashboard-overview__chart {
  grid-column: span 4;
}

.dashboard-overview__chart-content {
  padding-left: 0.5rem;
}
</style>
