<script setup lang="ts">
import { CurveType } from '@unovis/ts';
import { AreaChart } from '@ui/registry/css/ui/chart-area';

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Jul', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Aug', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Sep', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Oct', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Nov', total: Math.floor(Math.random() * 2000) + 1000 },
  { name: 'Dec', total: Math.floor(Math.random() * 2000) + 1000 },
];
</script>

<template>
  <AreaChart
    class="example-sigma-ui-area-chart-sparkline"
    index="name"
    :data="data"
    :categories="['total']"
    :show-grid-line="false"
    :show-legend="false"
    :show-x-axis="false"
    :show-y-axis="false"
    :curve-type="CurveType.Linear"
  />
</template>

<style>
.example-sigma-ui-area-chart-sparkline {
  width: 400px;
  height: 100px;
}
</style>
