<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

</script>

<template>
  <span
    v-bind="delegatedAttrs"
    class="sigma-ui-menubar-shortcut"
    :class="[$attrs.class]"
    data-slot="menubar-shortcut"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-menubar-shortcut {
  margin-left: auto;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
</style>
