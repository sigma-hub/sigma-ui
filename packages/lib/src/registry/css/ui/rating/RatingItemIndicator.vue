<script setup lang="ts">
import { RatingItemIndicator, type RatingItemIndicatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<RatingItemIndicatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <RatingItemIndicator
    data-slot="rating-item-indicator"
    class="sigma-ui-rating-indicator"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </RatingItemIndicator>
</template>

<style>
.sigma-ui-rating-indicator {
  color: var(--muted-foreground);
}

.sigma-ui-rating-indicator[data-state="active"] {
  color: var(--accent);
}

.sigma-ui-rating-indicator[data-state="active"] svg {
  fill: var(--accent);
}
</style>
