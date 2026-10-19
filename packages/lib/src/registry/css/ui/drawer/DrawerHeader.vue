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
    data-slot="drawer-header"
    v-bind="delegatedAttrs()"
    class="sigma-ui-drawer-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-drawer-header {
    display: grid;
    padding: calc(var(--spacing) * 4);
    gap: calc(var(--spacing) * 1.5);
    text-align: center;
  }

  @media (width >= 40rem) {
    .sigma-ui-drawer-header {
      text-align: left;
    }
  }
}
</style>
