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
  align-items: center;
  padding: 0.5rem 0.75rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  background-color: hsl(var(--input));
  font-size: 0.875rem;
  gap: 0.5rem;
}
</style>
