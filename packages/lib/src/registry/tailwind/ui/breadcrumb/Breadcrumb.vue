<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<{
  ariaLabel?: string;
}>(), {
  ariaLabel: 'breadcrumb',
});
</script>

<template>
  <nav
    v-bind="delegatedAttrs"
    :aria-label="props.ariaLabel"
    :class="$attrs.class"
    data-slot="breadcrumb"
  >
    <slot />
  </nav>
</template>
