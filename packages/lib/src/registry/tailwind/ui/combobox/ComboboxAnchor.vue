<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxAnchorProps } from 'reka-ui';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxAnchorProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxAnchor
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('w-[200px]', $attrs.class ?? '')"
    data-slot="combobox-anchor"
  >
    <slot />
  </ComboboxAnchor>
</template>
