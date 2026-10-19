<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /**
   * Explanation of the empty state. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    data-slot="empty-description"
    v-bind="delegatedAttrs()"
    class="sigma-ui-empty-description"
    :class="[$attrs.class]"
  >
    <slot />
  </p>
</template>

<style>
@layer components {
  .sigma-ui-empty-description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.625;
  }

  .sigma-ui-empty-description a {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .sigma-ui-empty-description a:hover {
    color: var(--primary);
  }
}
</style>
