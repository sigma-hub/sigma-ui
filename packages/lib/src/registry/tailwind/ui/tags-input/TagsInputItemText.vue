<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('py-1 px-2 text-sm rounded bg-transparent', $attrs.class ?? '')"
  />
</template>
