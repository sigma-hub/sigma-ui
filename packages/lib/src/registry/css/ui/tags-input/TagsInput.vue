<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagsInputRootProps>();
const emits = defineEmits<TagsInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-tags-input"
    data-slot="tags-input"
    :class="[$attrs.class]"
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
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 0.875rem;
  gap: 0.5rem;
}
</style>
