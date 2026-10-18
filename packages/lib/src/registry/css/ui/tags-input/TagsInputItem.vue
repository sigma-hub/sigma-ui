<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagsInputItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    data-slot="tags-input-item"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-tags-input-item"
    :class="[$attrs.class]"
  >
    <slot />
  </TagsInputItem>
</template>

<style>
.sigma-ui-tags-input-item {
  display: flex;
  height: calc(var(--spacing) * 6);
  align-items: center;
  border-radius: var(--radius-sm);
  background-color: var(--secondary);
}

.sigma-ui-tags-input-item[data-state="active"] {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
</style>
