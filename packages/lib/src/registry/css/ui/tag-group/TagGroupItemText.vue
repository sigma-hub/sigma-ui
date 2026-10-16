<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupItemText, type TagGroupItemTextProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagGroupItemTextProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Visible label of the tag.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <TagGroupItemText
    data-slot="tag-group-item-text"
    class="sigma-ui-tag-group-item-text"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </TagGroupItemText>
</template>

<style>
.sigma-ui-tag-group-item-text {
  padding: 0 0.5rem;
  font-size: 0.875rem;
}
</style>
