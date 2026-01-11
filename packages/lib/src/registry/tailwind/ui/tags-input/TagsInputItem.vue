<script setup lang="ts">
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="cn('flex h-6 items-center rounded bg-secondary data-[state=active]:outline-2 data-[state=active]:outline-ring data-[state=active]:outline-offset-2', $attrs.class ?? '')"
  >
    <slot />
  </TagsInputItem>
</template>
