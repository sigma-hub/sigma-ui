<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-breadcrumb__link"
    :class="$attrs.class"
    data-slot="breadcrumb-link"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-breadcrumb__link {
  transition-duration: 150ms;
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.sigma-ui-breadcrumb__link:hover {
  color: var(--foreground);
}
</style>
