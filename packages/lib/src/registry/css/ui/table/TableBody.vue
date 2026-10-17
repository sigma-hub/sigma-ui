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
    v-bind="delegatedAttrs()"
    class="sigma-ui-table-body"
    :class="[$attrs.class]"
    data-slot="table-body"
  >
    <slot />
  </tbody>
</template>

<style>
.sigma-ui-table-body tr:last-child {
  border: 0;
}
</style>
