<script lang="ts" setup>
import { useAttrs } from 'vue';

import { Primitive, type PrimitiveProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    v-bind="delegatedAttrs()"
    :as="as"
    :as-child="asChild"
    class="sigma-ui-breadcrumb__link"
    :class="$attrs.class"
  >
    <slot />
  </Primitive>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-breadcrumb__link {
    transition-duration: 150ms;
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-breadcrumb__link:hover {
    color: var(--foreground);
  }
}
</style>
