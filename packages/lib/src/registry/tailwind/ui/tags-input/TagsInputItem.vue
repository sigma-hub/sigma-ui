<script setup lang="ts">
import { TagsInputItem, type TagsInputItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItem
    v-bind="forwardedProps"
    :class="cn('flex h-6 items-center rounded bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background', $attrs.class ?? '')"
  >
    <slot />
  </TagsInputItem>
</template>
