<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagsInputItemTextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemText
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('py-1 px-2 text-sm rounded bg-transparent', $attrs.class ?? '')"
    data-slot="tags-input-item-text"
  />
</template>
