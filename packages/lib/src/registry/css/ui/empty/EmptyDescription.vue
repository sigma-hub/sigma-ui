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
   * Explanation of the empty state. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    v-bind="delegatedAttrs"
    data-slot="empty-description"
    class="sigma-ui-empty-description"
    :class="[$attrs.class]"
  >
    <slot />
  </p>
</template>

<style>
.sigma-ui-empty-description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.625;
}

.sigma-ui-empty-description a {
  text-underline-offset: 4px;
  text-decoration: underline;
}

.sigma-ui-empty-description a:hover {
  color: var(--primary);
}
</style>
