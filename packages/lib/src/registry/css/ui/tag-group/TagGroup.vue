<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupRoot, type TagGroupRootEmits, type TagGroupRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    class="sigma-ui-tag-group"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </TagGroupRoot>
</template>

<style>
.sigma-ui-tag-group {
  display: flex;
  min-height: 2.5rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  gap: 0.5rem;
}

.sigma-ui-tag-group[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
