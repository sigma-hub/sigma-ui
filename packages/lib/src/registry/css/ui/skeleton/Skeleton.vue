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
  <div
    data-slot="skeleton"
    v-bind="delegatedAttrs()"
    class="sigma-ui-skeleton"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-skeleton {
    border-radius: var(--radius-md);
    animation: sigma-ui-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background-color: var(--muted);
  }

  @keyframes sigma-ui-skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }
  }
}
</style>
