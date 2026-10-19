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
    data-slot="card-header"
    v-bind="delegatedAttrs()"
    class="sigma-ui-card__header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-card__header {
    display: flex;
    flex-direction: column;
    padding: calc(var(--spacing) * 6);
    gap: calc(var(--spacing) * 1.5);
  }
}
</style>
