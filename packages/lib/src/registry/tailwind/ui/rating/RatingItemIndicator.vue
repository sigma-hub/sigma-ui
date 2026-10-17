<script setup lang="ts">
import { useAttrs } from 'vue';

import { RatingItemIndicator, type RatingItemIndicatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('text-muted-foreground data-[state=active]:text-accent data-[state=active]:[&_svg]:fill-accent', $attrs.class ?? '')"
  >
    <slot />
  </RatingItemIndicator>
</template>
