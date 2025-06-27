<script setup lang="ts">
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';

const props = defineProps<TagsInputItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    class="sigma-ui-tags-input-item"
  >
    <slot />
  </TagsInputItem>
</template>

<style>
.sigma-ui-tags-input-item {
  display: flex;
  height: 1.5rem;
  align-items: center;
  border-radius: var(--radius-sm);
  background-color: hsl(var(--secondary));
}

.sigma-ui-tags-input-item[data-state="active"] {
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}
</style>
