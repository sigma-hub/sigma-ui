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
  flex: 1;
  min-height: 1.5rem;
  padding-inline: 0.25rem;
  font-size: 0.875rem;
  background-color: transparent;
}

.sigma-ui-tags-input-input:focus-visible {
  outline: none;
  box-shadow: none;
}
</style>
