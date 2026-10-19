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
   * Helper text. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    data-slot="field-description"
    class="sigma-ui-field-description"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </p>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-field-description {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .sigma-ui-field-description:nth-last-child(2) {
    margin-top: calc(var(--spacing) * -1);
  }

  .sigma-ui-field-description:last-child {
    margin-top: 0;
  }

  [data-variant="legend"] + .sigma-ui-field-description {
    margin-top: calc(var(--spacing) * -1.5);
  }

  .sigma-ui-field--horizontal .sigma-ui-field-description {
    text-wrap: balance;
  }

  .sigma-ui-field-description > a {
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  .sigma-ui-field-description > a:hover {
    color: var(--primary);
  }
}
</style>
