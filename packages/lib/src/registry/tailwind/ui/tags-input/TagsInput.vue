<script setup lang="ts">
import { TagsInputRoot, type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputRootProps>();
const emits = defineEmits<TagsInputRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TagsInputRoot
    v-bind="forwarded"
    :class="cn('flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-3 py-2 text-sm', $attrs.class ?? '')"
  >
    <slot />
  </TagsInputRoot>
</template>
