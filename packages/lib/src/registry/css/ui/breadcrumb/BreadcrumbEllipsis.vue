<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MoreHorizontalIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'More',
});
</script>

<template>
  <span
    data-slot="breadcrumb-ellipsis"
    v-bind="delegatedAttrs()"
    role="presentation"
    aria-hidden="true"
    class="sigma-ui-breadcrumb__ellipsis"
    :class="$attrs.class"
  >
    <slot>
      <MoreHorizontalIcon class="sigma-ui-breadcrumb__ellipsis-icon" />
    </slot>
    <span class="sigma-ui-sr-only">{{ props.label }}</span>
  </span>
</template>

<style>
.sigma-ui-breadcrumb__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sigma-ui-breadcrumb__ellipsis-icon {
  width: 1rem;
  height: 1rem;
}

.sigma-ui-sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
