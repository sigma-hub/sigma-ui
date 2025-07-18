<script setup lang="ts">
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from 'reka-ui';
import { XIcon } from 'lucide-vue-next';

const props = defineProps<TagsInputItemDeleteProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps"
    class="sigma-ui-tags-input-item-delete"
  >
    <slot>
      <XIcon class="sigma-ui-tags-input-item-delete__icon" />
    </slot>
  </TagsInputItemDelete>
</template>

<style>
.sigma-ui-tags-input-item-delete {
  display: flex;
  border-radius: var(--radius-sm);
  margin-right: 0.25rem;
  background-color: transparent;
  cursor: pointer;
}

.sigma-ui-tags-input-item-delete:hover {
  background-color: hsl(var(--muted));
}

.sigma-ui-tags-input-item-delete__icon {
  width: 1rem;
  height: 1rem;
}
</style>
