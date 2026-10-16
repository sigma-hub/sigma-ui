<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagsInputRootProps>();
const emits = defineEmits<TagsInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex flex-wrap gap-2 items-center rounded-md border border-border bg-input px-3 py-2 text-sm', $attrs.class ?? '')"
    data-slot="tags-input"
  >
    <slot />
  </TagsInputRoot>
</template>
