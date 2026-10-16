<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * Secondary text. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    v-bind="delegatedAttrs"
    data-slot="item-description"
    class="sigma-ui-item-description"
    :class="[$attrs.class]"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-item-description {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  color: var(--muted-foreground);
  font-size: 0.875rem;
  font-weight: 400;
  -webkit-line-clamp: 2;
  line-height: 1.5;
  text-wrap: balance;
}

.sigma-ui-item-description a {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.sigma-ui-item-description a:hover {
  color: var(--primary);
}
</style>
