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
    data-slot="dropdown-menu-shortcut"
    v-bind="delegatedAttrs()"
    class="sigma-ui-dropdown-menu-shortcut"
    :class="$attrs.class"
  >
    <slot />
  </span>
</template>

<style>
.sigma-ui-dropdown-menu-shortcut {
  margin-left: auto;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  line-height: 1rem;
}
</style>
