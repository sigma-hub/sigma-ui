<script setup lang="ts">
import { Card, CardContent } from '@ui/registry/css/ui/card';

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
  <Card class="example-sigma-ui-custom-chart-tooltip">
    <CardContent class="example-sigma-ui-custom-chart-tooltip__content">
      <div
        v-for="(item, key) in data"
        :key="key"
        class="example-sigma-ui-custom-chart-tooltip__item"
      >
        <div class="example-sigma-ui-custom-chart-tooltip__item-label">
          <span
            class="example-sigma-ui-custom-chart-tooltip__color-indicator"
            :style="{ background: item.color }"
          />
          <span>{{ item.name }}</span>
        </div>
        <span class="example-sigma-ui-custom-chart-tooltip__value">{{ item.value }}</span>
      </div>
    </CardContent>
  </Card>
</template>

<style>
.example-sigma-ui-custom-chart-tooltip {
  font-size: 0.875rem;
}

.example-sigma-ui-custom-chart-tooltip__content {
  display: flex;
  min-width: 180px;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.5rem;
}

.example-sigma-ui-custom-chart-tooltip__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.example-sigma-ui-custom-chart-tooltip__item-label {
  display: flex;
  align-items: center;
}

.example-sigma-ui-custom-chart-tooltip__color-indicator {
  width: 4px;
  height: 28px;
  border-radius: 9999px;
  margin-right: 1rem;
}

.example-sigma-ui-custom-chart-tooltip__value {
  margin-left: 1rem;
  font-weight: 600;
}
</style>
