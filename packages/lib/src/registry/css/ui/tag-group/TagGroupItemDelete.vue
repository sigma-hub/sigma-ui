<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TagGroupItemDelete, type TagGroupItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from 'lucide-vue-next';

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
    class="sigma-ui-tag-group-item-delete"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot>
      <XIcon class="sigma-ui-tag-group-item-delete__icon" />
    </slot>
  </TagGroupItemDelete>
</template>

<style>
.sigma-ui-tag-group-item-delete {
  display: inline-flex;
  margin-inline-end: 0.25rem;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.sigma-ui-tag-group-item-delete:hover {
  background-color: var(--muted);
}

.sigma-ui-tag-group-item-delete[data-disabled] {
  pointer-events: none;
}

.sigma-ui-tag-group-item-delete__icon {
  width: 1rem;
  height: 1rem;
}
</style>
