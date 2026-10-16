<script setup lang="ts">
import { RatingItemIndicator, type RatingItemIndicatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<RatingItemIndicatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <RatingItemIndicator
    data-slot="rating-item-indicator"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('text-muted-foreground data-[state=active]:text-accent data-[state=active]:[&_svg]:fill-accent', $attrs.class ?? '')"
  >
    <slot />
  </RatingItemIndicator>
</template>
