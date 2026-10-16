<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ListboxContentProps } from 'reka-ui';
import { ListboxContent, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ListboxContentProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ListboxContent
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-command-list"
    data-slot="command-list"
    :class="[$attrs.class]"
  >
    <div
      role="presentation"
      class="sigma-ui-command-list__content"
    >
      <slot />
    </div>
  </ListboxContent>
</template>

<style>
.sigma-ui-command-list {
  overflow: hidden auto;
  max-height: 300px;
}

.sigma-ui-command-list__content {
  position: relative;
}
</style>
