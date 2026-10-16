<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { RatingItemIndicator, type RatingItemIndicatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RatingItemIndicatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <RatingItemIndicator
    data-slot="rating-item-indicator"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('text-muted-foreground data-[state=active]:text-accent data-[state=active]:[&_svg]:fill-accent', $attrs.class ?? '')"
  >
    <slot />
  </RatingItemIndicator>
</template>
