<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('flex h-6 items-center rounded bg-secondary data-[state=active]:outline-2 data-[state=active]:outline-ring data-[state=active]:outline-offset-2', $attrs.class ?? '')"
  >
    <slot />
  </TagsInputItem>
</template>
