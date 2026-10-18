<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
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
    <CardContent class="dashboard-analytics__sales">
      <div
        v-for="sale in sales"
        :key="sale.id"
        class="dashboard-analytics__sale"
      >
        <Avatar
          size="sm"
          class="dashboard-analytics__avatar"
        />
        <div class="dashboard-analytics__sale-body">
          <p class="dashboard-analytics__sale-name">
            {{ sale.name }}
          </p>
          <p class="dashboard-analytics__sale-email">
            {{ sale.email }}
          </p>
        </div>
        <div class="dashboard-analytics__sale-amount">
          {{ sale.amount }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style>
.dashboard-analytics__sales.dashboard-analytics__sales {
  display: grid;
  gap: 2rem;
}

.dashboard-analytics__sale {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-analytics__avatar.dashboard-analytics__avatar {
  display: none;
}

.dashboard-analytics__sale-body {
  display: grid;
  gap: 0.25rem;
}

.dashboard-analytics__sale-name,
.dashboard-analytics__sale-email {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.dashboard-analytics__sale-name {
  font-weight: 500;
  line-height: 1;
}

.dashboard-analytics__sale-email {
  color: var(--muted-foreground);
}

.dashboard-analytics__sale-amount {
  margin-left: auto;
  font-weight: 500;
}

@media (width >= 40rem) {
  .dashboard-analytics__avatar.dashboard-analytics__avatar {
    display: flex;
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
