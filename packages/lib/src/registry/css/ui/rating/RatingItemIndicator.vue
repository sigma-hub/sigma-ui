<script setup lang="ts">
import { useAttrs } from 'vue';

import { RatingItemIndicator, type RatingItemIndicatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RatingItemIndicatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <RatingItemIndicator
    data-slot="rating-item-indicator"
    class="sigma-ui-rating-indicator"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </RatingItemIndicator>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-rating-indicator {
    color: var(--muted-foreground);
  }

  .sigma-ui-rating-indicator[data-state="active"] {
    color: var(--accent);
  }

  .sigma-ui-rating-indicator[data-state="active"] svg {
    fill: var(--accent);
  }
}
</style>
