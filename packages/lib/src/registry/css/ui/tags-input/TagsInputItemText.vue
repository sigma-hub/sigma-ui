<script setup lang="ts">
import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';

const props = defineProps<TagsInputItemTextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemText
    v-bind="forwardedProps"
    class="sigma-ui-tags-input-item-text"
  />
</template>

<style>
.sigma-ui-tags-input-item-text {
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  background-color: transparent;
  font-size: 0.875rem;
}
</style>
