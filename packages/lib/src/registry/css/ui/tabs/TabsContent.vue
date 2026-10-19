<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsContent, type TabsContentProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsContentProps>();
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-tabs-content"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsContent>
</template>

<style>
@layer components {
  .sigma-ui-tabs-content {
    margin-top: calc(var(--spacing) * 2);
  }

  .sigma-ui-tabs-content:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
}
</style>
