<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagsInputItemDeleteProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemDelete
    data-slot="tags-input-item-delete"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex rounded bg-transparent mr-1', $attrs.class ?? '')"
  >
    <slot>
      <XIcon class="w-4 h-4" />
    </slot>
  </TagsInputItemDelete>
</template>
