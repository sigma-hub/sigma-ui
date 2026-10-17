<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagGroupItem, type TagGroupItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('inline-flex h-6 items-center rounded-md bg-secondary text-secondary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </TagGroupItem>
</template>
