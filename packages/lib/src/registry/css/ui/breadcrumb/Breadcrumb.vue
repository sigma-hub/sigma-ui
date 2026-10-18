<script lang="ts" setup>
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  ariaLabel?: string;
}>(), {
  ariaLabel: 'breadcrumb',
});
</script>

<template>
  <nav
    data-slot="breadcrumb"
    v-bind="delegatedAttrs()"
    :aria-label="props.ariaLabel"
    :class="[$attrs.class]"
  >
    <slot />
  </nav>
</template>
