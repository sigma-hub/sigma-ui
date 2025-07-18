<script setup lang="ts">
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui';

const props = defineProps<TagsInputInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputInput
    v-bind="forwardedProps"
    class="sigma-ui-tags-input-input"
  />
</template>

<style>
.sigma-ui-tags-input-input {
  min-height: 1.5rem;
  flex: 1;
  background-color: transparent;
  font-size: 0.875rem;
  padding-inline: 0.25rem;
}

.sigma-ui-tags-input-input:focus-visible {
  box-shadow: none;
  outline: none;
}
</style>
