<script setup lang="ts">
import { computed } from 'vue';
import type { ChartConfig } from './interface';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  config?: ChartConfig;
  passthrough?: boolean;
}>(), {
  config: () => ({}),
  passthrough: false,
});

const style = computed(() => {
  const declarations: string[] = [];

  Object.entries(props.config).forEach(([key, series], index) => {
    const color = series.color ?? series.theme?.light;

    if (!color) {
      return;
    }

    declarations.push(`--color-${key}: ${color}`);

    if (index < 5 && !color.startsWith('var(--chart-')) {
      declarations.push(`--chart-${index + 1}: ${color}`);
    }
  });

  return declarations.join('; ');
});
</script>

<template>
  <div
    data-slot="chart"
    class="sigma-ui-chart"
    :class="$attrs.class"
    :data-passthrough="passthrough || undefined"
    :style="style"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-chart {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .sigma-ui-chart[data-passthrough='true'] {
    display: contents;
  }
}
</style>
