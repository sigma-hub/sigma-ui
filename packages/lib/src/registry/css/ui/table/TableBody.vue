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
  <tbody
    data-slot="table-body"
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-body"
    :class="[$attrs.class]"
  >
    <slot />
  </tbody>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-table-body tr:last-child {
    border: 0;
  }
}
</style>
