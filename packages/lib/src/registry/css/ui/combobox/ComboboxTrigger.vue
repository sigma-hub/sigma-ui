<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxTriggerProps } from 'reka-ui';
import { ComboboxTrigger, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxTriggerProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxTrigger
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
    tabindex="0"
    data-slot="combobox-trigger"
  >
    <slot />
  </ComboboxTrigger>
</template>
