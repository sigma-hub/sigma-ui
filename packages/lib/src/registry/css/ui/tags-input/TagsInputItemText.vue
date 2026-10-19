<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagsInputItemTextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemText
    data-slot="tags-input-item-text"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-tags-input-item-text"
    :class="[$attrs.class]"
  />
</template>

<style>
@layer components {
  .sigma-ui-tags-input-item-text {
    padding: calc(var(--spacing) * 1) calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
    background-color: transparent;
    font-size: 0.875rem;
  }
}
</style>
