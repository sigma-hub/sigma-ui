<script lang="ts" setup>
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
    v-bind="delegatedAttrs()"
    class="sigma-ui-drawer-footer"
    :class="[$attrs.class]"
    data-slot="drawer-footer"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-drawer-footer {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: auto;
  gap: 0.5rem;
}
</style>
