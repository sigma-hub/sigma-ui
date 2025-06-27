<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'reka-ui';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    class="sigma-ui-breadcrumb__link"
    :class="$attrs.class"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-breadcrumb__link {
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.sigma-ui-breadcrumb__link:hover {
  color: hsl(var(--foreground));
}
</style>
