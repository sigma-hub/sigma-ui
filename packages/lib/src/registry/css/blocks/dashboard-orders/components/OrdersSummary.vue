<script setup lang="ts">
import { Button } from '@ui/registry/css/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/registry/css/ui/card';
import { Progress } from '@ui/registry/css/ui/progress';
import type { OrdersIntro, StatCard } from '../data';

defineProps<{
  intro: OrdersIntro;
  statCards: StatCard[];
}>();

function statValueClass(valueSize: StatCard['valueSize']) {
  if (valueSize === 'large') {
    return 'dashboard-orders__stat-value--large';
  }

  return 'dashboard-orders__stat-value--default';
}
</script>

<template>
  <div class="dashboard-orders__stats">
    <Card class="dashboard-orders__intro-card">
      <CardHeader class="dashboard-orders__intro-header">
        <CardTitle>{{ intro.title }}</CardTitle>
        <CardDescription class="dashboard-orders__intro-description">
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
      <CardHeader class="dashboard-orders__stat-header">
        <CardDescription>{{ stat.description }}</CardDescription>
        <CardTitle :class="statValueClass(stat.valueSize)">
          {{ stat.value }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="dashboard-orders__stat-change">
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

<style>
@layer base, components;

@layer components {
  .dashboard-orders__stats {
    display: grid;
    gap: calc(var(--spacing) * 4);
  }

  @media (width >= 40rem) {
    .dashboard-orders__stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dashboard-orders__intro-card {
      grid-column: span 2 / span 2;
    }
  }

  @media (width >= 48rem) {
    .dashboard-orders__stats {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  @media (width >= 64rem) {
    .dashboard-orders__stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (width >= 80rem) {
    .dashboard-orders__stats {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .dashboard-orders .dashboard-orders__intro-header {
    padding-bottom: calc(var(--spacing) * 3);
  }

  .dashboard-orders .dashboard-orders__intro-description {
    max-width: 32rem;
    line-height: 1.625;
    text-wrap: balance;
  }

  .dashboard-orders .dashboard-orders__stat-header {
    padding-bottom: calc(var(--spacing) * 2);
  }

  .dashboard-orders .dashboard-orders__stat-value--large {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .dashboard-orders .dashboard-orders__stat-value--default {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  .dashboard-orders__stat-change {
    color: var(--muted-foreground);
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
