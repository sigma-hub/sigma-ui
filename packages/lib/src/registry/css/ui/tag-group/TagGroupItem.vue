<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupItem, type TagGroupItemProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagGroupItemProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Tag content, usually the text and a delete button.
   */
  default?: (props: { selected: boolean; disabled: boolean }) => unknown;
}>();
</script>

<template>
  <TagGroupItem
    v-slot="slotProps"
    data-slot="tag-group-item"
    class="sigma-ui-tag-group-item"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </TagGroupItem>
</template>

<style>
.sigma-ui-tag-group-item {
  display: inline-flex;
  height: 1.5rem;
  align-items: center;
  border-radius: var(--radius-md);
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-tag-group-item:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-tag-group-item[data-state="checked"] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-tag-group-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
