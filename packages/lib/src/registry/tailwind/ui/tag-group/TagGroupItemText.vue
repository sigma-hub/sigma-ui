<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupItemText, type TagGroupItemTextProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('px-2 text-sm', $attrs.class ?? '')"
  >
    <slot />
  </TagGroupItemText>
</template>
