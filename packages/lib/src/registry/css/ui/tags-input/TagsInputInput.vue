<script setup lang="ts">
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui';

const props = defineProps<TagsInputInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputInput
    data-slot="tags-input-input"
    v-bind="forwardedProps"
    class="sigma-ui-tags-input-input"
  />
</template>

<style>
@layer components {
  .sigma-ui-tags-input-input {
    min-height: calc(var(--spacing) * 6);
    flex: 1;
    background-color: transparent;
    font-size: 0.875rem;
    padding-inline: calc(var(--spacing) * 1);
  }

  .sigma-ui-tags-input-input:focus-visible {
    box-shadow: none;
    outline: none;
  }
}
</style>
