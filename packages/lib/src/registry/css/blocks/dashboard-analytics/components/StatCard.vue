<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import type { StatCardData } from '../data';

defineProps<StatCardData>();
</script>

<template>
  <Card>
    <CardHeader class="dashboard-analytics__stat-header">
      <CardTitle class="dashboard-analytics__stat-title">
        {{ title }}
      </CardTitle>
      <component
        :is="icon"
        class="dashboard-analytics__stat-icon"
      />
    </CardHeader>
    <CardContent>
      <div class="dashboard-analytics__stat-value">
        {{ value }}
      </div>
      <p class="dashboard-analytics__stat-change">
        {{ change }}
      </p>
    </CardContent>
  </Card>
</template>

<style>
.dashboard-analytics__stat-header.dashboard-analytics__stat-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding-bottom: 0.5rem;
}

.dashboard-analytics__stat-title.dashboard-analytics__stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: normal;
}

.dashboard-analytics__stat-icon {
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-analytics__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
}

.dashboard-analytics__stat-change {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
