<script setup lang="ts">
import { Avatar } from '@ui/registry/css/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import type { SaleRow } from '../data';

defineProps<{
  title: string;
  description: string;
  sales: SaleRow[];
}>();
</script>

<template>
  <Card class="dashboard-overview__sales">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>
        {{ description }}
      </CardDescription>
    </CardHeader>
    <CardContent class="dashboard-overview__sales-list">
      <div
        v-for="sale in sales"
        :key="sale.id"
        class="dashboard-overview__sale"
      >
        <Avatar size="sm">
          <template #fallback>
            <span class="dashboard-overview__initials">{{ sale.initials }}</span>
          </template>
        </Avatar>
        <div class="dashboard-overview__sale-identity">
          <p class="dashboard-overview__sale-name">
            {{ sale.name }}
          </p>
          <p class="dashboard-overview__sale-email">
            {{ sale.email }}
          </p>
        </div>
        <div class="dashboard-overview__sale-amount">
          {{ sale.amount }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style>
@layer base, components;

@layer components {
  .dashboard-overview__sales {
    grid-column: span 3;
  }

  .dashboard-overview__sales-list {
    display: grid;
    gap: calc(var(--spacing) * 8);
  }

  .dashboard-overview__sale {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .dashboard-overview__initials {
    color: color-mix(in srgb, var(--primary) 50%, transparent);
  }

  .dashboard-overview__sale-identity {
    display: grid;
    gap: calc(var(--spacing) * 1);
  }

  .dashboard-overview__sale-name,
  .dashboard-overview__sale-email {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .dashboard-overview__sale-name {
    font-weight: 500;
    line-height: 1;
  }

  .dashboard-overview__sale-email {
    color: var(--muted-foreground);
  }

  .dashboard-overview__sale-amount {
    margin-left: auto;
    font-weight: 500;
  }
}
</style>
