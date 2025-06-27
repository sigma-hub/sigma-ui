<script setup lang="ts">
import { TagsInputItemText, type TagsInputItemTextProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputItemTextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemText
    v-bind="forwardedProps"
    :class="cn('py-1 px-2 text-sm rounded bg-transparent', $attrs.class ?? '')"
  />
</template>
