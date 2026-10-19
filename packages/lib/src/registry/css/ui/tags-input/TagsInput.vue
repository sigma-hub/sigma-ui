<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagsInputRootProps>();
const emits = defineEmits<TagsInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    data-slot="tags-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-tags-input"
    :class="[$attrs.class]"
  >
    <slot />
  </TagsInputRoot>
</template>

<style>
@layer components {
  .sigma-ui-tags-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--input);
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
  }
}
</style>
