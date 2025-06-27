<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';

defineProps<{
  title?: string;
  data: {
    name: string;
    color: string;
    value: any;
  }[];
}>();
</script>

<template>
  <Card class="sigma-ui-chart-tooltip">
    <CardHeader
      v-if="title"
      class="sigma-ui-chart-tooltip__header"
    >
      <CardTitle>
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent class="sigma-ui-chart-tooltip__content">
      <div
        v-for="(item, key) in data"
        :key="key"
        class="sigma-ui-chart-tooltip__item"
      >
        <div class="sigma-ui-chart-tooltip__item-label">
          <span class="sigma-ui-chart-tooltip__item-dot">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 30 30"
            >
              <path
                d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"
                :stroke="item.color"
                :fill="item.color"
                stroke-width="1"
              />
            </svg>
          </span>
          <span>{{ item.name }}</span>
        </div>
        <span class="sigma-ui-chart-tooltip__item-value">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<style>
.sigma-ui-chart-tooltip {
  font-size: 0.875rem;
}

.sigma-ui-chart-tooltip__header {
  padding: 0.75rem;
  border-bottom: 1px solid hsl(var(--border));
}

.sigma-ui-chart-tooltip__content {
  padding: 0.75rem;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sigma-ui-chart-tooltip__item {
  display: flex;
  justify-content: space-between;
}

.sigma-ui-chart-tooltip__item-label {
  display: flex;
  align-items: center;
}

.sigma-ui-chart-tooltip__item-dot {
  width: 0.625rem;
  height: 0.625rem;
  margin-right: 0.5rem;
}

.sigma-ui-chart-tooltip__item-value {
  font-weight: 600;
  margin-left: 1rem;
}
</style>
