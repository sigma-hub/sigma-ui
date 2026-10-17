<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagGroupRoot, type TagGroupRootEmits, type TagGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagGroupRootProps>();
const emits = defineEmits<TagGroupRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * Tags in the group. Receives the current selection.
   */
  default?: (props: { modelValue: TagGroupRootProps['modelValue'] }) => unknown;
}>();
</script>

<template>
  <TagGroupRoot
    v-slot="slotProps"
    data-slot="tag-group"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('flex min-h-10 flex-wrap items-center gap-2 rounded-md border border-border p-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </TagGroupRoot>
</template>
