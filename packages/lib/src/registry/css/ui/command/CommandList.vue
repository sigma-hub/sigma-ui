<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ListboxContentProps } from 'reka-ui';
import { ListboxContent, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ListboxContentProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ListboxContent
    data-slot="command-list"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-command-list"
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
