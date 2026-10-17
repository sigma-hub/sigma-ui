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
  <span
    v-bind="delegatedAttrs()"
    class="sigma-ui-command-shortcut"
    :class="$attrs.class"
    data-slot="command-shortcut"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-command-shortcut {
  margin-left: auto;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1rem;
}
</style>
