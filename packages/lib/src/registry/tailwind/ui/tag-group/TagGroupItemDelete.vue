<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupItemDelete, type TagGroupItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TagGroupItemDeleteProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TagGroupItemDelete
    data-slot="tag-group-item-delete"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('me-1 inline-flex rounded-md hover:bg-muted data-[disabled]:pointer-events-none', $attrs.class ?? '')"
  >
    <slot>
      <XIcon class="size-4" />
    </slot>
  </TagGroupItemDelete>
</template>
