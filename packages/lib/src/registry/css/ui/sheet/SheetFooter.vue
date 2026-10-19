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
    data-slot="sheet-footer"
    v-bind="delegatedAttrs()"
    class="sigma-ui-sheet-footer"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-sheet-footer {
    display: flex;
    flex-direction: column-reverse;
  }

  @media (width >= 40rem) {
    .sigma-ui-sheet-footer {
      flex-direction: row;
      justify-content: flex-end;
      gap: calc(var(--spacing) * 2);
    }
  }
}
</style>
