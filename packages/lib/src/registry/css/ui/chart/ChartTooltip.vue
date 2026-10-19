<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@ui/registry/css/ui/card';

defineProps<{
  /** Heading shown above the values. */
  title?: string;
  /** Rows to list, each with a name, color swatch, and value. */
  data: {
    name: string;
    color: string;
    value: any;
  }[];
}>();
</script>

<template>
  <Card
    class="sigma-ui-chart-tooltip"
    data-slot="chart-tooltip"
  >
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
@layer components {
  .sigma-ui-chart-tooltip {
    font-size: 0.875rem;
  }

  .sigma-ui-chart-tooltip__header {
    padding: calc(var(--spacing) * 3);
    border-bottom: 1px solid var(--border);
  }

  .sigma-ui-chart-tooltip__content {
    display: flex;
    min-width: 180px;
    flex-direction: column;
    padding: calc(var(--spacing) * 3);
    gap: calc(var(--spacing) * 1);
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
    width: calc(var(--spacing) * 2.5);
    height: calc(var(--spacing) * 2.5);
    margin-right: calc(var(--spacing) * 2);
  }

  .sigma-ui-chart-tooltip__item-value {
    margin-left: calc(var(--spacing) * 4);
    font-weight: 600;
  }
}
</style>
