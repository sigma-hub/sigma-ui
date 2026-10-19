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
    data-slot="card-content"
    v-bind="delegatedAttrs()"
    class="sigma-ui-card__content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-card__content {
    padding: 0 calc(var(--spacing) * 6) calc(var(--spacing) * 6);
  }
}
</style>
