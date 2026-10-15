<script lang="ts" setup>
const props = withDefaults(defineProps<{
  ariaLabel?: string;
}>(), {
  ariaLabel: 'breadcrumb',
});
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    :class="$attrs.class"
    data-slot="breadcrumb"
  >
    <slot />
  </nav>
</template>
