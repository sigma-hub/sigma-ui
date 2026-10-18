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
    data-slot="sheet-header"
    v-bind="delegatedAttrs()"
    class="sigma-ui-sheet-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sheet-header {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  text-align: center;
}

@media (width >= 40rem) {
  .sigma-ui-sheet-header {
    text-align: left;
  }
}
</style>
