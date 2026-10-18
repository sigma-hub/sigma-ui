<script setup lang="ts">
import { useAttrs } from 'vue';

import { Label, type LabelProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<LabelProps>();
</script>

<template>
  <Label
    data-slot="label"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-label"
    :class="[$attrs.class]"
  >
    <slot />
  </Label>
</template>

<style>
.sigma-ui-label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
}

:where(:disabled) ~ .sigma-ui-label {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
