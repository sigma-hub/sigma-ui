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
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}
</style>
