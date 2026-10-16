<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagsInputItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    class="sigma-ui-tags-input-item"
    data-slot="tags-input-item"
    :class="[$attrs.class]"
  >
    <slot />
  </TagsInputItem>
</template>

<style>
.sigma-ui-tags-input-item {
  display: flex;
  height: 1.5rem;
  align-items: center;
  border-radius: var(--radius-sm);
  background-color: var(--secondary);
}

.sigma-ui-tags-input-item[data-state="active"] {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
</style>
