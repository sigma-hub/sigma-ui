<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import type { StatCardData } from '../data';

defineProps<StatCardData>();
</script>

<template>
  <Card>
    <CardHeader class="dashboard-overview__stat-header">
      <CardTitle class="dashboard-overview__stat-title">
        {{ title }}
      </CardTitle>
      <component
        :is="icon"
        class="dashboard-overview__stat-icon"
      />
    </CardHeader>
    <CardContent>
      <div class="dashboard-overview__stat-value">
        {{ value }}
      </div>
      <p class="dashboard-overview__stat-change">
        {{ change }}
      </p>
    </CardContent>
  </Card>
</template>

<style>
.dashboard-overview__stat-header.dashboard-overview__stat-header {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  gap: 0;
}

.dashboard-overview__stat-title.dashboard-overview__stat-title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.dashboard-overview__stat-icon {
  width: 1rem;
  height: 1rem;
  color: var(--muted-foreground);
}

.dashboard-overview__stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 2rem;
}

.dashboard-overview__stat-change {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  line-height: 1rem;
}
</style>
