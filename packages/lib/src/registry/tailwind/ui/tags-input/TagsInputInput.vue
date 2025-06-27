<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputInputProps & {
  class?: HTMLAttributes['class'];
}>();

const delegatedProps = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <TagsInputInput
    v-bind="forwarded"
    :class="cn('text-sm min-h-6 focus:outline-hidden flex-1 bg-transparent px-1', props.class)"
  />
</template>
