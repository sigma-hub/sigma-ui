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
    class="sigma-ui-table-wrapper"
    data-slot="table"
  >
    <table
      v-bind="delegatedAttrs()"
      class="sigma-ui-table"
      :class="[$attrs.class]"
    >
      <slot />
    </table>
  </div>
</template>

<style>
@layer components {
  .sigma-ui-table-wrapper {
    position: relative;
    overflow: auto;
    width: 100%;
  }

  .sigma-ui-table {
    width: 100%;
    caption-side: bottom;
    font-size: 0.875rem;
  }
}
</style>
