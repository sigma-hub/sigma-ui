<script setup lang="ts">
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<TagsInputRootProps>();
const emits = defineEmits<TagsInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    v-bind="forwarded"
    class="sigma-ui-tags-input"
  >
    <slot />
  </TagsInputRoot>
</template>

<style>
.sigma-ui-tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  border-radius: var(--radius-md);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}
</style>
