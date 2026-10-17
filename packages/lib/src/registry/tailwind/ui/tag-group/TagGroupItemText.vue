<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagGroupItemText, type TagGroupItemTextProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('px-2 text-sm', $attrs.class ?? '')"
  >
    <slot />
  </TagGroupItemText>
</template>
