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
  <p
    data-slot="card-description"
    v-bind="delegatedAttrs()"
    class="sigma-ui-card__description"
    :class="[$attrs.class]"
  >
    <slot />
  </p>
</template>

<style>
@layer components {
  .sigma-ui-card__description {
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
