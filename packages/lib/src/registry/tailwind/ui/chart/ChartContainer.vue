<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { cn } from '@ui/utils';
import type { ChartConfig } from './interface';

const props = withDefaults(defineProps<{
  config?: ChartConfig;
  class?: HTMLAttributes['class'];
  passthrough?: boolean;
}>(), {
  config: () => ({}),
  class: '',
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

  if (props.passthrough) {
    declarations.push('display: contents');
  }

  return declarations.join('; ');
});
</script>

<template>
  <div
    data-slot="chart"
    :class="cn('flex w-full flex-col', props.class)"
    :style="style"
  >
    <slot />
  </div>
</template>
