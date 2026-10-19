<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

</script>

<template>
  <tr
    data-slot="table-row"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-row"
    :class="[$attrs.class]"
  >
    <slot />
  </tr>
</template>

<style>
@layer components {
  .sigma-ui-table-row {
    border-bottom: 1px solid var(--border);
    transition-duration: 150ms;
    transition-property: color, background-color, border-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .sigma-ui-table-row:hover {
    background-color: color-mix(in oklch, var(--muted) 50%, transparent);
  }

  .sigma-ui-table-row[data-state="selected"] {
    background-color: var(--muted);
  }
}
</style>
