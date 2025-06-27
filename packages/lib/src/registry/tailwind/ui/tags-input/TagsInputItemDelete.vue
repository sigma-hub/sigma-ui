<script setup lang="ts">
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<TagsInputItemDeleteProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps"
    :class="cn('flex rounded bg-transparent mr-1', $attrs.class ?? '')"
  >
    <slot>
      <XIcon class="w-4 h-4" />
    </slot>
  </TagsInputItemDelete>
</template>
