<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import type { StatCardData } from '../data';

defineProps<{
  cards: StatCardData[];
}>();
</script>

<template>
  <div class="dashboard-analytics__stats">
    <Card
      v-for="card in cards"
      :key="card.title"
    >
      <CardHeader class="dashboard-analytics__stat-header">
        <CardTitle class="dashboard-analytics__stat-title">
          {{ card.title }}
        </CardTitle>
        <component :is="card.icon" />
      </CardHeader>
      <CardContent>
        <div class="dashboard-analytics__stat-value">
          {{ card.value }}
        </div>
        <p class="dashboard-analytics__stat-change">
          {{ card.change }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<style>
.dashboard-analytics__stats {
  display: grid;
  gap: 1rem;
}

@media (width >= 768px) {
  .dashboard-analytics__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
  }
}

@media (width >= 1024px) {
  .dashboard-analytics__stats {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.dashboard-analytics__stats .dashboard-analytics__stat-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding-bottom: 0.5rem;
}

.dashboard-analytics__stats .dashboard-analytics__stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.25rem;
}

.dashboard-analytics__stat-header svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: hsl(var(--muted-foreground));
}

.dashboard-analytics__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
}

.dashboard-analytics__stat-change {
  font-size: 0.75rem;
  line-height: 1rem;
  color: hsl(var(--muted-foreground));
}
</style>
