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
    data-slot="menubar-shortcut"
    v-bind="delegatedAttrs()"
    class="sigma-ui-menubar-shortcut"
    :class="[$attrs.class]"
  >
    <slot />
  </span>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-menubar-shortcut {
    margin-left: auto;
    color: var(--muted-foreground);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
}
</style>
