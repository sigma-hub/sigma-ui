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
   * Main page content rendered next to the sidebar.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <main
    data-slot="sidebar-inset"
    class="sigma-ui-sidebar-inset"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </main>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-sidebar-inset {
    position: relative;
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    background-color: var(--background);
  }

  @media (width >= 48rem) {
    .sigma-ui-sidebar[data-variant="inset"] ~ .sigma-ui-sidebar-inset {
      border-radius: calc(var(--radius) + 4px);
      margin: calc(var(--spacing) * 2);
      margin-left: 0;
      box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%);
    }

    .sigma-ui-sidebar[data-variant="inset"][data-state="collapsed"] ~ .sigma-ui-sidebar-inset {
      margin-left: calc(var(--spacing) * 2);
    }
  }
}
</style>
