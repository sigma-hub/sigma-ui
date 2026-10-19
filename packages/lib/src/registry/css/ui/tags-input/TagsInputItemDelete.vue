<script setup lang="ts">
import { useAttrs } from 'vue';

import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TagsInputItemDeleteProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemDelete
    data-slot="tags-input-item-delete"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    class="sigma-ui-tags-input-item-delete"
    :class="[$attrs.class]"
  >
    <slot>
      <XIcon class="sigma-ui-tags-input-item-delete__icon" />
    </slot>
  </TagsInputItemDelete>
</template>

<style>
@layer components {
  .sigma-ui-tags-input-item-delete {
    display: flex;
    border-radius: var(--radius-sm);
    margin-right: calc(var(--spacing) * 1);
    background-color: transparent;
    cursor: pointer;
  }

  .sigma-ui-tags-input-item-delete:hover {
    background-color: var(--muted);
  }

  .sigma-ui-tags-input-item-delete__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
